import { createNormalLink } from './shapes/link'
import { createBlock, createBus } from './shapes/rect'
import { setLabel } from '../utils'

export { addBlock, setLabel, addPort, addSlot } from './factory'
export { init, initPaperEvents } from './init'

function createBlockWithParam(paper, graph, label, tags) {
    const { rect: b, elementView: v } = createBlock(paper, graph)
    setLabel(b, label)
    b.tags= tags
    return b
}

function demo_diagram(graph, paper) {
    // create elements
    const b = createBlockWithParam(paper, graph, 'microcontrller', ['MCU', 'controller', 'center'])
    b.position(0,1)

    // decide size and positon based on tags

    // routing

    // rendering
    b.addTo(graph)
}

export function demo(graph, paper) {

    demo_diagram(graph, paper)
    // const { rect: b1, elementView: v1 } = createBlock(paper, graph)
    // const { rect: b2, elementView: v2 } = createBlock(paper, graph)
    // b1.position(30,50)

}

// pass routing for now
// function routing() {
    // b1.addPort({
    //     group: 'right',
    //     id: 'portA',
    // })

    // b2.addPort({
    //     group: 'left',
    //     id: 'portB'
    // })

    // const link = createNormalLink()
    // link.source(b1, {
    //     port: b1.getPorts()[0].id,
    //     connectionPoint: {
    //         name: 'anchor',
    //     },
        
    // });

    // link.target(b2, {
    //     port: b2.getPorts()[0].id,
    //     connectionPoint: {
    //         name: 'anchor',
    //     },
    // })

    // link.addTo(graph)

// }
