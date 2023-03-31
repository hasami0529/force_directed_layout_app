import { createNormalLink } from './shapes/link'
import { createBlock } from './shapes/rect'
import { setLabel } from '../utils'

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




    const l = createNormalLink()
    l.source(nRF24LE1);
    l.target(Accelerometer)

    const l2 = createNormalLink()
    l2.source(nRF24LE1);
    l2.target(SDCard)

    const l3 = createNormalLink()
    l3.source(nRF24LE1);
    l3.target(serialFlash)

    const l4 = createNormalLink()
    l4.source(nRF24LE1);
    l4.target(LED1)

    const l5 = createNormalLink()
    l5.source(nRF24LE1);
    l5.target(LED2)

    const l6 = createNormalLink()
    l6.source(nRF24LE1);
    l6.target(Antenna)

    const l7 = createNormalLink()
    l7.source(nRF24LE1);
    l7.target(button)

    const l8 = createNormalLink()
    l8.source(moduleInterface);
    l8.target(camera)

    const l9 = createNormalLink()
    l9.source(moduleInterface);
    l9.target(GPS)

    const l10 = createNormalLink()
    l10.source(moduleInterface);
    l10.target(speaker)

    const l11 = createNormalLink()
    l11.source(moduleInterface);
    l11.target(USB_UART)

    const l12 = createNormalLink()
    l12.source(moduleInterface);
    l12.target(nRF24LE1)

    let links = [
        l,
        l2,
        l3,
        l4,
        l5,
        l6,
        l7,
        l8,
        l9,
        l10,
        l11,
        l12
    ]


    graph.addCells(...blocks, ...links)
    blocks.map( model => responseToTag(paper, model, model.tags[0]))
    

    return blocks
}

export function demo(graph, paper) {

    // return ecomini(graph, paper)
    return test(graph, paper)
}

export function test(graph, paper) {

    const speaker = createBlockWithParam(paper, graph, 'speaker', ['speaker'])
    speaker.resize(100, 100)
    speaker.position(90, 450)


    const USB_UART = createBlockWithParam(paper, graph, 'USB-UART', ['USB_UART'])
    USB_UART.resize(100,100)

    USB_UART.attr('root', {
        image:{}
    })
    USB_UART.icon = 'speaker'
    
    USB_UART.markup = [
        {
            tagName: 'image',
            selector: "body",
            attributes: {
                href: process.env.PUBLIC_URL + 'icon/speaker.png'
            }
        }
    ]

    const l12 = createNormalLink()
    l12.source(speaker);
    l12.target(USB_UART, {
        connectionPoint: {
            name: "anchor",
        },
        anchor: {
            name: "left",
            args: {
                offset: {
                    x: "5%"
                }
            }
        }
        
    })

    USB_UART.addTo(graph)
    speaker.addTo(graph)
    l12.addTo(graph)

}