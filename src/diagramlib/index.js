import { createNormalLink } from './shapes/link'
import { createBlock, createBus } from './shapes/rect'
import { setLabel } from '../utils'
import { addPort } from './factory'
import { shapes } from 'jointjs'

export { addBlock, setLabel, addPort, addSlot } from './factory'
export { init, initPaperEvents } from './init'

function createBlockWithParam(paper, graph, label, tags) {
    const { rect: b, elementView: v } = createBlock(paper, graph)
    setLabel(b, label)
    b.tags= tags
    return b
}

function demo_diagram1(graph, paper) {


    // create block
    const RAM = createBlockWithParam(paper, graph, 'RAM', ['RAM', 'center'])
    const ROM = createBlockWithParam(paper, graph, 'ROM', ['DAC', 'ROM'])
    const PCMCIAController = createBlockWithParam(paper, graph, 'PCMCIA Controller', ['controller', 'output'])
    const CPU = createBlockWithParam(paper, graph, 'CPU', ['center', 'CPU'])
    const touchPanel = createBlockWithParam(paper, graph, 'Touch Panel', ['center', 'output'])
    const LCDPanel = createBlockWithParam(paper, graph, 'LCD Panel', ['center', 'output'])
    const COMPort = createBlockWithParam(paper, graph, 'COM port', ['center', 'output'])

    // resize

    // PCMCIAController.resize(200, 100)
    // CPU.resize(200, 100)

    // connection
    // addPort(CPU, 'left')
    // addPort(CPU, 'left')
    // addPort(CPU, 'left')

    let blocks = [RAM, ROM, PCMCIAController, CPU, touchPanel, LCDPanel, COMPort]
    // let blocks = [RAM, ROM]

    // decide size and positon based on tags

    // routing

    // rendering
    graph.addCells(...blocks)
    // console.log()

    const link = createNormalLink()
    
    // link.source(CPU);
    // link.target(RAM)

    // link.addTo(graph)
    // console.log(link)
    

    return blocks
}

export function demo(graph, paper) {

    // drawSections(graph, GRID)
    return demo_diagram1(graph, paper)
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
