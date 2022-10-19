// import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import {Navbar, Canvas, Taglib, Inspect, ContextMenu } from './component'


function App() {

  const [canvasAction, setCanvasAction ] = useState({action: 'test'})
  const [showMenu, setShowMenu ] = useState({ showMenu: false, scope: ''})

  // useEffect(
  //   () => {
  //     document.addEventListener('contextmenu', (e) => {
  //       console.log('document ' + e.pageX)
  //     })
  //   },
  //   []
  // )


  return (
    <div className='frame'>
      <Navbar></Navbar>
      <ContextMenu setCanvasAction={setCanvasAction} showMenu={showMenu} ></ContextMenu>
      <div className="row row-cols-3 subframe" >
        <div className="col-2 bg-info">
          <Taglib></Taglib>
        </div>
        <div className="col-8 bg-warning">
          <Canvas canvasAction={canvasAction} setShowMenu={setShowMenu}></Canvas>
        </div>
        <div className="col-2 bg-info">
          <Inspect></Inspect>
        </div>
      </div>
    </div>
  );
}

export default App;
