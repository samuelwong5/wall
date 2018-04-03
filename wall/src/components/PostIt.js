import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './PostIt.css';

class PostIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      dot_flag: false,
      prevX: -1,
      currX: -1,
      prevY: -1,
      currY: -1,
      width: props.width || 400,
      height: props.height || 250,
      color: props.color || '#ffff88',
      id: props.id
    };
  }

  setSize(width, height) {
    var canvas = ReactDOM.findDOMNode(this);
    let data = canvas.toDataURL();
    this.setState({
      width: width,
      height: height
    });
    this.forceUpdate();
    canvas = ReactDOM.findDOMNode(this);
    var img = new Image;
    img.onload = () => this.state.ctx.drawImage(img,0,0);
    img.src = data;
  }

  updateBounds() {
    let canvas = ReactDOM.findDOMNode(this);
    let rect = canvas.getBoundingClientRect();
    this.setState({
      ...this.state,
      top: rect.top,
      left: rect.left,
    });
  }

  onMouseDown(e) {
    if (this.state.prevX === -1) {
      this.setState({
        ...this.state,
        prevX: e.clientX - this.state.left,
        prevY: e.clientY - this.state.top,
        currX: e.clientX - this.state.left,
        currY: e.clientY - this.state.top,
        flag: true,
        dot_flag: true
      });
    } else {
      this.setState({
        ...this.state,
        prevX: this.state.currX,
        prevY: this.state.currY,
        currX: e.clientX - this.state.left,
        currY: e.clientY - this.state.top,
        flag: true,
        dot_flag: true
      });
    }
    // if (this.state.dot_flag) {
    //   this.state.ctx.beginPath();
    //   this.state.ctx.fillRect(this.state.currX, this.state.currY, 2, 2);
    //   this.state.ctx.closePath();
    //   this.setState({
    //     ...this.state,
    //     dot_flag: false
    //   });
    // }
  }

  draw() {
    this.state.ctx.beginPath();
    this.state.ctx.moveTo(this.state.prevX, this.state.prevY);
    this.state.ctx.lineTo(this.state.currX, this.state.currY);
    this.state.ctx.stroke();
    this.state.ctx.closePath();
  }

  onMouseMove(e) {
    if (this.state.flag) {
      this.setState({
        ...this.state,
        prevX: this.state.currX,
        prevY: this.state.currY,
        currX: e.clientX - this.state.left,
        currY: e.clientY - this.state.top,
      });
      this.draw();
    }
  }

  onMouseUp(e) {
    this.setState({
      ...this.state,
      prevX: -1,
      prevY: -1,
      flag: false
    });
  }

  onMouseLeave(e) {
    this.setState({
      ...this.state,
      prevX: -1,
      prevY: -1,
      flag: false
    });
  }

  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this);
    let rect = canvas.getBoundingClientRect();
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2;
    this.setState({
      ...this.state,
      top: rect.top,
      left: rect.left,
      ctx: ctx
    });
  }

  // componentDidUpdate() {
  //   let canvas = ReactDOM.findDOMNode(this);
  //   canvas.height = this.state.height;
  //   canvas.width = this.state.width;
  // }

  render() {
    let style = {
      background: this.state.color
    };
    return (
      <canvas id={this.state.id}
        className="postit"
        width={this.state.width}
        height={this.state.height}
        style={style}
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}>
      </canvas>
    );
  }
}

export default PostIt;
