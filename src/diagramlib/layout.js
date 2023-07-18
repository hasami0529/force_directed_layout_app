import { Vector } from 'matter-js'
import {  Node } from './geometry'

// adding i to a positive number the layout algo will continue else stop at i = 0
let i = 1300

export function localLayout(graph) {

    const blocks = graph.getElements().map((b) => new Node(b))
  
    setInterval(() => {
        if (i < 0) i = -1; else i--;
        console.log(i)
        if (i <= 0) return
        directedForce(blocks, {
            i: 1,
            k: 0.5,
            h: 0.05,
            s: 0.05, // over this tranlation volume will be ignored
            r: 200, // radial force
            p: 30, // global padding
        })
    }, 5);

    // blocks.map((b) => b.recover())
}

// export function localLayout(graph) {

//     const blocks = graph.getElements().map((b) => new Node(b))
  

//         directedForce(blocks, {
//             i: 10,
//             k: 0.000002,
//             h: 0.01,
//             l: 200,
//             c: 0, // ignore the Coulomb's law
//             s: 0.05, // over this tranlation volume will be ignored
//             r: 1, // radial force
//         })
// }

function directedForce(nodes, params) {

    // i - interations
    // k - Coulomb's law constant
    // h - Hooke's law constant
    // l - edge spring length
    const { i, k, h, r, s, p } = params

    function distance(n, m) {
        return Math.sqrt((Math.pow(n.center.x - m.center.x, 2) + Math.pow(n.center.y - m.center.y, 2)))
    }

    function direction(n, m) {
        return Vector.create(m.center.x - n.center.x, m.center.y - n.center.y)
    }

    function originalDistance(n ,m) {
        return Math.sqrt((Math.pow(n.originalCoor.x - m.originalCoor.x, 2) + Math.pow(n.originalCoor.y - m.originalCoor.y, 2)))
    }

    function coorDistance(n,m) {
        return Math.sqrt((Math.pow(n.x - m.x, 2) + Math.pow(n.y - m.y, 2)))
    }

    function attr(n, m) {
        // attractive force by Hooke's law
        let force = h * (coorDistance(n,m) - originalDistance(n,m))
        let directionVector = direction(n, m)

        return Vector.mult(Vector.normalise(directionVector), force)

    }

    function rep(n, m) {
        // repulsive force applied by Coulomb's law
        // let force = k * n.weight * m.weight / distance(m, n)

        let rep_x = 0
        let rep_y = 0
        let force
        // x-axis
        rep_x = (coorDistance(n,m) - (n.x_padding + m.x_padding+p))
        rep_y = (coorDistance(n,m) - (n.y_padding + m.y_padding+p))

        console.log(rep_x, rep_y)

        if (rep_x < 0 && rep_y < 0) {
            force = h *Math.sqrt(Math.pow(rep_x, 2)+Math.pow(rep_y, 2))
            let directionVector = direction(m, n)
            return Vector.mult(Vector.normalise(directionVector), force)
        }
        
        return Vector.create(0, 0)

    }

    function bendingForce(n, neighbors) {
        // find the largest angle
        let vec_ang = []

        for (let i=0; i < neighbors.length; i++) {
            const vector = Vector.create( neighbors[i].center.x - n.center.x, neighbors[i].center.y - n.center.y )
            let angle;
            if (i === 0) {
                angle = 0
            } else {
                // console.log(Vector.angle(Vector.create(-130,0), Vector.create(130,0)))

                var dotProduct = vec_ang[0].vector.x * vector.x + vec_ang[0].vector.y * vector.y;

                // Calculate the magnitudes of the vectors
                var magnitude1 = Math.sqrt(vec_ang[0].vector.x * vec_ang[0].vector.x + vec_ang[0].vector.y * vec_ang[0].vector.y);
                var magnitude2 = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

                // Calculate the cosine of the angle
                var cosine = dotProduct / (magnitude1 * magnitude2);
                angle = Math.acos(cosine);
                // angle = Vector.angle(vec_ang[0].vector, vector)
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

        const s = 0.5 // constant for the bending force
        const m = 2*Math.PI - (Math.PI/3) //  minimum angle

        // rotate
        console.log("the_two_forming_nodes", the_two_forming_nodes)
        console.log(max_dff_angel, m)
        let f1, f2;
        if (max_dff_angel < m) {
            f1 = Vector.perp(the_two_forming_nodes[0])
            f1 = Vector.mult(Vector.normalise(f1), s)
            // console.log(f1)

            f2 = Vector.perp(the_two_forming_nodes[1], true)
            f2 = Vector.mult(Vector.normalise(f2), s)
            return Vector.add(f1, f2)
        }


        return Vector.create(0, 0)
    }

    function RadialForce(expandable) {
        // compute the midpoint of all the nodes
        let m = {x: 0, y: 0}
        for (let n of nodes) {
            if (n instanceof Node) {
                m.x += n.center.x
                m.y += n.center.y
            }
        }

        m.x /= nodes.length
        m.y /= nodes.length

        console.log(m)

        //direction
        if  (!(expandable instanceof Node)) return

        let f = Vector.create(expandable.center.x - m.x, expandable.center.y - m.y)
        f = Vector.mult(Vector.normalise(f), r * (1/Vector.magnitude(f)))
        return f
    }
    
    // repeat
    for (let iter=0; iter < i; iter++) {
        for (let n of nodes) {
            let f = Vector.create(0,0)
    
            if (n instanceof Node) {
                let neighbors = []

                for (let m of nodes) {
                    if (n === m) continue
                    // attr
                    if (n.isNeighbor(m)) {
                        neighbors.push(m)
                        f = Vector.add(f, attr(n, m))
                    }
                    // rep
                    f = Vector.add(f, rep(n, m))
                    }
                    if(n.expandable) {
                        f= Vector.add(f, bendingForce(n, neighbors))
                        f= Vector.add(f, RadialForce(n))

                        // weight update
                        n.x_padding *= 1.001
                        n.y_padding *= 1.001
                    }
                
                // console.log(n.model.id)
                console.log('force', f)
                f = Vector.mult(f , (1/(n.area/1000)))
                // if (Vector.magnitude(f) >= s) n.translate(f.x, f.y)
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