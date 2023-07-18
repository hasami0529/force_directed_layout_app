import { setLabel } from "./factory"

export class Node {

    constructor(model) {
        this.model = model
        const { x, y, height, width } = model.getBBox()
        this.bbox = {
            x, y, height, width
        }

        this.originalCoor = {
            x, y
        }

        this.anchorNode = undefined

        // transform into a size-wighted graph
        // this.model.size(50, 50)
        // setLabel(this.model, this.area.toString())

        this.x_padding = this.bbox.width/2
        this.y_padding = this.bbox.height/2
        
    }

    get x() {
        return this.bbox.x
    }

    get y() {
        return this.bbox.y
    }

    get center() {
        const cx = this.bbox.x + this.bbox.width/2
        const cy = this.bbox.y + this.bbox.height/2
        return { x: cx, y: cy }

    }

    get expandable() {
        return this.model.expandable
    }

    get area() {
        return this.bbox.height * this.bbox.width
    }

    get padding() {
        return (this.bbox.height + this.bbox.width)/2
    }


    translate(dx, dy) {
        // restore the momentum for move function
        this.dx = dx
        this.dy = dy
    }

    move() {
        this.model.translate(this.dx, this.dy)
        const { x, y } = this.model.getBBox()
        this.bbox.x = x
        this.bbox.y = y
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

    recover() {
        this.model.resize(this.bbox, this.bbox.height, this.bbox.width)
    }

}