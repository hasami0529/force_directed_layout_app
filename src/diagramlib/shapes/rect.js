import { shapes } from 'jointjs';
import { leftPort, rightPort, topPort, bottomPort } from './ports'


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
        // items: [
        //     { 
        //         group: 'left',
        //         attrs: { label: { text: 'in1' }}
        //     },
        //     { 
        //         group: 'right',
        //         attrs: { label: { text: 'in2' }}
        //     },
        //     { 
        //         group: 'top',
        //         attrs: { label: { text: 'out' }}
        //     },
        //     { 
        //         group: 'bottom',
        //         attrs: { label: { text: 'out' }}
        //     }
        // ]
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

export function createBlock(paper, graph) {

    var rect = new shapes.standard.Rectangle(attrs);
    rect.attr(attrs)
    rect.role = 'Block'
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.addTo(graph)

    var elementView = rect.findView(paper);
    // elementView.addTools(blockToolView);
    elementView.hideTools()
    return { rect, elementView }

}
