import { Vector } from 'matter-js'
import { Line, Node, Section } from './geometry'

// adding i to a positive number the layout algo will continue else stop at i = 0
let i = 1000

export function localLayout(graph) {

    console.log('highlight')
    const blocks = graph.getElements().map((b) => new Node(b))
  
    setInterval(() => {
        if (i < 0) i = -1; else i--;
        console.log(i)
        if (i <= 0) return
        directedForce(blocks, {
            i: 1,
            k: 0.002,
            h: 0.01,
            l: 200,
            p: 0,
            c: 0, // ignore the Coulomb's law
            s: 0.05 // over this tranlation volume will be ignored
        })
    }, 5);

    // blocks.map((b) => b.recover())
}

function directedForce(nodes, params) {

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

    function originalDistance(n ,m) {
        return Math.sqrt((Math.pow(n.originalCoor.x - m.originalCoor.x, 2) + Math.pow(n.originalCoor.y - m.originalCoor.y, 2)))
    }

    function attr(n, m, springLength) {
        // attractive force by Hooke's law
        let force = h * (distance(n,m) - originalDistance(n,m))
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
                   
                    if (n.isNeighbor(m)) {
                        if (n.isAnchor) {
                            m = n.anchorNode
                            f = Vector.add(f, attr(n, m, 0))
                        } else {
                            f = Vector.add(f, attr(n, m, l))
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
            i += 10
            aline.setX(e.getBBox().center().x)
        } else {
            aline.setY(e.getBBox().center().y)
        }
    }
}