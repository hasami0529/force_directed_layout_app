import { useSelector, useDispatch } from 'react-redux'
import { selectContextMenu } from "../store/slice/contextmenu";
import { selectCanvas } from '../store/slice/canvas';
import { canvasActions } from '../store/slice/canvas';
import { taglibActions } from '../store/slice/taglib';

export function ContextMenu() {
  const states = useSelector(selectContextMenu);
  const { graph } = useSelector(selectCanvas)
  const dispatch = useDispatch();

  function addBlock() {
    dispatch(
      canvasActions.addBlock()
    )
    if (graph) {
      console.log(graph.getElements())
      dispatch(
        taglibActions.renderElements({ elements: graph.getElements() })
      )
    }

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
