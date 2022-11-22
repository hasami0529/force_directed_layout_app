import { canvasActions } from '../store/slice/canvas';
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
        },[]
    )



    return (
        <div class="canvas" id="canvas"></div>
    )
}
