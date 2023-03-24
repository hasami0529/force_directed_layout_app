import { canvasActions } from '../store/slice/canvas';
import { taglibActions } from '../store/slice/taglib';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export function Canvas() {

    const dispatch = useDispatch()

    useEffect(
        () => {
            console.log('init')
            dispatch(
                canvasActions.initPaper({ dispatch, })
            )
            dispatch(
                taglibActions.init()
            )
        },[]
    )



    return (
        <div class="canvas" id="canvas"></div>
    )
}
