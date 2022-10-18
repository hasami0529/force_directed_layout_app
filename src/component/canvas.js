import {dia, shapes, } from 'jointjs';
import React from 'react'

export class Canvas extends React.Component {

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
          {/* <ContextMenu actions={this.addBlock} canvas={this.canvas}></ContextMenu> */}
        </div>
      )
    }
  }
  