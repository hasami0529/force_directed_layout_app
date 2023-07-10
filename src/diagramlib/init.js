import { highlighters, g, shapes, dia, anchors, connectionPoints } from 'jointjs'
import { createContainer, createLayoutBox } from './shapes/rect'
import { blockToolView, expandedContainerToolsView, collapsedContainerToolsView } from './shapes/tools'
import { normalLinkToolsView } from './shapes/linktool'
import { createNormalLink, createBindingLink } from './shapes/link'
import { customAnchor } from './anchor'

import { inspectActions } from '../store/slice/inspect'
import { contextMenuActions } from '../store/slice/contextmenu'
import { taglibActions } from '../store/slice/taglib';
import { canvasActions } from '../store/slice/canvas';
import { moveLayoutBox } from './layout'

import { PAPERHIEGHT, PAPERWIDTH, POINTER_MOVE_THRESHLOLD } from './config'
import { setLabel } from './factory'

export function init() {
    var namespace = shapes;
    var graph = new dia.Graph({}, { cellNamespace: namespace });

    var paper = new dia.Paper({
        el: document.getElementById("canvas"),
        model: graph,
        width: PAPERWIDTH,
        height: PAPERHIEGHT,
        gridSize: 1,
        cellViewNamespace: namespace,
        preventContextMenu: true,
        preventDefaultBlankAction: true,
        restrictTranslate: true,


        highlighting: false,
        embeddingMode: false,

        // connection related config
        snapLinks: true,
        linkPinning: false,
        // magnetThreshold: 'onleave',
        defaultRouter: {
            name: "normal",
            args: {
                padding: 10,
            }
        },
        defaultLink: createNormalLink,
        defaultConnectionPoint: connectionPoints.boundary,
        interactive: (cellView, method) => {
            if (cellView.model.attributes.type === 'alignmentLine') return false
            return true
        }

    });

    return { graph, paper }
}

export function initPaperEvents(paper, dispatch) {

    paper.on('blank:contextmenu', (evt, x, y) => {
        // evt.stopPropagation()

        dispatch(
            contextMenuActions.showMenu({ event: evt })
        )
    })

    document.addEventListener('click', (event) => {
        dispatch(
            contextMenuActions.disable({event})
        )
    })

    document.addEventListener('contextmenu', (event) => {
        event.preventDefault()
    })

    paper.on('element:pointerclick', (elementView) => {
        console.log(elementView.model.getBBox())
        switch (elementView.model.role) {
            case 'Block':
                if (!highlighters.mask.get(elementView).length) {
                    highlighters.mask.add(elementView, { selector: 'body' }, 'my-element-highlight', {
                        deep: true,
                        attrs: {
                            'stroke': '#F2CC0F',
                            'stroke-width': 3
                        }
                    });
        
                    dispatch(
                        canvasActions.setFocus({ model: elementView.model })
                    )
                    dispatch(
                        taglibActions.showTags({ model: elementView.model })
                    )
                    dispatch(
                        inspectActions.showBlockInfo({ model: elementView.model })
                    )

                    dispatch(
                        canvasActions.highlight({ model: elementView.model })
                    )
                    
                } else {
                    highlighters.mask.remove(elementView);
                    dispatch(
                        canvasActions.dehighlight({ model: elementView.model })
                    )
                }
                break;
        
            default:
                break;
        }

        paper.on('element:pointerup', (elementView) => {
            elementView.model.toFront()
            const s = `${elementView.model.position().x},${elementView.model.position().y}`
            setLabel(elementView.model, s)
        })


    })


    paper.on('element:contextmenu', function(cellView, evt) {
        switch (cellView.model.role) {
            case "Block":
                dispatch(
                    contextMenuActions.showBlockMenu({ evt, target: cellView})
                )
                break
            case "Link:Bus":
                dispatch(
                    contextMenuActions.showBusMenu({ evt, target: cellView})
                )
                break
            default:
        }
            

    })

    paper.on('element:mouseenter', function(elementView) {
        switch(elementView.model.role) {
            case 'Block':
                elementView.addTools(blockToolView)
                break
            // case 'expanded-container':
            //     elementView.addTools(expandedContainerToolsView)
            //     break
            // case 'collapsed-container':
            //     elementView.addTools(collapsedContainerToolsView)
            //     break
            default :
                console.log("nothing happened")
        }
        elementView.showTools();
    });
    
    paper.on('element:mouseleave', function(elementView) {
        elementView.hideTools();
    });

    // for create container/group
    paper.on({
        'blank:pointerdown': function(evt, x, y) {
            var data = evt.data = {};

            data.x = x;
            data.y = y;
        },
        'blank:pointermove': function(evt, x, y) {
            const data = evt.data;
            const d = { x: x - data.x, y: y - data.y}
            if (Math.abs(d.x) < POINTER_MOVE_THRESHLOLD && Math.abs(d.y) < POINTER_MOVE_THRESHLOLD) return
            if (!data.layoutBox) {
                const { layoutBoxBlock: layoutBox } = createLayoutBox(paper)
                layoutBox.position(x, y);
                layoutBox.toBack()
                data.x = x;
                data.y = y;
                layoutBox.addTo(this.model);
                layoutBox.on('change:position',moveLayoutBox)
                data.layoutBox = layoutBox;
            } else { // a container has created
                var layoutBox = data.layoutBox;
                var bbox = new g.Rect(data.x, data.y, d.x, d.y);
                bbox.normalize();
                layoutBox.set({
                    position: { x: bbox.x, y: bbox.y },
                    size: { width: Math.max(bbox.width, 1), height: Math.max(bbox.height, 1) }
                    }); // a bug here
            }


        },
        'blank:pointerup': function(evt) {
            if (!evt.data.layoutBox) return
            var layoutBox = evt.data.layoutBox

            dispatch(
                canvasActions.applyLocalLayout({ section: layoutBox })
            )

        },
    })

    // WIP
    // paper.on('slot:click', (e) => {
    //     console.log('slot focus')
    // })

    // paper.on('bus', function(cellView, evt) {
    //     console.log('here')

    // })

    paper.on('link:mouseenter', (linkView) => {
        if (!linkView.model.attributes.type === 'sectionDivider') {
            linkView.addTools(normalLinkToolsView)
        }
    })

    paper.on('link:mouseleave', (linkView) => {
        linkView.hideTools()
    })

    paper.on('link:connect', (linkView, evt, elementViewConnected, magnet, arrowhead) => {
        console.log(elementViewConnected.model)
        if (elementViewConnected.model.role === 'Block' && elementViewConnected.model.icon === 'speaker') {

            linkView.model.target(elementViewConnected.model, {
                connectionPoint: {
                    name: "anchor",
                },
                anchor: {
                    name: "left",
                    args: {
                        dx: "5%"
                    }
                }
                
            })

        }
    })

}