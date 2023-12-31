import { elementTools, dia } from "jointjs";
import { setRole } from "../../utils"

function collapse(model) {
    const graph = model.graph

    let links = []

    // "getEmbeddedCells" return elements(blocks) only not including links so...
    for (const e of model.getEmbeddedCells({deep: true})) {
        links = [ ...graph.getConnectedLinks(e), ...links ] // may push same link twice
        if (e instanceof dia.Cell) {
            e.attr('./display', 'none')
        }
    }

    for (const l of links) {
        l.attr('./display', 'none')
    }

    // remove opacity of expanded container
    model.removeAttr('body/strokeDasharray')
    model.removeAttr('body/opacity')
    model.removeAttr('body/fillOpacity')

    model.attr('body', {
        class: 'collapsed-container',
        fill: '#7a72e5'
    })
    setRole(model, 'collapsed-container')
}

function expand(model) {
    const graph = model.graph
    let links = []

    for (const e of model.getEmbeddedCells()) {
        links = [ ...graph.getConnectedLinks(e), ...links ] // may push same link twice
        if (e instanceof dia.Cell) {
            e.attr('./display', 'inherit')
        }
    }
    for (const l of links) {
        l.attr('./display', 'inherit')
    }

    model.attr('body', {
        class: 'expanded-container',
        strokeDasharray: "10 5",
        opacity: "100%",
        fillOpacity: 0,
    })
    setRole(model, 'expanded-container')
}

const boundaryTool = new elementTools.Boundary({
    padding: 20,
    rotate: true,
    useModelGeometry: true,
});

const removeButton = new elementTools.Remove({
    action: (_, elementView) => elementView.remove()
});

const collapseButton = new elementTools.Button({
    focusOpacity: 0.5,
    // top-right corner
    x: '100%',
    y: '0%',
    offset: { x: -5, y: -5 },
    action: function(evt, elementView, _) {

        const model = elementView.model
        collapse(model)
        elementView.hideTools()

        // model.toFront({deep: false})
        // model.set('z', 1000)

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
                'cursor': 'cell'
            }
        },
    ]
});

// connection with no ports is not allowed
// const connectButton = new elementTools.Connect({
//     x: '100%',
//     y: '0%',
//     offset: { x: -5, y: -5 },
//     magnet: 'port'
// });

export const blockToolView = new dia.ToolsView({
    tools: [
        boundaryTool,
        removeButton,
    ]
});

// connection is not supported for now
export const expandedContainerToolsView = new dia.ToolsView({
    tools: [
        boundaryTool,
        removeButton,
        collapseButton,
    ]
});

const expandButton = new elementTools.Button({
    focusOpacity: 0.5,
    // top-right corner
    x: '100%',
    y: '0%',
    offset: { x: -5, y: -5 },
    action: function(evt, elementView, buttonView) {
        expand(elementView.model)
        elementView.hideTools()
    },
    markup: [
        {
            // Copied from SVGViewer
            // I want to change icon
            tagName: 'path',
            selector: 'icon',
            attributes: {
                'd': 'M7.5 1.25C4.054 1.25 1.25 4.054 1.25 7.5s2.804 6.25 6.25 6.25 6.25 -2.804 6.25 -6.25S10.946 1.25 7.5 1.25zm3.125 6.875h-2.5v2.5h-1.25v-2.5H4.375v-1.25h2.5V4.375h1.25v2.5h2.5v1.25z',
                'fill': '#0A1EE6',
                'cursor': 'cell'
            }
        },
    ]
});

export const collapsedContainerToolsView = new dia.ToolsView({
    tools: [
        boundaryTool,
        removeButton,
        expandButton,
    ]
});
