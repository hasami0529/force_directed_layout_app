import { GRID, PAPERHIEGHT as h, PAPERWIDTH as w } from './config'
import { shapes, g } from 'jointjs'
import { Vector } from 'matter-js'

export function idealLayout(paper, graph, blocks, GRID) {
    const [mcu, dac, speaker] = blocks
    const sections = getSections(GRID)


    mcu.resize(50,50)
    mcu.scale(5,5, mcu.getBBox().center())
    let d = offset(sections.CC.center, mcu.getBBox().center())
    mcu.translate(d.tx, d.ty)
}

function offset(p1, p2) {
    return {
        tx: p1.x - p2.x,
        ty: p1.y - p2.y,
    }
}

export function layout(blocks, gridOptions) {

    const sections = getSections(gridOptions)
    let activeSections = [ 'TL', 'TT', 'TR', 'LL', 'CC', 'RR', 'BL', 'BB', 'BR' ]
    let blocksMap = {}

    // const nodes = blocks.map((b) => new Node(b))
    blocks.forEach((b) => {
        const n = new Node(b)

        activeSections.forEach((s) => {
            if (sections[s].In(n)) {
                if (blocksMap[s]) {
                    blocksMap[s].push(n)
                } else {
                    blocksMap[s] = [n]
                }
            }
        } )
    })

    Object.keys(blocksMap).forEach((m) => {
        localLayout(blocksMap[m], sections[m])
    })


    // classify blocks by tags


    // localLayout(nodes, sections.CC, gridOptions)

}

function localLayout(nodes, section) {

    if (section instanceof Section) {
        const ver =  section.verticalCentralLine
        nodes.push(ver)
    
        directedForce(nodes, section, {
            i: 10,
            k: 0.0002,
            h: 0.01,
            l: 50,
            p: 0,
            c: 0, // ignore the Coulomb's law
            s: 0.05 // over this tranlation volume will be igmored
        })
    }

  

}

export function drawSections(graph, GRID) {

    const sectionDivider = shapes.standard.Link.define('sectionDivider', {
        attrs: {
            line: {
                opacity: "20%",
                strokeDasharray: "2 5",
            }}
        });
    
    const leftLine = new sectionDivider() // left
    leftLine.router({
        name: "normal"
    })

    const rightLine = leftLine.clone() // right
    const topLine = leftLine.clone() // top
    const bottomLine = leftLine.clone() // bottom

    // console.log(leftLine)

    leftLine.source({ x: GRID.a, y: 0})
    leftLine.target({ x: GRID.a, y: h})

    rightLine.source({ x: w-GRID.b, y: 0})
    rightLine.target({ x: w-GRID.b, y: h})

    topLine.source({ x: 0, y: GRID.c})
    topLine.target({ x: w, y: GRID.c})

    bottomLine.source({ x: 0, y: h-GRID.d})
    bottomLine.target({ x: w, y: h-GRID.d})


    graph.addCells(leftLine, rightLine, topLine, bottomLine)
}

function getSections(gridOptions) {

    //algo that decide grid paramters (a, b, c, d)

    const { a, b, c, d } = gridOptions
    
    let sections = {

        // basic 9 section
        TL: new Section(0, 0, a, c),
        TT: new Section(a, 0, w-a-b, c),
        TR: new Section(w-b, 0, b, c),

        LL: new Section(0, c, a, h-d-c),
        CC: new Section(a, c, w-b-a, h-d-c),
        RR: new Section(w-b, c, b, h-d-c),

        BL: new Section(0, c, a, d),
        BB: new Section(a, 0, w-b-a, d),
        BR: new Section(w-b, 0, b, d),

        // compound sections
        T: new Section(0, 0, w, a), // TL+TT+TR
        B: new Section(0, h-d, w, d), // BL+BB+BR
        L: new Section(0, 0, a, h), // TL+LL+BL
        R: new Section(w-b, 0, b, h), // TR+RR+BR

    }

    return sections

}

class Node {

    constructor(model, y) {
        if (y === undefined) {
            this.model = model
            this.bbox = model.getBBox()
        } else {
            this.bbox = { x: model, y: y } // model parameter is used as x 
        }

    }

    get x() {
        return this.bbox.x
    }

    get y() {
        return this.bbox.y
    }

    get center() {
        if (this.model) {
            return this.bbox.center()
        } else {
            return this.bbox
        }

    }

    get area() {
        return this.bbox.height * this.bbox.width
    }

    translate(dx, dy) {
        // restore the momentum for move function
        this.dx = dx
        this.dy = dy
    }

    move(section) {
        // console.log('trans', this.dx, this.dy)
        // console.log('cood', this.center)
        // console.log('In', section.In({ x: this.center.x + this.dx, y: this.center.y + this.dy }))
        if (section.In({ x: this.center.x + this.dx, y: this.center.y + this.dy })) {
            this.model.translate(this.dx, this.dy)
        }
    }
}

class Line {

    constructor(xy) {
        const { x, y } = xy
        this.x = x
        this.y = y
    }

    getProjectionPoint(node) {
        if (this.x) {
            return new Node(this.x, node.center.y)
        } else {
            return new Node(node.center.x, this.y)
        }
    }

    // static genLines(section) {
    //     return [new Line({ x: section.origin.x}), new Line({ y: section.origin.y })]
    // }
}

class Section {
    constructor(x, y, width, height) {
        this.origin = {
            x: x,
            y: y,
        }
        this.width = width
        this.height = height
    }

    get bottomRight() {
        return { x: this.topLeft.x + this.width, y: this.topLeft.y + this.height}
    }

    get topLeft() {
        return this.origin
    }

    // get bottomLeft() {
    // }

    // get topRight() {
    // }

    get center() {
        return {
            x: this.origin.x + this.width/2,
            y: this.origin.y + this.height/2
        }
    }

    get horizontalCentralLine() {
        return new Line({y: this.center.y})
    }

    get verticalCentralLine() {
        return new Line({x: this.center.x})
    }

    In(node) {
        if (node instanceof Node) {
            const { x, y } = node.center
            if (x >= this.topLeft.x && x <= this.bottomRight.x
                    && y >= this.topLeft.y && y <= this.bottomRight.y) {
                        return true
                    }
        } else {
            const { x, y } = node // { x,y } format
            if (x >= this.topLeft.x && x <= this.bottomRight.x
                && y >= this.topLeft.y && y <= this.bottomRight.y) {
                    return true
                }
        }

        return false
    }
}

function directedForce(nodes, section, params) {

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
                        const length = k * n.area * m.area / distance(m, n)
                        console.log('lenght', length)
                        f = Vector.add(f, attr(n, m, length))
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
                node.move(section)
            }
        });

    }

}