import { createNormalLink } from './shapes/link'
import { createBlock } from './shapes/rect'

export { addBlock, setLabel, addPort } from './factory'
export { init, initPaperEvents } from './init'

export function demo(graph, paper) {
    const { rect: b1, elementView: v1 } = createBlock(paper, graph)
    const { rect: b2, elementView: v2 } = createBlock(paper, graph)
    b1.position(30,50)

    b1.addPort({
        group: 'right',
        id: 'portA',
    })

    b2.addPort({
        group: 'left',
        id: 'portB'
    })

    console.log(b1.getPorts()[0].id)

    const link = createNormalLink()
    link.source(b1, {
        port: b1.getPorts()[0].id,
        connectionPoint: {
            name: 'anchor',
        },
        
    });

    link.target(b2, {
        port: b2.getPorts()[0].id,
        connectionPoint: {
            name: 'anchor',
        },
    })

    link.addTo(graph)

}
