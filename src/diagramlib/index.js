import { createNormalLink } from './shapes/link'
import { createBlock } from './shapes/rect'
import { Vector } from 'matter-js'
import { getLabel } from '../utils'

export { addBlock, setLabel, addPort, addSlot } from './factory'
export { init, initPaperEvents } from './init'


export function blueBox(graph, paper) {

    const { rect: DSP } = createBlock({x: 372, y:195}, 'DSP')
    DSP.size(160,110)

    const { rect: Temp } = createBlock({x: 230, y:195}, 'Temp')
    const { rect: Env_Mic } = createBlock({x: 630, y:171}, 'Env. Mic')
    const { rect: Contact_Mic } = createBlock({x: 630, y:273}, 'Contact Mic')
    const { rect: BLE } = createBlock({x: 413, y:92}, 'BLE')

    const { rect: Flash } = createBlock({x: 230, y:321}, 'Flash')
    const { rect: Micro_SD } = createBlock({x: 230, y:422}, 'Micro SD')
    const { rect: Eletorde } = createBlock({x: 630, y:393}, 'Eletorde')

    DSP.addTo(graph)
    Temp.addTo(graph)
    Env_Mic.addTo(graph)
    BLE.addTo(graph)
    Contact_Mic.addTo(graph)
    Flash.addTo(graph)
    Eletorde.addTo(graph)
    Micro_SD.addTo(graph)

    const l1 = createNormalLink()
    const l2 = createNormalLink()
    const l3 = createNormalLink()
    const l4 = createNormalLink()
    const l5 = createNormalLink()
    const l6 = createNormalLink()
    const l7 = createNormalLink()

    l1.target(Temp)
    l1.source(DSP)



    l2.target(Flash)
    l2.source(DSP)

    l3.target(Micro_SD)
    l3.source(DSP)

    l4.target(BLE)
    l4.source(DSP)

    l5.target(Env_Mic)
    l5.source(DSP)

    l6.target(Contact_Mic)
    l6.source(DSP)

    l7.target(Eletorde)
    l7.source(DSP)

    // l3.insertVertex(0, {
    //     x: 452, y: 397
    // })

        

    l1.addTo(graph)
    l2.addTo(graph)
    l3.addTo(graph)
    l4.addTo(graph)
    l5.addTo(graph)
    l6.addTo(graph)
    l7.addTo(graph)

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


