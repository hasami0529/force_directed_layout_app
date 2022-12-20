import { linkTools, dia } from 'jointjs'

var RectangleSourceArrowhead = linkTools.SourceArrowhead.extend({
    tagName: 'rect',
    attributes: {
        'x': -15,
        'y': -15,
        'width': 30,
        'height': 30,
        'fill': 'black',
        'fill-opacity': 0.3,
        'stroke': 'black',
        'stroke-width': 2,
        'cursor': 'move',
        'class': 'target-arrowhead'
    }
});

var CircleTargetArrowhead = linkTools.TargetArrowhead.extend({
    tagName: 'circle',
    attributes: {
        'r': 20,
        'fill': 'black',
        'fill-opacity': 0.3,
        'stroke': 'black',
        'stroke-width': 2,
        'cursor': 'move',
        'class': 'target-arrowhead'
    }
});

const normalLinkTools = [
    new linkTools.Boundary({
        focusOpacity: 0.5,
        padding: 5,
        useModelGeometry: false
    }),
    new linkTools.Vertices({ stopPropagation: false }),
    // new linkTools.Segments({ stopPropagation: false }),
    new linkTools.Remove({ distance: '50%' }),
    // new linkTools.SourceArrowhead(),
    // new linkTools.TargetArrowhead(),
]

export const normalLinkToolsView = new dia.ToolsView(
    {
        name: 'basic-tools',
        tools: normalLinkTools
    }
)