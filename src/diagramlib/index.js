import { createNormalLink } from './shapes/link'
import { createBlock } from './shapes/rect'
import { getLabel } from '../utils'

export { addBlock, setLabel, addPort, addSlot } from './factory'
export { init, initPaperEvents } from './init'


export function blueBox(graph, paper) {

    const { rect: DSP } = createBlock({x: 523, y:300}, 'DSP')
    DSP.size(160,110)

    const { rect: Body_Temp } = createBlock({x: 300, y:227}, 'body temp.')
    const { rect: Env_Temp } = createBlock({x: 300, y:327}, 'env. temp.')
    const { rect: Env_Mic } = createBlock({x: 887, y:245}, 'Env. Mic')
    const { rect: Contact_Mic } = createBlock({x: 887, y:345}, 'Contact Mic')
    const { rect: BLE } = createBlock({x: 566, y:97}, 'BLE')

    const { rect: Flash } = createBlock({x: 392, y:460}, 'Flash')
    const { rect: Micro_SD } = createBlock({x: 515, y:460}, 'Micro SD')
    const { rect: Electorde } = createBlock({x: 887, y:413}, 'Electorde')
    const { rect: Decoder } = createBlock({x: 739, y:296}, 'Decoder')


    // expandable
    const { rect: link1 } = createBlock({x: 739, y:413}, 'Link1')
    const { rect: link2 } = createBlock({x: 566, y:191}, 'Link2')

    DSP.addTo(graph)
    Env_Temp.addTo(graph)
    Body_Temp.addTo(graph)
    Env_Mic.addTo(graph)
    BLE.addTo(graph)
    Contact_Mic.addTo(graph)
    Flash.addTo(graph)
    Electorde.addTo(graph)
    Micro_SD.addTo(graph)
    Decoder.addTo(graph)



    //
    link2.expandable = true
    link1.expandable = true
    link1.addTo(graph)
    link2.addTo(graph)


    function connect(b1, b2) {
        const l1 = createNormalLink()
        l1.target(b1)
        l1.source(b2)
        l1.addTo(graph)
    }

    // const l7 = createNormalLink()
    // const l7 = createNormalLink()
    // const l7 = createNormalLink()
    // const l7 = createNormalLink()


    connect(Body_Temp, DSP)
    connect(Env_Temp, DSP)
    connect(Flash, DSP)
    connect(Micro_SD, DSP)
    connect(Env_Mic, Decoder)
    connect(Contact_Mic, Decoder)
    connect(Decoder, DSP)


    connect(Electorde, link1)
    connect(link1, DSP)

    connect(BLE, link2)
    connect(link2, DSP)

    // block style link
    link1.addTo(graph)

}

export function basicOperationDemo(graph, paper) {

    // paper.on('link:pointerclick', (linkView, evt, x, y) => {
    //     const linkModel = linkView.model
    //     const t = linkModel.getTargetElement()
    //     const p = linkView.getConnection()

    //     // split segments
    //     const s = p.divideAt(0.5)[1].segments[0]

    //     console.log(s)
    //     const middlePoint = s.end
    //     const movingPoint = s.nextSegment.end

    //     let v = Vector.create(movingPoint.x - middlePoint.x, movingPoint.y - middlePoint.y)
    //     let r = Vector.rotate(v, (90/180)*3.14) // (60/180)*3.14

    //     // scaling 
    //     // middlePoint.translate(30,0)

    //     t.position(middlePoint.x + r.x, middlePoint.y + r.y)
    //     linkModel.vertices([{
    //         x: (t.position().x + middlePoint.x)/2,
    //         y: middlePoint.y
    //     }])
    // })

    // paper.on('link:pointerdbclick', (linkView, evt, x, y) => {
    //     const linkModel = linkView.model
    //     const t = linkModel.getTargetElement()
    //     const p = linkView.getConnection()

    //     const { rect: invisibleBlock, elementView: v } = createBlock({x: 318, y:153}, 'invisibleBlock')


    // })

    paper.on('element:pointerclick', (elementView, evt, x, y) => {
        const m = elementView.model
        
        switch (getLabel(elementView.model)) {
            case "block2":
                const l = graph.getConnectedLinks(m)[0]
                console.log(l)
                b2.position(374, 154)

                l.insertVertex(0, {x: 327,y: 180.5})
                b2.position(327-23.5, 180.5+40.7)
                
                break;
        
            default:
                break;
        }
    })

    const { rect: b1, elementView: v1 } = createBlock({x: 200, y:153}, 'block1')
    const { rect: x, elementView: vx } = createBlock({x: 330, y:153}, 'expandable')
    x.expandable = true
    const { rect: b2, elementView: v2 } = createBlock({x: 460, y:153}, 'block2')

    // link length = 50
    const l = createNormalLink()
    l.source(b1)
    l.target(x)

    const l2 = createNormalLink()
    l2.source(x)
    l2.target(b2)


    b1.addTo(graph)
    b2.addTo(graph)
    x.addTo(graph)
    l.addTo(graph)
    l2.addTo(graph)

}



export function demo(graph, paper) {
    const { rect: t, elementView: tv } = createBlock({x: 20, y:20}, 'test')
    t.addTo(graph)



    return blueBox(graph, paper)
}


