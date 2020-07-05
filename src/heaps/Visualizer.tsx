import React, { useState, useEffect, useCallback} from "react"
import 'react-tree-graph/dist/style.css'
import './visualizer.css'
import Heap from './heap'

const Tree = require('react-tree-graph')

const defaultArrInput = "1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17"

const Visualizer = () => {
    const [arrInput, setArrInput] = useState(defaultArrInput)
    const [heapTree, setHeapTree] = useState(null)
    const [max, setMax] = useState<number | null>(null)
    const [heap, setHeap] = useState<Heap | null>(null)

    const convertInputToArray = useCallback((s: string): number[] => {
        return s.trim()
            .split(",")
            .filter(item => !Number.isNaN(Number(item)))
            .map(item => Number(item))
    }, [])

    const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {value}} = ev;
        setArrInput(value)
    }

    const handleSubmit = useCallback(() => {
        const heapBuilt = new Heap(convertInputToArray(arrInput))
        let head = heapBuilt.convertToTree()   
        setHeap(heapBuilt)
        setHeapTree(head)     
    }, [setHeapTree, convertInputToArray, arrInput, setHeap])

    useEffect(() => {
        const heapBuilt = new Heap(convertInputToArray(defaultArrInput))
        let head = heapBuilt.convertToTree()   
        setHeap(heapBuilt)
        setHeapTree(head)     
    }, [convertInputToArray, setHeapTree, setHeap])

    const handleGetMax = useCallback(() => {
        if(heap){
            const max = heap.extractMax()
            console.log(max)
            setMax(max)
        }

    }, [setMax, heap])

    return (
        <div className="heap-visualizer">
            <div>
                <h1>Max heap</h1>
                <input type="text" className="arr-input" value={arrInput} onChange={handleInputChange} />
                <button onClick={handleSubmit} className="action-btn">Convert to max heap</button>
                <button onClick={handleGetMax} className="action-btn">Extract max</button>
                <p>Max: {max}</p>
            </div>
            <div>
                {heapTree && 
                    <Tree
                        data={heapTree}
                        height={400}
                        width={400}/>
                }
            </div>
        </div>
    )
}

export default Visualizer