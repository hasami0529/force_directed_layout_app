import { topPort, bottomPort, rightPort, leftPort } from "./ports";
import {dia, shapes, highlighters, elementTools } from 'jointjs';

const attrs = {
    body: {
        fill: '#2BF0FB', // be defined in css
        class: 'block'
    },
    label: {
        text: 'Hello',
        fill: 'black'
    },
    // We don't need ports for now
    // ports: {
    //     groups: {
    //         'left': leftPort,
    //         'right': rightPort,
    //         'top': topPort,
    //         'bottom': bottomPort,
    //     },
    //     items: [
    //         { 
    //             group: 'left',
    //             attrs: { label: { text: 'in1' }}
    //         },
    //         { 
    //             group: 'right',
    //             attrs: { label: { text: 'in2' }}
    //         },
    //         { 
    //             group: 'top',
    //             attrs: { label: { text: 'out' }}
    //         },
    //         { 
    //             group: 'bottom',
    //             attrs: { label: { text: 'out' }}
    //         }
    //     ]
    // }
}


const containerAttrs = {
    attrs: {
        body: {
            strokeDasharray: "10 5",
            opacity: "100%",
            fillOpacity: 0,
        },
    },
}
export function createContainer(paper, graph) {
    var container = new shapes.standard.Rectangle(containerAttrs)
    container.role = "container"
    container.addTo(paper.model)

    // Tools
    var boundaryTool = new elementTools.Boundary({
        padding: 20,
        rotate: true,
        useModelGeometry: true,
    });

    var removeButton = new elementTools.Remove({
        action: (_, elementView) => elementView.remove({ })
    });
    const connectButton = new elementTools.Connect({
        x: '100%',
        y: '0%',
        offset: { x: -5, y: -5 },
        magnet: 'body'
    });

    var toolsView = new dia.ToolsView({
        tools: [
            boundaryTool,
            removeButton,
            connectButton
        ]
    });

    var elementView = container.findView(paper);
    elementView.addTools(toolsView);
    elementView.hideTools()

    return { container, elementView }
}

export function createBlock(paper, graph) {
    var rect = new shapes.standard.Rectangle(attrs);

    // Tools
    var boundaryTool = new elementTools.Boundary({
        padding: 20,
        rotate: true,
        useModelGeometry: true,
    });

    var removeButton = new elementTools.Remove();
    const connectButton = new elementTools.Connect({
        x: '100%',
        y: '0%',
        offset: { x: -5, y: -5 },
        magnet: 'body'
    });

    // only in jointjs 3.6
    // const hoverButton = new elementTools.HoverConnect({
    //     useModelGeometry: true,
    //     trackPath: (view) => view.model.attr(['body', 'd'])
    // });

    var toolsView = new dia.ToolsView({
        tools: [
            boundaryTool,
            removeButton,
            connectButton
        ]
    });


    rect.attr(attrs)
    rect.role = 'Block'
    rect.position(100, 30);
    rect.resize(100, 40);

    rect.addTo(graph)

    var elementView = rect.findView(paper);
    elementView.addTools(toolsView);
    elementView.hideTools()
    return { rect, elementView }
}

// export default attrs;