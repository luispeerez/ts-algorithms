import React, { useState, useEffect, useCallback} from "react"
import 'react-tree-graph/dist/style.css'
import './visualizer.css'
import Heap from './heap'

const Tree = require('react-tree-graph')

const defaultArrInput = "1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17"

const Visualizer = () => {
    const [arrInput, setArrInput] = useState(defaultArrInput)
    const [heapTree, setHeapTree] = useState(null)

    const convertInputToArray = useCallback((s: string): number[] => {
        return s.trim()
            .split(",")
            .filter(item => !Number.isNaN(Number(item)))
            .map(item => Number(item))
    }, [])

    const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log("change")
        const {target: {value}} = ev;
        setArrInput(value)
    }

    const handleSubmit = useCallback(() => {
        const heap = new Heap(convertInputToArray(arrInput))
        let head = heap.convertToTree()   
        setHeapTree(head)     
    }, [setHeapTree, convertInputToArray, arrInput])

    useEffect(() => {
        const heap = new Heap(convertInputToArray(defaultArrInput))
        let head = heap.convertToTree()   
        setHeapTree(head)     
    }, [convertInputToArray, setHeapTree])

    return (
        <div className="heap-visualizer">
            <div>
                <h1>Max heap</h1>
                <input type="text" className="arr-input" value={arrInput} onChange={handleInputChange} />
                <button onClick={handleSubmit} className="submit-btn">Convert to max heap</button>
            </div>
            {heapTree && 
                <Tree
                    data={heapTree}
                    height={400}
                    width={400}/>
            }
        </div>
    )
}

export default Visualizer