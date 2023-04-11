import { GRID, PAPERHIEGHT as h, PAPERHIEGHT, PAPERWIDTH, PAPERWIDTH as w, RECTANGLE_THRESHOLD } from './config'
import { shapes, g } from 'jointjs'
import { Vector } from 'matter-js'
import { Line, Node, Section } from './geometry'

export function localLayout(graph, selectedBlocks, layoutBox) {

    const bbox = layoutBox.getBBox()
    let blocks = selectedBlocks.map((b) => new Node(b))
    const s = new Section(bbox.x , bbox.y, bbox.width, bbox.height)
    let mode, alignmentLine;
    if (s.width - s.height > RECTANGLE_THRESHOLD) { // horizontal mode
        mode = "HZ"
        alignmentLine =  s.horizontalCentralLine
    } else if (s.height - s.width > RECTANGLE_THRESHOLD) { // vertical mode
        mode = "VR"
        alignmentLine =  s.verticalCentralLine
    } else { // square mode
        mode = "SQ"
    }
    
    let nodes = []

    // decide alignment line
    nodes.push(alignmentLine)

    drawAlignmentLine(graph, alignmentLine)
    layoutBox.layoutMap = {
        line: alignmentLine,
        focusNodes: blocks,
        mix: [alignmentLine, ...blocks]
    }

    console.log(s.center)
    // blocks[0].anchor(s.center)

    nodes = [...nodes, ...blocks]

    let i = 1000
    
    setInterval(() => {
        i--
        // console.log(i)
        if (i <= 0) return
        directedForce(nodes, s, {
            i: 1,
            k: 0.002,
            h: 0.01,
            l: 100,
            p: 0,
            c: 0, // ignore the Coulomb's law
            s: 0.05 // over this tranlation volume will be ignored
        })
    }, 5);
}

function drawAlignmentLine(graph, line) {
    if (!(line instanceof Line)) return
    const alignmentLine = shapes.standard.Link.define('alignmentLine', {
        attrs: {
            line: {
                opacity: "20%",
                strokeDasharray: "2 5",
            }}
        });

    const aline = new alignmentLine() // left
    aline.router({
        name: "normal"
    })

    if (line.x === undefined) {
        aline.source({ x: 0, y: line.y})
        aline.target({ x: PAPERWIDTH, y: line.y})
    } else {
        aline.source({ x: line.x, y: 0})
        aline.target({ x: line.x, y: PAPERHIEGHT})
    }

    aline.addTo(graph)
    line.model = aline
}


function directedForce(nodes, _, params) {

    // i - interations
    // k - Coulomb's law constant
    // h - Hooke's law constant
    // l - edge spring length
    // p - padding spring length
    const { i, k, h, l, p, c, s } = params

    function distance(n, m) {
        return Math.sqrt((Math.pow(n.center.x - m.center.x, 2) + Math.pow(n.center.y - m.center.y, 2)))
    }

    function direction(n, m) {
        return Vector.create(m.center.x - n.center.x, m.center.y - n.center.y)
    }

    function attr(n, m, springLength) {
        // attractive force by Hooke's law
        let force = h * (distance(n,m) - springLength)
        let directionVector = direction(n, m)

        return Vector.mult(Vector.normalise(directionVector), force)

    }

    function rep(n, m) {
        // repulsive force applied by Coulomb's law
        let force = k * n.area * m.area / distance(m, n)
        let directionVector = direction(m, n)
        return Vector.mult(Vector.normalise(directionVector), force)
    }
    
    // repeat
    for (let iter=0; iter < i; iter++) {
        for (let n of nodes) {
            let f = Vector.create(0,0)
    
            if (n instanceof Node) {

                for (let m of nodes) {
                    if (n === m) continue
                    if (m instanceof Line) {
                        m = m.getProjectionPoint(n)
                        // console.log('Line force', attr(n, m, p))
                        f = Vector.add(f, attr(n, m, p)) // if m is a line, ignore the replusive force
                    } else {

                        if (n.isNeighbor(m)) {
                            if (n.isAnchor) {
                                m = n.anchorNode
                                f = Vector.add(f, attr(n, m, 0))
                            } else {
                                f = Vector.add(f, attr(n, m, l))
                            }
                        }
                        // const r = Vector.mult(Vector.add(f, rep(n, m)), Math.pow(c, i))
                        // f = Vector.add(f, r)
                    }
                }
                // console.log(n.model.id)
                // console.log('force', f)
                n.translate(f.x, f.y)
            }
        }
        // render
        nodes.forEach(node => {
            if (node instanceof Node) {
                node.move()
            }
        });
    }

}

export function moveLayoutBox(e, newPosition) {
    if (e.layoutMap.line) {
        const aline = e.layoutMap.line
        if (aline.x) {
            console.log('x', aline.x)

            console.log(e.getBBox().center().x)

            aline.setX(e.getBBox().center().x)

            let i = 1000
    
            setInterval(() => {
                i--
                // console.log(i)
                if (i <= 0) return
                directedForce(e.layoutMap.mix, undefined, {
                    i: 1,
                    k: 0.002,
                    h: 0.01,
                    l: 100,
                    p: 0,
                    c: 0, // ignore the Coulomb's law
                    s: 0.05 // over this tranlation volume will be ignored
                })
            }, 5);

        } else {
            console.log('y', aline.y)
            aline.setY(e.getBBox().center().y)
        }
    }
}