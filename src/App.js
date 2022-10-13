// import logo from './logo.svg';
import './App.css';

import React from 'react';
import {dia, shapes, } from 'jointjs';



function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Sysmaker</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="#">File</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">View</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Edit</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ">Setting</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

function Taglib(){
  return (
    <div class='lib'>taglib</div>
  )
}

class ContextMenu extends React.Component {

  constructor(props) {
    super(props)

    this.addBlock = props.actions


    this.state ={
      showMenu: false,
      xPos: 0,
      yPos: 0,
    }
  }

  componentDidMount() {
    
    document.addEventListener("click", this.handleClick)
    document.addEventListener("contextmenu", this.handleContextMenu)
  }

  handleContextMenu = (event) => {
    event.preventDefault() // cancel the default context menu
    if (this.props.canvas.current.contains(event.target)) {
      this.setState({
        xPos: `${event.pageX}px`,
        yPos: `${event.pageY}px`,
        showMenu: true,
      });
    } else {
      this.setState({
        showMenu: false,
      })
    }

  }

  handleClick = (event) => {
    event.preventDefault() // cancel the default context menu
    this.setState({
      showMenu: false,
    });
  }

  render() {
    const { showMenu, xPos, yPos } = this.state;
    // console.log(this.state)

    if (showMenu)
      return (
        <div class="btn-group-vertical text-center context-menu" style={{
          top: yPos,
          left: xPos,
        }}>
            <button type= "button" class="btn btn-light" onClick={this.addBlock} >New Block</button>
            <button type= "button" class="btn btn-light">Option2</button>
            <button type= "button" class="btn btn-light">Option3</button>
        </div>
      );
    else return null;
  }
}


class Canvas extends React.Component {

  constructor(props) {
    super(props)

    this.addBlock = this.addBlock.bind(this);
    this.canvas = React.createRef();
  }

  componentDidMount() {

    var namespace = shapes;
                
    var graph = new dia.Graph({}, { cellNamespace: namespace });

    var paper = new dia.Paper({
      el: document.getElementById("canvas"),
      model: graph,
      width: "100%",
      height: "100%",
      gridSize: 1,
      cellViewNamespace: namespace

    });

    this.namespace = namespace
    this.graph = graph
    this.paper = paper

    this.setState({
      graph: "graph"
    })

    this.demo();

  }

  demo() {
    // console.log(this.state)
    var graph = this.graph
    var rect = new shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
        body: {
            fill: 'blue'
        },
        label: {
            text: 'Hello',
            fill: 'white'
        }
    });
    rect.addTo(graph);
  
    var rect2 = rect.clone();
    rect2.translate(300, 0);
    rect2.attr('label/text', 'World!');
    rect2.addTo(graph);
  
    var link = new shapes.standard.Link();
    link.source(rect);
    link.target(rect2);
    link.addTo(graph);
  }

  addBlock(event) {
    event.preventDefault()

    var rect = new shapes.standard.Rectangle();
    rect.position(150, 80);
    rect.resize(100, 40);
    rect.attr({
        body: {
            fill: 'blue'
        },
        label: {
            text: 'New',
            fill: 'white'
        }
    });
    rect.addTo(this.graph);
  }

  render() {
    // console.log(this.state)

    return (

      <div id="canvas" ref={this.canvas} onContextMenu={this.test}>
        <ContextMenu actions={this.addBlock} canvas={this.canvas}></ContextMenu>
      </div>
    )
  }
}



function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div class="lib row row-cols-3" >
        <div class="col-2 lib bg-info" >
          <Taglib></Taglib>
        </div>
        <div class="col-8 lib bg-warning">
          <Canvas></Canvas>
        </div>
        <div class="col-2 lib bg-info">
          2 of 2
        </div>
    </div>
    </React.Fragment>
  );
}

// export default ContainerExample;


export default App;
