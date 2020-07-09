import React, { useState, useEffect, useCallback} from "react"
import 'react-tree-graph/dist/style.css'
import './visualizer.css'
import Heap from './heap'
import BST from '../bst/bst'

const Tree = require('react-tree-graph')

const defaultArrInput = "1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17"

const bst = new BST([1,2,3,4,5,6,7])

const Visualizer = () => {
    const [arrInput, setArrInput] = useState(defaultArrInput)
    const [heapTree, setHeapTree] = useState(null)
    const [max, setMax] = useState<number | null>(null)
    const [heap, setHeap] = useState<Heap | null>(null)
    const [valueToInsert, setValueToInsert] = useState("")

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
        const myArr = convertInputToArray(arrInput)
        console.log("myArr", myArr)
        const heapBuilt = new Heap(myArr)
        console.log("heapBuilt", heapBuilt)
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

    const handleExtract = useCallback(() => {
        if(heap){
            const max = heap.extractMax()
            let visualHead = heap.convertToTree()
            console.log(max)
            setMax(max)
            setHeapTree(visualHead)
        }

    }, [setMax, heap, setHeapTree])

    const handleValueToInsertChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {value}} = ev;
        setValueToInsert(value)
    }

    const handleInsert = useCallback(() => {
        if(heap){
            heap.insert(Number(valueToInsert))
            let visualHead = heap.convertToTree()
            setHeapTree(visualHead)
        }
    }, [setMax, heap, setHeapTree, valueToInsert])


    return (
        <div className="heap-visualizer">
            <div>
                <h1>Max heap</h1>
                <input type="text" className="arr-input" value={arrInput} onChange={handleInputChange} />
                <button onClick={handleSubmit} className="action-btn">Convert to max heap</button>
                <button onClick={handleExtract} className="action-btn">Extract max</button>
                <p>Max: {max}</p>
                
                <hr/>

                <input type="text" className="arr-input" value={valueToInsert} onChange={handleValueToInsertChange} />
                <button onClick={handleInsert} className="action-btn">Insert</button>
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