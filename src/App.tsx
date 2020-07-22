import React from 'react';
import MaxHeapVisualizer from "./heaps/Visualizer"
import BSTVisualizer from "./bst/Visualizer"
import AVLVisualizer from "./avl/Visualizer"
import StackVisualizer from "./stack/Visualizer"
import QueueVisualizer from "./queue/Visualizer"
import HashTableVisualizer from "./hashtable/Visualizer"

import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashTableVisualizer />
        <QueueVisualizer />
        <StackVisualizer />
        <AVLVisualizer />
        <BSTVisualizer />
        <MaxHeapVisualizer />
      </header>
    </div>
  );
}

export default App;
