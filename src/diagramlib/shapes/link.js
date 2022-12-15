import { dia } from 'jointjs'

var SlotLink = dia.Link.define('SlotLink', {
    attrs: {
        line: {
            connection: true,
            stroke: '#333333',
            strokeWidth: 2,
            strokeLinejoin: 'round',
        },
        wrapper: {
            connection: true,
            strokeWidth: 10,
            strokeLinejoin: 'round'
        },
        slotHead: {
                r: 5,
                fill: 'white',
                stroke: 'black',
                atConnectionRatioKeepGradient: 0,
                connection: true,
                event: 'slot:click'
        },
        slotTail: {
                r: 5,
                fill: 'white',
                stroke: 'black',
                atConnectionRatioKeepGradient: 1,
                connection: true,
                event: 'slot:click'
        }
    }
}, {
    markup: [{
        tagName: 'path',
        selector: 'wrapper',
        attributes: {
            'fill': 'none',
            'cursor': 'pointer',
            'stroke': 'transparent'
        }
    },
    {
        tagName: 'path',
        selector: 'line',
        attributes: {
            'fill': 'none',
            'pointer-events': 'none'
        }
    },
    {
        tagName: 'circle',
        selector: 'slotHead'
    },
    {
        tagName: 'circle',
        selector: 'slotTail'
    }
    ]
}
);

export function createNormalLink(cellView, magnet){
    return new SlotLink();
}