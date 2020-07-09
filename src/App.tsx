import React from 'react';
import MaxHeapVisualizer from "./heaps/Visualizer"
import BSTVisualizer from "./bst/Visualizer"
import './App.css';

//const heap = new Heap([1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17])

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
