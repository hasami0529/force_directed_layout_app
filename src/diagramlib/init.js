import {dia, shapes, highlighters, elementTools } from 'jointjs';
import createBlock from './shapes/rect'

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
        linkPinning: false,
        highlighting: false,
    });



    return { graph, paper }
}

export function demo(graph, paper) {
    if (!graph || !paper) return
    createBlock(paper, graph)
}

export function addBlock(paper, graph) {
    createBlock(paper, graph)
}

