var port = {
    // position: {
    //     name: 'left'
    // },
    attrs: {
        portBody: {
            magnet: true,
            r: 10,
            fill: '#abdbe3',
            stroke: '#f8568a'
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
        tagName: 'circle',
        selector: 'portBody'
    }]
};

var outPorts = {
    position: {
        name: 'right'
    },
    attrs: {
        portBody: {
            magnet: true,
            r: 10,
            fill: '#E6A502',
            stroke:'#023047'
        }
    },
    label: {
        position: {
            name: 'right',
            args: { y: 6 }
        },
        markup: [{
            tagName: 'text',
            selector: 'label',
            className: 'label-text'
        }]
    },
    markup: [{
        tagName: 'circle',
        selector: 'portBody'
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
