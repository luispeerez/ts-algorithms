import React from 'react';
//import Heap from './heaps/heap'
import Visualizer from "./heaps/Visualizer"
import './App.css';

//const heap = new Heap([1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17])

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Visualizer />
      </header>
    </div>
  );
}

export default App;
