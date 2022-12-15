import { createNormalLink } from './shapes/link'
import { createBlock } from './shapes/rect'

export { addBlock, setLabel, addPort } from './factory'
export { init, initPaperEvents } from './init'

export function demo(graph, paper) {
    const { rect: b1, elementView: v1 } = createBlock(paper, graph)
    const { rect: b2, elementView: v2 } = createBlock(paper, graph)
    b1.position(30,50)

    const link = createNormalLink()
    link.source(b1, {
        connectionPoint: {
            name: 'bbox',
            args: {
                offset: 10,
                stroke: true,
            }
        }
    });

    link.target(b2)

    // link.addTo(graph)

}
