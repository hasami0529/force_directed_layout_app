
export function customAnchor(direction, endView, endMagnet, anchorReference, args) {
    // console.log(endView.model.getPort(endMagnet.getAttribute('port')))
    const { top, left, right, bottom, height, width } = endMagnet.getBoundingClientRect()
    // console.log(top, right)
    
    // console.log(paper.clientToLocalPoint(right, top))

    switch (direction) {
        case 'left':
            return endView.paper.clientToLocalPoint(left, top+width/2)
        case 'right':
            return endView.paper.clientToLocalPoint(right, top+width/2)
        case 'top':
            return endView.paper.clientToLocalPoint(left+height/2, top)
        case 'bottom':
            return endView.paper.clientToLocalPoint(left+height/2, bottom)
        default:
            break;
    }


}