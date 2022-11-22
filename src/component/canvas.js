import { canvasActions, selectCanvas } from '../store/slice/canvas';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'






export function Canvas() {

    const dispatch = useDispatch()
    const states = useSelector(selectCanvas)

    useEffect(
        () => {
            console.log('init')



            dispatch(
                canvasActions.initPaper({ dispatch, })
            )

            // dispatch(
            //     canvasActions.demo()
            // )

        },[]
    )

    // useEffect(
    //     () => {
    //         try {
    //             initPaperEvents(states.paper, dispatch)
    //         } catch (error) {
    //             console.warn('Add listeners will fail on the first time. It might be a bug.')
    //         }
    //     }, [states.paper]
    // )

    return (
        <div class="canvas" id="canvas"></div>
    )
}
