import React, { Component } from 'react';
import DraggablePostIt from './components/DraggablePostIt';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DraggablePostIt id="test-1" color="#00ff00"/>
        <DraggablePostIt id="test-2"/>
        <DraggablePostIt id="test-3"/>
        <DraggablePostIt id="test-4"/>
        <DraggablePostIt id="test-5"/>
      </div>
    );
  }
}

export default App;
