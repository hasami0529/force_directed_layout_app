import { createNormalLink } from './shapes/link'
import { createBlock, createBus } from './shapes/rect'
import { setLabel } from '../utils'
import { addPort } from './factory'
import { shapes } from 'jointjs'
import { responseToTag } from './tag_engine'

export { addBlock, setLabel, addPort, addSlot } from './factory'
export { init, initPaperEvents } from './init'

function createBlockWithParam(paper, graph, label, tags) {
    const { rect: b, elementView: v } = createBlock(paper, graph)
    setLabel(b, label)
    b.tags= tags
    return b
}

function ecomini(graph, paper) {


    // create blocks
    const Accelerometer = createBlockWithParam(paper, graph, 'Accelerometer', ['Accelerometer'])
    Accelerometer.resize(200, 50)
    Accelerometer.position(500, 30)


    const SDCard = createBlockWithParam(paper, graph, 'SD Card', ['SDCard'])
    SDCard.resize(150, 50)
    SDCard.position(750, 30)

    const serialFlash = createBlockWithParam(paper, graph, 'Serial Flash', ['serialFlash'])
    serialFlash.resize(150, 50)
    serialFlash.position(950, 30)


    const nRF24LE1 = createBlockWithParam(paper, graph, 'nRF24LE1', ['chip'])
    nRF24LE1.resize(500, 200)
    nRF24LE1.position(550, 150)


    const Antenna = createBlockWithParam(paper, graph, 'Antenna', ['Antenna'])
    Antenna.resize(70, 30)
    Antenna.position(1100, 250)

    const LED1 = createBlockWithParam(paper, graph, 'LED', ['LED'])
    LED1.resize(100, 50)
    LED1.position(600, 450)

    const LED2 = createBlockWithParam(paper, graph, 'LED', ['LED'])
    LED2.resize(100, 50)
    LED2.position(750, 450)

    const button = createBlockWithParam(paper, graph, 'button', ['button'])
    button.resize(70, 70)
    button.position(900, 450)

    const moduleInterface = createBlockWithParam(paper, graph, 'Module Interface', ['interface'])
    moduleInterface.resize(130, 130)
    moduleInterface.position(160, 220)

    const camera = createBlockWithParam(paper, graph, 'camera', ['camera'])
    camera.resize(100, 100)
    camera.position(90, 70)

    const GPS = createBlockWithParam(paper, graph, 'GPS', ['GPS'])
    GPS.resize(100, 100)
    GPS.position(250, 70)

    const speaker = createBlockWithParam(paper, graph, 'speaker', ['speaker'])
    speaker.resize(100, 100)
    speaker.position(90, 450)

    const USB_UART = createBlockWithParam(paper, graph, 'USB-UART', ['USB_UART'])
    USB_UART.resize(100, 100)
    USB_UART.position(250, 450)

    // nRF24LE1's ports


    // resize

    // PCMCIAController.resize(200, 100)
    // CPU.resize(200, 100)

    // connection
    // addPort(CPU, 'left')
    // addPort(CPU, 'left')
    // addPort(CPU, 'left')

    // let blocks = [RAM, ROM, PCMCIAController, CPU, touchPanel, LCDPanel, COMPort]
    let blocks = [
        Accelerometer,
        SDCard,
        serialFlash,
        nRF24LE1,
        Antenna,
        LED1,
        LED2,
        button,
        moduleInterface,
        camera,
        GPS,
        speaker,
        USB_UART
    ]

    // decide size and positon based on tags

    // routing

    // rendering
    graph.addCells(...blocks)
    blocks.map( model => responseToTag(paper, model, model.tags[0]))



    // const link = createNormalLink()
    
    // link.source(CPU);
    // link.target(RAM)

    // link.addTo(graph)
    // console.log(link)
    

    return blocks
}

export function demo(graph, paper) {

    // drawSections(graph, GRID)
    return ecomini(graph, paper)
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
