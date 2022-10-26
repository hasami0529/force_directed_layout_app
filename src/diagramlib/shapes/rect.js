import { topPort, bottomPort, rightPort, leftPort } from "./ports";

const attrs = {
    body: {
        fill: '#2BF0FB'
    },
    label: {
        text: 'Hello',
        fill: 'black'
    },
    ports: {
        groups: {
            'left': leftPort,
            'right': rightPort,
            'top': topPort,
            'bottom': bottomPort,
        },
        items: [
            { 
                group: 'left',
                attrs: { label: { text: 'in1' }}
            },
            { 
                group: 'right',
                attrs: { label: { text: 'in2' }}
            },
            { 
                group: 'top',
                attrs: { label: { text: 'out' }}
            },
            { 
                group: 'bottom',
                attrs: { label: { text: 'out' }}
            }
        ]
    }
}

export default attrs;