import {dia, shapes, highlighters } from 'jointjs';
import rectAttrs from './shapes/rect'

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

export function demo(graph) {

    var rect = new shapes.standard.Rectangle(rectAttrs);
    // var rect = new shapes.standard.Rectangle();
    rect.attr(rectAttrs)
    rect.position(100, 30);
    rect.resize(100, 40);

    rect.addTo(graph);

    var rect2 = rect.clone();
    rect2.translate(300, 0);
    rect2.attr('label/text', 'World!');
    rect2.addTo(graph);

}

export function addBlock(graph) {

    var rect = new shapes.standard.Rectangle(rectAttrs);
    rect.attr(rectAttrs)
    rect.position(150, 80);
    rect.resize(100, 40);
    rect.attr({
        body: {
            fill: '#2BF0FB'
        },
        label: {
            text: 'New',
            fill: 'white'
        }
    });
    rect.addTo(graph);
}

