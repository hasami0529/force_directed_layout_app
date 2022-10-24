import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { canvasActions } from '../store/slice/canvas'

export function Canvas({ canvasAction }) {

    const dispatch = useDispatch()

    useEffect(
        () => {
            console.log('init')

            dispatch(
                canvasActions.initPaper()
            )
        },[]
    )

    return (
        <div id="canvas"></div>
    )
}
