import React from 'react';
import MaxHeapVisualizer from "./heaps/Visualizer"
import BSTVisualizer from "./bst/Visualizer"
import AVLVisualizer from "./avl/Visualizer"
import StackVisualizer from "./stack/Visualizer"
import QueueVisualizer from "./queue/Visualizer"
import HashTableVisualizer from "./hashtable/Visualizer"
import rabinKarp from "./rabinkarp/rabinkarp"
import TopoSort from "./topo-sort/topoSort"

import './App.css';

let topoSort = new TopoSort();
let order = topoSort.bfsSort(
  [0, 1, 2, 3, 4],
  [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 3],
    [3, 4],
  ]
);
console.log("order", order)

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
