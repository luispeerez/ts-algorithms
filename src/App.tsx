import React from 'react';
import MaxHeapVisualizer from "./heaps/Visualizer"
import BSTVisualizer from "./bst/Visualizer"
import AVLVisualizer from "./avl/Visualizer"
import StackVisualizer from "./stack/Visualizer"
import QueueVisualizer from "./queue/Visualizer"
import HashTable from "./hashtable/hashtable"

import './App.css';

const hTable = new HashTable()
hTable.insert("mati", 8)
hTable.insert("ari", 27)
hTable.insert("luis", 25)

console.log(hTable.remove("luis"))

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
