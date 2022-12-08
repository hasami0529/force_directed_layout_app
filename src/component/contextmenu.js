
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectContextMenu } from "../store/slice/contextmenu";
import { selectCanvas } from '../store/slice/canvas';
import { canvasActions } from '../store/slice/canvas';
import { taglibActions } from '../store/slice/taglib';

function PaperMenu(props) {
  const dispatch = useDispatch();
  const { graph } = useSelector(selectCanvas)

  function addBlock() {
    dispatch(
      canvasActions.addBlock()
    )
    if (graph) {
      // console.log(graph.getElements())
      dispatch(
        taglibActions.renderElements({ elements: graph.getElements() })
      )
    }
  }

  return (
    <React.Fragment>
      <button type= "button" class="btn btn-light" onClick={addBlock} >New Block</button>
      <button type= "button" class="btn btn-light">Option2</button>
      <button type= "button" class="btn btn-light">Option3</button>
    </React.Fragment>
  )
}

function BlockMenu(props) {
  const dispatch = useDispatch();
  const states = useSelector(selectContextMenu);

  function addPort(direction) {
    dispatch(
      canvasActions.addPort({ target: states.target, direction })
    )
  }

  

  return (
    <React.Fragment>
      <button type= "button" class="btn btn-light" onClick={ () => addPort('left')}>Add Port on Left</button>
      <button type= "button" class="btn btn-light" onClick={ () => addPort('right')}>Add Port on Right</button>
      <button type= "button" class="btn btn-light" onClick={ () => addPort('top')}>Add Port on Top</button>
      <button type= "button" class="btn btn-light" onClick={ () => addPort('bottom')}>Add Port on Bottom</button>
    </React.Fragment>
  )
}

function Menu(props) {
  const states = useSelector(selectContextMenu);
  switch (states.menu) {
    case 'paper':
      return <PaperMenu></PaperMenu>
    case 'block':
      return <BlockMenu></BlockMenu>
    default:
      return <PaperMenu></PaperMenu>
  }

}

export function ContextMenu() {
  const states = useSelector(selectContextMenu);

  if (states.show) {
      return (
          <div class="btn-group-vertical text-center context-menu" style={{
            top: `${states.event.pageY}px`,
            left: `${states.event.pageX}px`,
          }}>
            <Menu></Menu>
          </div>
        );
  } else return null;

}
