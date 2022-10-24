import {dia, shapes, highlighters } from 'jointjs';
import { taglibActions } from '../store/slice/taglib';
import { contextMenuActions } from '../store/slice/contextmenu';
import { useDispatch } from 'react-redux';
import store from "../store";

export function init() {
    var namespace = shapes;
    var graph = new dia.Graph({}, { cellNamespace: namespace });

    var paper = new dia.Paper({
        el: document.getElementById("canvas"),
        model: graph,
        width: "100%",
        height: "100%",
        gridSize: 1,
        cellViewNamespace: namespace

    });

    return { graph, paper }
}

export function demo(graph) {

    var rect = new shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
        body: {
            fill: 'blue'
        },
        label: {
            text: 'Hello',
            fill: 'white'
        }
    });
    rect.addTo(graph);

    var rect2 = rect.clone();
    rect2.translate(300, 0);
    rect2.attr('label/text', 'World!');
    rect2.addTo(graph);

    var link = new shapes.standard.Link();
    link.source(rect);
    link.target(rect2);
    link.addTo(graph);

}

export function addBlock(graph) {

    var rect = new shapes.standard.Rectangle();
    rect.position(150, 80);
    rect.resize(100, 40);
    rect.attr({
        body: {
            fill: 'blue'
        },
        label: {
            text: 'New',
            fill: 'white'
        }
    });
    rect.addTo(graph);
}

export function initPaperEvents(paper) {

    paper.on('blank:contextmenu', (evt, x, y) => {
        // console.log('rightclick')
        store.dispatch(
            contextMenuActions.showMenu({ event: evt })
        )
    })

    paper.on('element:pointerclick', (elementView) => {
        highlighters.mask.add(elementView, { selector: 'root' }, 'my-element-highlight', {
            deep: true,
            attrs: {
                'stroke': '#FF4365',
                'stroke-width': 3
            }
        });

        // var id = elementView.findAttribute('id')
        console.log(elementView.id)

        store.dispatch(
            taglibActions.showTag({ elementId: elementView.id })
        )
    });

    document.addEventListener('click', (event) => {
        store.dispatch(
            contextMenuActions.disable({event})
        )
    })

}