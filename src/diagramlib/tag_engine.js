import { dia } from 'jointjs'
import * as styleTags from './styleLib'

let colorCache = {}

let color = []

export function init() {
    Object.keys(styleTags).forEach( funcName => {
        colorCache[funcName] = styleTags[funcName]
        color.push(styleTags[funcName])
    })
}

const colorGenerator = randomColor()

export function responseToTag(paper, model, tag) {
    if (model instanceof dia.Cell) {
        const func = getShape(tag)
        func(paper, model)
    }
}

function getShape(tag) {

    if (colorCache[tag] === undefined){
        colorCache[tag] = colorGenerator.next().value
        return colorCache[tag]
    }
    else {
        return colorCache[tag]
    }
}

function* randomColor() {
    let i = 0
    while (true) {
        yield color[i]
        i = (++i % color.length)
        console.log(i)
    }
}

