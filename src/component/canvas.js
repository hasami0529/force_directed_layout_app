import {dia, shapes, highlighters } from 'jointjs';
import { useEffect, useState } from 'react'
import { selectContextMenu } from '../store/slice/contextmenu'
import { useDispatch } from 'react-redux'
import { contextMenuActions } from '../store/slice/contextmenu'
import { taglibActions } from '../store/slice/taglib';

function demo(graph) {

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

function initPaperEvent(paper, dispatch) {

    paper.on('blank:contextmenu', (evt, x, y) => {
        // console.log('rightclick')
        dispatch(
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

        dispatch(
            taglibActions.showTag({elementId: elementView.id})
        )

    });

    document.addEventListener('click', (event) => {
        dispatch(
            contextMenuActions.disable({event})
        )
    })

}

function addBlock(graph) {

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



export function Canvas({ canvasAction, setShowMenu }) {

    const dispatch = useDispatch()

    const [ graph, setGraph ] = useState(null)
    const [ paper, setPaper ] = useState(null)

    useEffect(
        () => {
            console.log('init')

            var namespace = shapes;
            var _graph = new dia.Graph({}, { cellNamespace: namespace });
        
            var _paper = new dia.Paper({
                el: document.getElementById("canvas"),
                model: _graph,
                width: "100%",
                height: "100%",
                gridSize: 1,
                cellViewNamespace: namespace
        
            });

            initPaperEvent(_paper, dispatch)
            demo(_graph)

            setGraph(_graph)
            setPaper(_paper)
        },[]
    )

    useEffect(
        () => {
            console.log(canvasAction)
            if (canvasAction.action === 'addBlock') {
                addBlock(graph)
                canvasAction.action = 'done'
            }
        },
        [canvasAction]
    )

    return (
        <div id="canvas"></div>
    )
}
