import { highlighters, g, shapes, dia, anchors } from 'jointjs'
import { createContainer } from './shapes/rect'
import { blockToolView, expandedContainerToolsView, collapsedContainerToolsView } from './shapes/tools'
import { normalLinkToolsView } from './shapes/linktool'
import { createNormalLink, createBindingLink } from './shapes/link'
import { customAnchor } from './anchor'

import { inspectActions } from '../store/slice/inspect'
import { contextMenuActions } from '../store/slice/contextmenu'
import { taglibActions } from '../store/slice/taglib';
import { canvasActions } from '../store/slice/canvas';

import { PAPERHIEGHT, PAPERWIDTH, POINTER_MOVE_THRESHLOLD } from './config'

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
            name: "manhattan",
            args: {
                padding: 10,
            }
        },
        defaultLink: createNormalLink,
        // defaultAnchor: function name(params) {
        // },
        // shouldn't be bbox
        defaultConnectionPoint: {
            name: 'boundary',
            args: {
                // offset: 10,
                // stroke: true,
            }
        },
        validateConnection: (cellViewS, magnetS, cellViewT, magnetT, end, linkView) => {
            if (magnetS.getAttribute('role') === 'Port' && magnetT?.getAttribute('role') === 'Port') return true
            if ((magnetS.getAttribute('role') === 'Slot' && magnetT?.getAttribute('role') === 'Port') |
            (magnetS.getAttribute('role') === 'Port' && magnetT?.getAttribute('role') === 'Slot')) {
                const l = createBindingLink()
                l.source(cellViewS.model, {
                    port: magnetS.getAttribute('port')
                })
                l.target(cellViewT.model, {
                    port: magnetT.getAttribute('port')
                })
                l.addTo(cellViewS.model.graph)
                linkView.remove()
                return true
            }
        },
        // defaultAnchor: (view, magnet, _, args) => {
        //     const group = view.findAttribute("port-group", magnet);
        //     return customAnchor(group, view, magnet, _, args)
        // },
        // defaultLinkAnchor: (view, magnet, ...rest) => {
        //     const group = view.findAttribute("port-group", magnet);
        //     let anchorFn;
        //     console.log(group)
        //     switch (group) {
        //         case 'left':
        //             anchorFn = anchors.left
        //             break;
        //         case 'right':
        //             anchorFn = anchors.right
        //             break;
        //         case 'top':
        //             anchorFn = anchors.top
        //             break;
        //         case 'bottom':
        //             anchorFn = anchors.bottom
        //             break;
        //         default:
        //             break;
        //     }
        //     // const anchorFn = group === "in" ? anchors.left : anchors.right;
        //     return anchorFn(view, magnet, ...rest);
        // },
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
        // elementView.hideTools();
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
            if (!data.container) {
                const { container } = createContainer(paper)
                container.position(x, y);
                container.toBack()
                data.x = x;
                data.y = y;
                container.addTo(this.model);
                data.container = container;
            } else { // a container has created
                var container = data.container;
                var bbox = new g.Rect(data.x, data.y, d.x, d.y);
                bbox.normalize();
                container.set({
                    position: { x: bbox.x, y: bbox.y },
                    size: { width: Math.max(bbox.width, 1), height: Math.max(bbox.height, 1) }
                    }); // a bug here
            }


        },
        'blank:pointerup': function(evt) {
            if (!evt.data.container) return
            var container = evt.data.container
            const containerId = container.id
            const seletedBlocks = this.findViewsInArea(container.getBBox())

            dispatch(
                canvasActions.applyLocalLayout({ section: container })
            )

            // container functinalities, ignore for now
            if (seletedBlocks.length > 1) {
                for (const b of seletedBlocks) {
                    if (b.model.id === containerId) continue
                    // container.embed(b.model)
                    // container.fitEmbeds({deep: true, padding: 10})
                }
            }
        },
    })

    // WIP
    paper.on('slot:click', (e) => {
        console.log('slot focus')
    })

    paper.on('bus', function(cellView, evt) {
        console.log('here')

    })

    paper.on('link:mouseenter', (linkView) => {
        if (!linkView.model.attributes.type === 'sectionDivider') {
            console.log(linkView)
            linkView.addTools(normalLinkToolsView)
        }
    })

    paper.on('link:mouseleave', (linkView) => {
        linkView.hideTools()
    })

}