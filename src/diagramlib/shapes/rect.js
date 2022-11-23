import {dia, shapes, elementTools } from 'jointjs';

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
            class: 'expanded-container',
            strokeDasharray: "10 5",
            opacity: "100%",
            fillOpacity: 0,
        },
        label: {
            label: "hello",
            fill: "black",
        }
    },
}

export function createContainer(paper, graph) {
    var container = new shapes.standard.Rectangle(containerAttrs)
    container.role = "Container"
    // attach to graph and generate a view of element
    container.addTo(paper.model)
    var elementView = container.findView(paper);
    container.attr("label/text", elementView.id)

    // Tools
    var boundaryTool = new elementTools.Boundary({
        padding: 20,
        rotate: true,
        useModelGeometry: true,
    });

    var removeButton = new elementTools.Remove({
        action: (_, elementView) => elementView.remove()
    });

    var collapseButton = new elementTools.Button({
        focusOpacity: 0.5,
        // top-right corner
        x: '100%',
        y: '0%',
        offset: { x: -5, y: -5 },
        action: function(evt, elementView, _) {
            const model = elementView.model

            // remove opacity of expanded container
            model.removeAttr('body/strokeDasharray')
            model.removeAttr('body/opacity')
            model.removeAttr('body/fillOpacity')

            model.attr('body', {
                class: 'collapsed-container',
                fill: 'black'
            })

            model.toFront({deep: false})
            model.set('z', 1000)
            // model.
            // alert('View id: ' + this.id + '\n' + 'Model id: ' + this.model.id);
        },
        markup: [
            {
                // Copied from SVGViewer
                // I want to change icon
                tagName: 'path',
                selector: 'icon',
                attributes: {
                    'd': 'M7.5 0.234C3.486 0.234 0.234 3.486 0.234 7.5s3.252 7.266 7.266 7.266 7.266 -3.252 7.266 -7.266S11.514 0.234 7.5 0.234zM3.633 8.672c-0.193 0 -0.352 -0.158 -0.352 -0.352v-1.641c0 -0.193 0.158 -0.352 0.352 -0.352h7.734c0.193 0 0.352 0.158 0.352 0.352v1.641c0 0.193 -0.158 0.352 -0.352 0.352H3.633z',
                    'fill': '#0A1EE6',
                }
            },
        ]
    });

    var toolsView = new dia.ToolsView({
        tools: [
            boundaryTool,
            removeButton,
            // connectButton,
            collapseButton,
        ]
    });


    elementView.addTools(toolsView);
    elementView.showTools()

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
