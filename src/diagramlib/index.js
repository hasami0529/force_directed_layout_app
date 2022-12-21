import { createNormalLink } from './shapes/link'
import { createBlock, createBus } from './shapes/rect'

export { addBlock, setLabel, addPort, addSlot } from './factory'
export { init, initPaperEvents } from './init'

export function demo(graph, paper) {
    const { rect: b1, elementView: v1 } = createBlock(paper, graph)
    const { rect: b2, elementView: v2 } = createBlock(paper, graph)
    const { rect: b3, elementView: v3 } = createBus(paper, graph)
    b1.position(30,50)

    b3.resize(40, 400)

    b1.addPort({
        group: 'right',
        id: 'portA',
    })

    b2.addPort({
        group: 'left',
        id: 'portB'
    })

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
