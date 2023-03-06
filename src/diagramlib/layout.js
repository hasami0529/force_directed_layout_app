import { GRID, PAPERHIEGHT as h, PAPERWIDTH as w } from './config'
import { shapes, g } from 'jointjs'
import { Vector } from 'matter-js'
import { Construction } from '@mui/icons-material'

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
    // define sections

    const nodes = blocks.map((b) => new Node(b))

    // classify blocks by tags

    const sections = getSections(gridOptions)
    localLayout(nodes, sections.CC, gridOptions)

}

function localLayout(nodes, section, _) {

    const [ver, hoz] =  Line.genLines(section)
    const sections = getSections(_)
    const [ver1, hoz1] = Line.genLines(sections.TR)
    nodes.push(hoz, hoz1)

    directedForce(nodes, {
        i: 1,
        k: 0.0001,
        h: 0.05,
        l: 150,
        p: 1,
        c: 0
    })

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

    move() {
        this.model.translate(this.dx, this.dy)
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
            return new Node(this.x, node.y)
        } else {
            return new Node(node.x, this.y)
        }
    }

    static genLines(section) {
        return [new Line({ x: section.origin.x}), new Line({ y: section.origin.y })]
    }
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

    get topRight() {
    }

    get bottomRight() {

    }

    get topLeft() {
        return this.origin
    }

    get bottomLeft() {

    }

    get center() {
        return {
            x: this.origin.x + this.width/2,
            y: this.origin.y + this.height/2
        }
    }
}

function directedForce(nodes, params) {

    // i - interations
    // k - Coulomb's law constant
    // h - Hooke's law constant
    // l - edge spring length
    // p - padding spring length
    const { i, k, h, l, p, c } = params

    function distance(n, m) {
        return Math.sqrt((Math.pow(n.center.x - m.center.x, 2) + Math.pow(n.center.y - m.center.y, 2)))
    }

    function direction(n, m) {
        return Vector.create(m.center.x - n.center.x, m.center.y - n.center.y)
    }

    function attr(n, m, springLength) {
        // attractive force by Hooke's law
        let force = h * (distance(n,m) - springLength)
        console.log("Hooke", force)
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
                console.log("lable", n.model)
                for (let m of nodes) {
                    if (n === m) continue
                    if (m instanceof Line) {
                        console.log("Node", n)
                        console.log("line", m)
                        m = m.getProjectionPoint(n)
                        console.log("pp", m)
                        f = Vector.add(f, attr(n, m, p)) // if m is a line, ignore the replusive force
                    } else {
                        console.log(m)
                        f = Vector.add(f, attr(n, m, l))
                        const r = Vector.mult(Vector.add(f, rep(n, m)), Math.pow(c, i))
                        f = Vector.add(f, r)
                    }
        
    
                    // console.log(attr(n, m))
        
                }
                // console.log(f)
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