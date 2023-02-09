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

export function init() {
    var namespace = shapes;
    var graph = new dia.Graph({}, { cellNamespace: namespace });

    var paper = new dia.Paper({
        el: document.getElementById("canvas"),
        model: graph,
        width: "100%",
        height: "100%",
        gridSize: 1,
        cellViewNamespace: namespace,
        preventContextMenu: true,
        preventDefaultBlankAction: true,


        highlighting: false,
        embeddingMode: true,

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
            name: 'anchor',
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
        defaultAnchor: (view, magnet, _, args) => {
            const group = view.findAttribute("port-group", magnet);
            return customAnchor(group, view, magnet, _, args)
        },
        defaultLinkAnchor: (view, magnet, ...rest) => {
            const group = view.findAttribute("port-group", magnet);
            let anchorFn;
            console.log(group)
            switch (group) {
                case 'left':
                    anchorFn = anchors.left
                    break;
                case 'right':
                    anchorFn = anchors.right
                    break;
                case 'top':
                    anchorFn = anchors.top
                    break;
                case 'bottom':
                    anchorFn = anchors.bottom
                    break;
                default:
                    break;
            }
            // const anchorFn = group === "in" ? anchors.left : anchors.right;
            return anchorFn(view, magnet, ...rest);
        },

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
        console.log(elementView.model.role)
        switch (elementView.model.role) {
            case 'Block':
                if (!highlighters.mask.get(elementView).length) {
                    highlighters.mask.add(elementView, { selector: 'root' }, 'my-element-highlight', {
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
                        taglibActions.showTags({elementId: elementView.id})
                    )
                    dispatch(
                        inspectActions.showBlockInfo({ model: elementView.model })
                    )
                    
                } else {
                    highlighters.mask.remove(elementView);
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
            case 'expanded-container':
                elementView.addTools(expandedContainerToolsView)
                break
            case 'collapsed-container':
                elementView.addTools(collapsedContainerToolsView)
                break
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

            const { container } = createContainer(paper)
            container.position(x, y);
            container.toBack()
            data.x = x;
            data.y = y;

            container.addTo(this.model);
            data.container = container;
        },
        'blank:pointermove': function(evt, x, y) {
            var data = evt.data;
            var container = data.container;
            var bbox = new g.Rect(data.x, data.y, x - data.x, y - data.y);
            bbox.normalize();
            container.set({
                position: { x: bbox.x, y: bbox.y },
                size: { width: Math.max(bbox.width, 1), height: Math.max(bbox.height, 1) }
                });
        },
        'blank:pointerup': function(evt) {
            var container = evt.data.container
            const containerId = container.id
            const seletedBlocks = this.findViewsInArea(container.getBBox())
            // console.log(container.id)
            if (seletedBlocks.length > 1) {
                for (const b of seletedBlocks) {
                    if (b.model.id === containerId) continue
                    container.embed(b.model)
                    container.fitEmbeds({deep: true, padding: 10})
                }
            } else {
                container.remove()
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
        linkView.addTools(normalLinkToolsView)
        // linkView.showTools()
    })

    paper.on('link:mouseleave', (linkView) => {
        linkView.hideTools()
    })

}