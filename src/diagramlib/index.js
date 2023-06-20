import { createNormalLink } from './shapes/link'
import { createBlock } from './shapes/rect'
import { Vector } from 'matter-js'

export { addBlock, setLabel, addPort, addSlot } from './factory'
export { init, initPaperEvents } from './init'

export function regualrDiagramDemo(graph, paper) {
    const { rect: b1, elementView: v1 } = createBlock({x: 196, y:153}, 'block1')
    const { rect: b2, elementView: v2 } = createBlock({x: 318, y:153}, 'block2')

    const l = createNormalLink()
    l.source(b1, {
        connectionPoint :{
            name: "anchor",
        },
        anchor: {
            name: "right",
        }
    });
    l.target(b2,{
        connectionPoint :{
            name: "anchor",
        },
        anchor: {
            name: "left",
        }})
    const bbox = b1.getBBox()
    console.log(bbox)
    // l.vertices([{x: 295, y:181}])

    b1.addTo(graph)
    b2.addTo(graph)
    l.addTo(graph)


    paper.on('link:pointerclick', (linkView, evt, x, y) => {
        const linkModel = linkView.model
        const t = linkModel.getTargetElement()
        const p = linkView.getConnection()

        // split segments
        const s = p.divideAt(0.5)[1].segments[0]

        console.log(s)
        const middlePoint = s.end
        const movingPoint = s.nextSegment.end

        let v = Vector.create(movingPoint.x - middlePoint.x, movingPoint.y - middlePoint.y)
        let r = Vector.rotate(v, (45/180)*3.14) // (60/180)*3.14

        // scaling 
        // middlePoint.translate(30,0)

        t.position(middlePoint.x + r.x+ 30, middlePoint.y + r.y)
        linkModel.vertices([{
            x: (t.position().x + middlePoint.x)/2,
            y: middlePoint.y
        }])

        // console.log(p.divideAt(0.5))
        // console.log(p)
    })

}



export function demo(graph, paper) {
    const { rect: t, elementView: tv } = createBlock({x: 20, y:20}, 'test')
    t.addTo(graph)

    return regualrDiagramDemo(graph, paper)
}

