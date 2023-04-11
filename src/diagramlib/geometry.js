import { PAPERHIEGHT, PAPERWIDTH } from "./config"

export class Node {

    constructor(model, y) {
        if (y === undefined) {
            this.model = model
            this.bbox = model.getBBox()
        } else {
            this.bbox = { x: model, y: y } // model parameter is used as x 
        }
        this.anchorNode = undefined
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
        this.bbox = this.model.getBBox()
    }

    anchor(node) {
        if (node instanceof Node) {
            this.anchorNode = node
        } else {
            const { x, y } = node
            this.anchorNode =  new Node(x, y)
        }
    }

    get isAnchor() {
        return !(this.anchorNode === undefined)
    }

    get neighbors() {
        if (this.model) {
            return this.model.graph.getNeighbors(this.model).map(b => new Node(b))
        } else return []
    }

    get id() {
        return this.model.id
    }

    isNeighbor(n) {
        if (n instanceof Node) {
            for (const b of this.model.graph.getNeighbors(this.model)) {
                if (n.id === b.id) return true
            }
            return false
        }
    }

}

export class Line {

    constructor(xy) {
        const { x, y } = xy
        this.x = x
        this.y = y
        this.model = null
    }

    setX(x){
        if(this.model) {
            this.model.source({ x: x, y: 0})
            this.model.target({ x: x, y: PAPERHIEGHT})
            this.x = x
        }

    }

    setY(y) {
        if (this.model) {
            this.model.source({ x: 0, y: y})
            this.model.target({ x: PAPERWIDTH, y: y})
            this.y = y
        }

    }

    translate(dxy) {
        if (this.model) {
            if (dxy.dx) {
                this.model.source({ x: this.x + dxy.dx, y: 0})
                this.model.target({ x: this.x + dxy.dx, y: PAPERHIEGHT})
                this.x = this.x + dxy.dx
            }
        }


    }

    getProjectionPoint(node) {
        if (this.x) {
            return new Node(this.x, node.center.y)
        } else {
            return new Node(node.center.x, this.y)
        }
    }

}

export class Section {
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

class Spring {
    constructor(k, length) {
        this.k = k
        this.length = length
    }
}
