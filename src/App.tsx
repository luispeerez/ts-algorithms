import React from 'react';
import logo from './logo.svg';
import Heap from './heaps/heap'
import './App.css';

const heap = Heap()
//heap.buildMaxHeap([2,1,4])
heap.buildMaxHeap([1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17])
//heap.buildMaxHeap([7, 12, 3, 25, 5, 6, 9,31, 8, 4])

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
