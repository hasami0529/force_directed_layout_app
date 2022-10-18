// import logo from './logo.svg';
import './App.css';

import React from 'react';
import {Navbar, Canvas, Taglib, Inspect, Contextmenu } from './component'


function App() {
  return (
    <div class='frame'>
      <Navbar></Navbar>
      <div class="row row-cols-3 subframe" >
        <div class="col-2 bg-info">
          <Taglib></Taglib>
        </div>
        <div class="col-8 bg-warning">
          <Canvas></Canvas>
        </div>
        <div class="col-2 bg-info">
          <Inspect></Inspect>
        </div>
      </div>
    </div>
  );
}

// export default ContainerExample;


export default App;
