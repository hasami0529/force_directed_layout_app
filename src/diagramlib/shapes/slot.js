export let commonSlot = {
    attrs: {
        slotBody: {
            magnet: 'active',
            r: 5,
            fill: 'white',
            stroke: 'black',
            event: 'slot:click',
            role: 'Slot'
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
        selector: 'slotBody',
    }]
};

export const leftSlot = {
    position: {
        name: 'left',
    },
    ...commonSlot,
}

export const rightSlot = {
    position: {
        name: 'right',
    },
    ...commonSlot,
}

// export const topPort = {
//     position: {
//         name: 'top',
//     },
//     ...commonSlot,
// }

// export const bottomPort = {
//     position: {
//         name: 'bottom',
//     },
//     ...commonSlot,
// }
