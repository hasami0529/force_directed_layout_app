export let port = {
    attrs: {
        portBody: {
            magnet: 'active',
            // r: 10,
            fill: '#c8b029',
            stroke: 'black',
            width: 10,
            height: 10,
            x: -5,
            y: -5,
            role: 'Port'
        }
    },
    // label: {
    //     position: {
    //         name: 'left',
    //         // args: { y: 6 } 
    //     },
    //     markup: [{
    //         tagName: 'text',
    //         selector: 'label',
    //         className: 'label-text'
    //     }]
    // },
    markup: [{
        tagName: 'rect',
        selector: 'portBody',
    }]
};

export const leftPort = {
    position: {
        name: 'left',
    },
    ...port,
}

export const rightPort = {
    position: {
        name: 'right',
    },
    ...port,
}

export const topPort = {
    position: {
        name: 'top',
    },
    ...port,
}

export const bottomPort = {
    position: {
        name: 'bottom',
    },
    ...port,
}
