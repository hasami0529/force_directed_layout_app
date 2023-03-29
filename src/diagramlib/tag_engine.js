import { dia } from 'jointjs'
import * as generalTags from './styles/general'
import * as compTags from './styles/comp'

let colorCache = {}

let color = []

export function initTagsLib() {
    Object.keys(generalTags).forEach( funcName => {
        colorCache[funcName] = generalTags[funcName]
        color.push(generalTags[funcName])
    })

    Object.keys(compTags).forEach( funcName => {
        colorCache[funcName] = compTags[funcName]
    })
    // console.log(colorCache)
}

const colorGenerator = randomColor()

export function responseToTag(paper, model, tag) {
    console.log(colorCache)
    if (model instanceof dia.Cell) {
        const func = getShape(tag)
        func(paper, model)
    }
}

function getShape(tag) {

    if (colorCache[tag] === undefined){
        // colorCache[tag] = colorGenerator.next().value
        // return colorCache[tag]
        return () => console.log('') //  jump over
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
    }
}

