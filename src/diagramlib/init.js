import {dia, shapes, highlighters, elementTools, g } from 'jointjs';
import createBlock from './shapes/rect'
import createNormalLink from './shapes/link'

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
        defaultLink: createNormalLink
    });



    return { graph, paper }
}

export function demo(graph, paper) {
    if (!graph || !paper) return

    const rect1 = createBlock(paper, graph).rect

    const rect2 = createBlock(paper, graph).rect

    rect2.position(100,200)

    console.log(rect1.role)
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
