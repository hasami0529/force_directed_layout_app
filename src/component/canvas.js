import {dia, shapes, highlighters } from 'jointjs';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { contextMenuActions } from '../store/slice/contextmenu'
import { taglibActions } from '../store/slice/taglib';
import { canvasActions, selectCanvas } from '../store/slice/canvas';

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
                'stroke': '#FF4365',
                'stroke-width': 3
            }
        });

        console.log(elementView.id)

        dispatch(
            taglibActions.showTag({ elementId: elementView.id })
        )
    });

    document.addEventListener('click', (event) => {
        dispatch(
            contextMenuActions.disable({event})
        )
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

            dispatch(
                canvasActions.demo()
            )

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
        <div id="canvas"></div>
    )
}
