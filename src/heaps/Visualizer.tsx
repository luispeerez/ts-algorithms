import React from "react"
//import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import './visualizer.css'
import Heap from './heap'

const Tree = require('react-tree-graph')


const heap = new Heap([1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17])

let head = heap.convertToTree()

console.log(head)

const Visualizer = () => {
    return (<Tree
    data={head}
    height={400}
    width={400}/>)
}

export default Visualizer