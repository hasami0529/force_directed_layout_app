export class Node {

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

export class Line {

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
