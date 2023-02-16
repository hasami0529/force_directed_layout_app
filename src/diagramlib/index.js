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
    const mcu = createBlockWithParam(paper, graph, 'MCU', ['MCU', 'controller', 'center'])
    const dac = createBlockWithParam(paper, graph, 'DAC', ['DAC', 'audio_interface'])
    const speaker = createBlockWithParam(paper, graph, 'speaker', ['speaker', 'output'])

    mcu.position(10,20)
    dac.position(30,40)
    speaker.position(50,70)

    let blocks = [mcu, dac, speaker]

    // decide size and positon based on tags

    // routing

    // rendering
    graph.addCells(...blocks)

    return blocks
}

export function demo(graph, paper) {

    // drawSections(graph, GRID)
    return demo_diagram(graph, paper)
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
