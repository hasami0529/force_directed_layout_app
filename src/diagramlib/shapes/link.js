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

var bindingLink = dia.Link.define('bindingLink', {
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
        sArrowhead: {
                fill: 'black',
                // connection: true,
                atConnectionRatioKeepGradient: 0,
        },
        tArrowhead: {
                fill: 'black',
                // connection: true,
                atConnectionRatioKeepGradient: 1,
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
        tagName: 'path',
        selector: 'sArrowhead',
        attributes: {
            d: 'M 10 -5 0 0 10 5 z'
        }
    },
    {
        tagName: 'path',
        selector: 'tArrowhead',
        attributes: {
            d: 'M 0 5 10 0 0 -5 z'
        }
    }
    ]
}
);

export function createBindingLink(cellView, magnet){
    console.log(cellView)
    return new bindingLink();
}


export function createNormalLink(cellView, magnet){
    return new SlotLink();
}