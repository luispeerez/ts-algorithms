import React from 'react';
import MaxHeapVisualizer from "./heaps/Visualizer"
import BSTVisualizer from "./bst/Visualizer"
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BSTVisualizer />
        <MaxHeapVisualizer />
      </header>
    </div>
  );
}

export default App;
