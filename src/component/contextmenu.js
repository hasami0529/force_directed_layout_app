import React from 'react'

export class ContextMenu extends React.Component {

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
  