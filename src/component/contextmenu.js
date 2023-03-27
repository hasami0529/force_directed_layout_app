
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { contextMenuActions, selectContextMenu } from "../store/slice/contextmenu";
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
  }

  return (
    <React.Fragment>
      <button type= "button" class="btn btn-light" onClick={addBlock} >New Block</button>
      <button type= "button" class="btn btn-light">Option2</button>
      <button type= "button" class="btn btn-light">Option3</button>
    </React.Fragment>
  )
}

function ExpandedContextMenu() {
  const states = useSelector(selectContextMenu);
  const dispatch = useDispatch();

  function addPort(direction) {
    dispatch(
      canvasActions.addPort({ target: states.target, direction })
    )
  }
  function addSlot(direction) {
    dispatch(
      canvasActions.addSlot({ target: states.target, direction })
    )
  }

  function disable() {
    dispatch(
      contextMenuActions.setExpandedCoord( {
        display: false,
      })
    )
  }

  if (states.expandedCoord.display && states.menu === 'block') {
    return(
      // {{console.log(props)}}
      <div class="btn-group-vertical text-center context-menu" style={{
        top: `${states.expandedCoord.y}px`,
        left: `${states.expandedCoord.x}px`,
      }} onMouseLeave={ disable }>
        <button type= "button" class="btn btn-light" onClick={ () => addPort('left')}>Left</button>
        <button type= "button" class="btn btn-light" onClick={ () => addPort('right')}>Right</button>
        <button type= "button" class="btn btn-light" onClick={ () => addPort('top')}>Top</button>
        <button type= "button" class="btn btn-light" onClick={ () => addPort('bottom')}>Bottom</button>
      </div>
    )
  }

  if (states.expandedCoord.display && states.menu === 'bus') {
    return(
      // {{console.log(props)}}
      <div class="btn-group-vertical text-center context-menu" style={{
        top: `${states.expandedCoord.y}px`,
        left: `${states.expandedCoord.x}px`,
      }} onMouseLeave={ disable }>
        <button type= "button" class="btn btn-light" onClick={ () => addSlot('left')}>Left</button>
        <button type= "button" class="btn btn-light" onClick={ () => addSlot('right')}>Right</button>
        {/* <button type= "button" class="btn btn-light" onClick={ () => addPort('top')}>Top</button>
        <button type= "button" class="btn btn-light" onClick={ () => addPort('bottom')}>Bottom</button> */}
      </div>
    )
  }

}

function BusMenu() {
  const dispatch = useDispatch();

  function expand(e) {
    const { top, right } = e.target.getBoundingClientRect()

    dispatch(
      contextMenuActions.setExpandedCoord( {
        display: true,
        x: right,
        y: top,
      })
    )
  }

  return (
    <React.Fragment>
      <button type= "button" class="btn btn-light" onMouseEnter={ expand } >Add Slot on >></button>
    </React.Fragment>
  )
}

function BlockMenu() {
  const dispatch = useDispatch();

  function expand(e) {
    const { top, right } = e.target.getBoundingClientRect()

    dispatch(
      contextMenuActions.setExpandedCoord( {
        display: true,
        x: right,
        y: top,
      })
    )
  }

  return (
    <React.Fragment>
      <button type= "button" class="btn btn-light" onMouseEnter={ expand } >Add Port on >></button>
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
    case 'bus':
        return <BusMenu></BusMenu>
    default:
      return <PaperMenu></PaperMenu>
  }

}

export function ContextMenu() {
  const states = useSelector(selectContextMenu);

  if (states.show) {
      return (
        <React.Fragment>
          <div class="btn-group-vertical text-center context-menu" style={{
            top: `${states.event.pageY}px`,
            left: `${states.event.pageX}px`,
          }}>
            <Menu>
            </Menu>
          </div>
          <ExpandedContextMenu></ExpandedContextMenu>
        </React.Fragment>
        );
  } else return null;

}
