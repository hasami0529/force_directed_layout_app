import { GRID, PAPERHIEGHT as h, PAPERWIDTH as w } from './config'
import { shapes } from 'jointjs'

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

export function layout(paper, graph, blocks) {
    // define sections

}

// function getLayout

function localLayout(blocks, section) {
    // alignment
}

export function drawSections(graph, GRID) {
    console.log(GRID)

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