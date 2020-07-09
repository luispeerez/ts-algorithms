import React, { useState, useEffect, useCallback} from "react"
import 'react-tree-graph/dist/style.css'
import '../heaps/visualizer.css'
import BST from '../bst/bst'

const Tree = require('react-tree-graph')

const defaultArrInput = "1,2,3,4,5,6,7"

const Visualizer = () => {
    const [arrInput, setArrInput] = useState(defaultArrInput)
    const [heap, setHead] = useState<BST | null>(null)
    const [visualizerHead, setVisualizerHead] = useState<VisualizerNode | null>(null)

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
        const bstBuilt = new BST(convertInputToArray(arrInput))
        let vHead = bstBuilt.toVisualizerFormat()   
        setHead(bstBuilt)
        setVisualizerHead(vHead)     
    }, [setHead, convertInputToArray, arrInput, setVisualizerHead])

    useEffect(() => {
        const bstBuilt = new BST(convertInputToArray(defaultArrInput))
        let vHead = bstBuilt.toVisualizerFormat()   
        setHead(bstBuilt)
        setVisualizerHead(vHead)     
    }, [setHead, convertInputToArray, arrInput, setVisualizerHead])


    return (
        <div className="heap-visualizer">
            <div>
                <h1>BST</h1>
                <input type="text" className="arr-input" value={arrInput} onChange={handleInputChange} />
                <button onClick={handleSubmit} className="action-btn">Convert to BST</button>
            </div>
            <div>
                {visualizerHead && 
                    <Tree
                        data={visualizerHead}
                        height={400}
                        width={400}/>
                }
            </div>
        </div>
    )
}

export default Visualizer