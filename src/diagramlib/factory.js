import { dia, } from 'jointjs';
import { createBlock,  }  from './shapes/rect'


export function addBlock(paper, graph) {
    createBlock(paper, graph)
}

export function setLabel(model, label) {
    if (model instanceof dia.Element) {
        model.attr('label/text', label)
    } else {
        console.warning('model is not as expected')
    }
}

export function addPort(model, direction) {

    model.addPort({
        group: direction,
        // attrs: { label: { text: 'in2' }}
    })
}
