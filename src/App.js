// import logo from './logo.svg';
import './App.css';

import {Navbar, Canvas, Taglib, Inspect, ContextMenu } from './component'
import { Provider } from "react-redux";
import store from "./store";


function App() {

  return (
    <Provider store={store}>
      <div className='frame'>
        <Navbar></Navbar>
        <ContextMenu></ContextMenu>
        <div className="row row-cols-3 main" >
          <div className="col-2 sidecolumn">
            <Taglib></Taglib>
          </div>
          <div className="col-8 sidecolumn">
            <Canvas></Canvas>
          </div>
          <div className="col-2 sidecolumn">
            <Inspect></Inspect>
          </div>
        </div>
      </div>
    </Provider>

  );
}

export default App;
