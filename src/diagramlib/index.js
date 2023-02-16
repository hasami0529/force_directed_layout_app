import { createNormalLink } from './shapes/link'
import { createBlock, createBus } from './shapes/rect'
import { setLabel } from '../utils'
import { shapes } from 'jointjs'

import { PAPERHIEGHT, PAPERWIDTH, GRID } from './config'
import { layout, idealLayout } from './layout'

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

    let blocks = [mcu, dac, speaker]

    idealLayout(graph, paper, blocks)

    // decide size and positon based on tags

    // routing

    // rendering
    graph.addCells(...blocks)
}

export function demo(graph, paper) {

    drawSections(graph, paper)

    demo_diagram(graph, paper)
}

function drawSections(graph, paper) {

    const sectionDivider = shapes.standard.Link.define('sectionDivider', {
        attrs: {
            line: {
                opacity: "20%",
                strokeDasharray: "2 5",
            }}
        });

    const leftLine = new sectionDivider() // left
    const rightLine = new sectionDivider() // right
    const topLine = new sectionDivider() // top
    const bottomLine = new sectionDivider() // bottom

    leftLine.source({ x: GRID.a, y: 0})
    leftLine.target({ x: GRID.a, y: PAPERHIEGHT})

    rightLine.source({ x: PAPERWIDTH-GRID.b, y: 0})
    rightLine.target({ x: PAPERWIDTH-GRID.b, y: PAPERHIEGHT})

    topLine.source({ x: 0, y: GRID.c})
    topLine.target({ x: PAPERWIDTH, y: GRID.c})

    bottomLine.source({ x: 0, y: PAPERHIEGHT-GRID.d})
    bottomLine.target({ x: PAPERWIDTH, y: PAPERHIEGHT-GRID.d})


    graph.addCells(leftLine, rightLine, topLine, bottomLine)
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
