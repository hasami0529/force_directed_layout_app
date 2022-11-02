import { topPort, bottomPort, rightPort, leftPort } from "./ports";
import {dia, shapes, highlighters, elementTools } from 'jointjs';

const attrs = {
    body: {
        // fill: '#2BF0FB', // be defined in css
        class: 'block'
    },
    label: {
        text: 'Hello',
        fill: 'black'
    },
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

export default function createBlock(paper, graph) {
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
    rect.position(100, 30);
    rect.resize(100, 40);

    rect.addTo(graph)

    var elementView = rect.findView(paper);
    elementView.addTools(toolsView);
    elementView.hideTools()
}

// export default attrs;