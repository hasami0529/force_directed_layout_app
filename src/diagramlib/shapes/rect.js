import { shapes } from 'jointjs';
import { leftPort, rightPort, topPort, bottomPort } from './ports'
import { leftSlot, rightSlot } from './slot'


const attrs = {
    body: {
        fill: '#2BF0FB', // be defined in css
        class: 'block'
    },
    label: {
        text: 'blocks',
        fill: 'black'
    },
    bodyPath: {},
    ports: {
        groups: {
            'left': leftPort,
            'right': rightPort,
            'top': topPort,
            'bottom': bottomPort,
        },
    }
}

const containerAttrs = {
    attrs: {
        body: {
            class: 'expanded-container',
            strokeDasharray: "10 5",
            opacity: "100%",
            fillOpacity: 0,
        },
        label: {
            label: "block",
            fill: "black",
        }
    },
    ports: {
        groups: {
            'left': leftPort,
            'right': rightPort,
            'top': topPort,
            'bottom': bottomPort,
        },
    }
}

const layoutBox = {
    attrs: {
        body: {
            class: 'layout-box',
            strokeDasharray: "10 5",
            opacity: "100%",
            fillOpacity: 0,
        },
        label: {
            label: "layout-box",
            fill: "black",
        }
    }
}

const BusAttrs = {
    body: {
        fill: '#9A7B4F', // be defined in css
        class: 'block',
    },
    label: {
        text: 'Bus',
        fill: 'black'
    },
    ports: {
        groups: {
            'left': leftSlot,
            'right': rightSlot,
        },
    }
}



export function createContainer(paper, graph) {
    var container = new shapes.standard.Rectangle(containerAttrs)
    container.role = "expanded-container"
    // attach to graph and generate a view of element
    container.addTo(paper.model)
    var elementView = container.findView(paper);
    container.attr("label/text", elementView.id)

    // elementView.addTools(expandedContainerToolsView);
    elementView.showTools()

    return { container, elementView }
}

export function createLayoutBox(paper, graph) {
    var layoutBoxBlock = new shapes.standard.Rectangle(layoutBox)
    layoutBoxBlock.role = "layout-box"
    layoutBoxBlock.addTo(paper.model)
    var elementView = layoutBoxBlock.findView(paper);
    layoutBoxBlock.attr("label/text", elementView.id)

    elementView.showTools()

    return { layoutBoxBlock, elementView }
}

export function createBlock(position, label) {

    attrs.label = {
        text: label
    }

    var rect = new shapes.standard.Rectangle(attrs);
    rect.attr(attrs)
    rect.position(position.x, position.y);
    rect.resize(80, 55);

    return { rect }
}

export function createBus(paper, graph) {

    var rect = new shapes.standard.Rectangle(BusAttrs);
    rect.attr(BusAttrs)
    rect.role = 'Link:Bus'
    rect.position(100, 30);
    rect.resize(100, 20);
    rect.addTo(graph)

    var elementView = rect.findView(paper);
    elementView.hideTools()
    return { rect, elementView }
}
