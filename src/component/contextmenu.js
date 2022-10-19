import { useEffect } from 'react'

export function ContextMenu({ setCanvasAction, showMenu }) {


    function addBlock() {
      setCanvasAction({action: 'addBlock'})
    }


    if (showMenu.show) {
        return (
            <div class="btn-group-vertical text-center context-menu" style={{
              top: `${showMenu.event.pageY}px`,
              left: `${showMenu.event.pageX}px`,
            }}>
                <button type= "button" class="btn btn-light" onClick={addBlock} >New Block</button>
                <button type= "button" class="btn btn-light">Option2</button>
                <button type= "button" class="btn btn-light">Option3</button>
            </div>
          );
    } else return null;

}
