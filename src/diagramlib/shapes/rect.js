import { shapes } from 'jointjs';
import { leftPort, rightPort, topPort, bottomPort } from './ports'
import { leftSlot, rightSlot } from './slot'


const attrs = {
    body: {
        fill: '#2BF0FB', // be defined in css
        class: 'block'
    },
    label: {
        text: 'block',
        fill: 'black'
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

export function createBlock() {

    var rect = new shapes.standard.Rectangle(attrs);
    rect.attr(attrs)
    rect.role = 'Block'
    rect.position(100, 30);
    rect.resize(100, 70);
    // rect.addTo(graph) // shouldn't be here

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
    // elementView.addTools(blockToolView);
    elementView.hideTools()
    return { rect, elementView }
}
