import { shapes } from 'jointjs'

export default function createNormalLink(cellView, magnet){
    return new shapes.standard.Link({
        attrs: {
            line: {
                connection: true,
                stroke: '#333333',
                strokeWidth: 2,
                strokeLinejoin: 'round',
                targetMarker: {
                    'type': 'path',
                    'd': 'M 10 -5 0 0 10 5 z'
                }
            },
            wrapper: {
                connection: true,
                strokeWidth: 10,
                strokeLinejoin: 'round'
            }
        }
    })
}