import {dia, shapes, highlighters, g, linkTools } from 'jointjs';
import { createBlock, createContainer }  from './shapes/rect'
import createNormalLink from './shapes/link'
import { inspectActions } from '../store/slice/inspect'
import { contextMenuActions } from '../store/slice/contextmenu'
import { showTags } from '../store/slice/taglib';
import { canvasActions } from '../store/slice/canvas';
import { blockToolView, expandedContainerToolsView, collapsedContainerToolsView } from './shapes/tools'


export function initPaperEvents(paper, dispatch) {

    paper.on('blank:contextmenu', (evt, x, y) => {
        dispatch(
            contextMenuActions.showMenu({ event: evt })
        )
    })

    paper.on('element:pointerclick', (elementView) => {
        // console.log(highlighters.mask.get(elementView))
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
                showTags({elementId: elementView.id})
            )
            dispatch(
                inspectActions.showBlockInfo({ model: elementView.model })
            )
            
        } else {
            highlighters.mask.remove(elementView);
        }

    })

    document.addEventListener('click', (event) => {
        dispatch(
            contextMenuActions.disable({event})
        )
    })

    paper.on('element:contextmenu', function(cellView, evt) {
        dispatch(
            contextMenuActions.showBlockMenu({ evt, target: cellView})
        )
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

}


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
        // linkPinning: false,
        highlighting: false,
        embeddingMode: true,
        defaultRouter: {
            name: "orthogonal",
            args: {
                padding: 10,
            }
        },
        defaultLink: createNormalLink,
        validateConnection: () => true // WIP
    });

    return { graph, paper }
}

export function demo(graph, paper) {
    const { rect: b1, elementView: v1 } = createBlock(paper, graph)
    const { rect: b2, elementView: v2 } = createBlock(paper, graph)
    b1.position(30,50)

    const link = createNormalLink()
    link.source(b1, {
        connectionPoint: {
            name: 'bbox',
            args: {
                offset: 10,
                stroke: true,
            }
        }
    });

    link.target(b2)

    // link.addTo(graph)

}

export function addBlock(paper, graph) {
    createBlock(paper, graph)
}

export function setLabel(model, label) {
    if (model instanceof dia.Element) {
        model.attr('label/text', label)
    } else {
        console.warning('model is not as expected')
    }
}

export function addPort(model, direction) {

    model.addPort({
        group: direction,
        // attrs: { label: { text: 'in2' }}
    })
}
