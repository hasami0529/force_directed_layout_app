import {dia, shapes, highlighters, g } from 'jointjs';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { contextMenuActions } from '../store/slice/contextmenu'
import { taglibActions } from '../store/slice/taglib';
import { canvasActions, selectCanvas } from '../store/slice/canvas';
import { inspectActions } from '../store/slice/inspect'


function initPaperEvents(paper, dispatch) {

    paper.on('blank:contextmenu', (evt, x, y) => {
        dispatch(
            contextMenuActions.showMenu({ event: evt })
        )
    })

    paper.on('element:pointerclick', (elementView) => {
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
            taglibActions.showTag({elementId: elementView.id})
        )

        dispatch(
            inspectActions.showBlockInfo({ model: elementView.model })
        )
    })

    // paper.on('cell:unhighlight', (elementView) =>  {

    //     highlighter.remove(elementView, );
    // });

    document.addEventListener('click', (event) => {
        dispatch(
            contextMenuActions.disable({event})
        )
    })

    paper.on('element:mouseenter', function(elementView) {
        elementView.showTools();
    });
    
    paper.on('element:mouseleave', function(elementView) {
        elementView.hideTools();
    });

    // for range selection
    paper.on({
        'blank:pointerdown': function(evt, x, y) {
            var data = evt.data = {};
            var cell;


            cell = new shapes.standard.Rectangle({
                attrs: {
                    body: {
                        strokeDasharray: "10 5",
                        opacity: "100%",
                        fillOpacity: 0,
                    },
                },
            })
            cell.position(x, y);
            cell.toBack()
            data.x = x;
            data.y = y;

            cell.addTo(this.model);
            data.cell = cell;
        },
        'blank:pointermove': function(evt, x, y) {
            var data = evt.data;
            var cell = data.cell;
            var bbox = new g.Rect(data.x, data.y, x - data.x, y - data.y);
            bbox.normalize();
            cell.set({
                position: { x: bbox.x, y: bbox.y },
                size: { width: Math.max(bbox.width, 1), height: Math.max(bbox.height, 1) }
                });
        },
        'blank:pointerup': function(evt) {
            var cell = evt.data.cell;
            const seletedBlocks = this.findViewsInArea(cell.getBBox())
            console.log(seletedBlocks.length)
            if (seletedBlocks.length > 1) {
                seletedBlocks.pop() // remove container itself
                seletedBlocks.map(e => {
                    cell.embed(e.model)
                    cell.fitEmbeds({deep: true, padding: 10})
                })
            } else {
                cell.remove()
            }
        },
    })

}



export function Canvas() {

    const dispatch = useDispatch()
    const states = useSelector(selectCanvas)

    useEffect(
        () => {
            console.log('init')

            dispatch(
                canvasActions.initPaper()
            )

            // dispatch(
            //     canvasActions.demo()
            // )

        },[]
    )

    useEffect(
        () => {
            try {
                initPaperEvents(states.paper, dispatch)
            } catch (error) {
                console.warn('Add listeners will fail on the first time. It might be a bug.')
            }
        }, [states.paper]
    )

    return (
        <div class="canvas" id="canvas"></div>
    )
}
