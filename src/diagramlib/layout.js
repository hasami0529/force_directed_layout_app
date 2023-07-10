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

    function rotate(n, neighbors) {
        // find the largest angle
        let vec_ang = []

        for (let i=0; i < neighbors.length; i++) {
            const vector = Vector.create(n.center.x - neighbors[i].center.x , n.center.y - neighbors[i].center.y)
            let angle;
            if (i === 0) {
                angle = 0
            } else {
                angle = Vector.angle(vec_ang[0].vector, vector)
                if(angle < 0) angle = 2*Math.PI + angle
            }

            vec_ang[i] = {
                node: neighbors[i],
                vector,
                angle
            }
        }

        vec_ang.sort((a, b) => a.angle - b.angle)
        console.log("vec_ang", vec_ang)

        let max_dff_angel = 0;
        let the_two_forming_nodes= [];
        for (let i=0; i < vec_ang.length; i++) {
            const j = (i+1) % vec_ang.length


            function diff_angle(angle1, angle2) {
                if (j > i) return angle1 - angle2
                else return 2*Math.PI + (angle1 - angle2)
            }
            console.log(diff_angle(vec_ang[j].angle, vec_ang[i].angle))

            if (diff_angle(vec_ang[j].angle, vec_ang[i].angle) > max_dff_angel) {

                max_dff_angel = diff_angle(vec_ang[j].angle, vec_ang[i].angle)
                the_two_forming_nodes = [vec_ang[i].vector, vec_ang[j].vector]
            }
        }

        const s = 1 // constant for the bending force
        const m = 2*Math.PI - (Math.PI/1.5) //  minimum angle

        // rotate
        console.log("the_two_forming_nodes", the_two_forming_nodes)
        console.log(max_dff_angel, m)
        let f1, f2;
        if (max_dff_angel < m) {
            f1 = Vector.perp(the_two_forming_nodes[0])
            f1 = Vector.mult(Vector.normalise(f1), s)
            // console.log(f1)

            // f2 = Vector.perp(the_two_forming_nodes[0], true)
            // f2 = Vector.mult(Vector.normalise(f2), s)
            return f1
        }


        console.log('hi')

        return Vector.create(0, 0)
    }
    
    // repeat
    for (let iter=0; iter < i; iter++) {
        for (let n of nodes) {
            let f = Vector.create(0,0)
    
            if (n instanceof Node) {
                let neighbors = []

                for (let m of nodes) {
                    if (n === m) continue
                   
                    if (n.isNeighbor(m)) {
                        neighbors.push(m)
                        
                        if (n.isAnchor) {
                            m = n.anchorNode
                            f = Vector.add(f, attr(n, m, 0))
                        } 
                        else {
                            f = Vector.add(f, attr(n, m, l))
                        }
                        // const r = Vector.mult(Vector.add(f, rep(n, m)), Math.pow(c, i))
                        // f = Vector.add(f, r)
                    }
                    }

                    if(n.expandable) {
                        f= Vector.add(f, rotate(n, neighbors))
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