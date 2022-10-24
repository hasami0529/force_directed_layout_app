import { useSelector, useDispatch } from 'react-redux'
import { selectContextMenu } from "../store/slice/contextmenu";
import { canvasActions } from '../store/slice/canvas';

export function ContextMenu({ setCanvasAction, showMenu }) {
  const states = useSelector(selectContextMenu);
  const dispatch = useDispatch();

  function addBlock() {
    dispatch(
      canvasActions.addBlock()
    )
  }

  if (states.show) {
      return (
          <div class="btn-group-vertical text-center context-menu" style={{
            top: `${states.event.pageY}px`,
            left: `${states.event.pageX}px`,
          }}>
              <button type= "button" class="btn btn-light" onClick={addBlock} >New Block</button>
              <button type= "button" class="btn btn-light">Option2</button>
              <button type= "button" class="btn btn-light">Option3</button>
          </div>
        );
  } else return null;

}
