import React from 'react';
import MaxHeapVisualizer from "./heaps/Visualizer"
import BSTVisualizer from "./bst/Visualizer"
import AVLVisualizer from "./avl/Visualizer"
import StackVisualizer from "./stack/Visualizer"
import QueueVisualizer from "./queue/Visualizer"
import HashTableVisualizer from "./hashtable/Visualizer"
import rabinKarp from "./rabinkarp/rabinkarp"
import TopoSort from "./topo-sort/topoSort"
import Dijkstra from "./dijkstra/dijkstra"

import './App.css';

/*
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
*/

const dijkstra = new Dijkstra();
var graph = [ [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ], 
  [ 4, 0, 8, 0, 0, 0, 0, 11, 0 ], 
  [ 0, 8, 0, 7, 0, 4, 0, 0, 2 ], 
  [ 0, 0, 7, 0, 9, 14, 0, 0, 0 ], 
  [ 0, 0, 0, 9, 0, 10, 0, 0, 0 ], 
  [ 0, 0, 4, 14, 10, 0, 2, 0, 0 ], 
  [ 0, 0, 0, 0, 0, 2, 0, 1, 6 ], 
  [ 8, 11, 0, 0, 0, 0, 1, 0, 7 ], 
  [ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] ];

let distances = dijkstra.resolve(graph, 0)
console.log("distances", distances)

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
