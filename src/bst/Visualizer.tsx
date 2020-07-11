import React, { useState, useEffect, useCallback} from "react"
import 'react-tree-graph/dist/style.css'
import '../heaps/visualizer.css'
import BST from '../bst/bst'

const Tree = require('react-tree-graph')

const defaultArrInput = "1,2,3,4,5,6,7"

const Visualizer = () => {
    const [arrInput, setArrInput] = useState(defaultArrInput)
    const [bst, setBst] = useState<BST | null>(null)
    const [visualizerHead, setVisualizerHead] = useState<VisualizerNode | null>(null)
    const [insertVal, setInsertVal] = useState("")

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
        setBst(bstBuilt)
        setVisualizerHead(vHead)     
    }, [setBst, convertInputToArray, arrInput, setVisualizerHead])

    useEffect(() => {
        const bstBuilt = new BST(convertInputToArray(defaultArrInput))
        let vHead = bstBuilt.toVisualizerFormat()   
        setBst(bstBuilt)
        setVisualizerHead(vHead)     
    }, [setBst, convertInputToArray, arrInput, setVisualizerHead])

    const handleInsertValueChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {value}} = ev;
        setInsertVal((value))
    }

    const handleInsert = useCallback(() => {
        bst?.insert(Number(insertVal))
        if(bst){
            let vHead = bst.toVisualizerFormat()   
            setVisualizerHead(vHead)         
        }
    }, [setBst, convertInputToArray, insertVal, setVisualizerHead, bst])


    return (
        <div className="heap-visualizer">
            <div>
                <h1>BST</h1>
                <input type="text" className="arr-input" value={arrInput} onChange={handleInputChange} />
                <button onClick={handleSubmit} className="action-btn">Convert to BST</button>

                <hr/>

                <input type="text" className="arr-input" value={insertVal} onChange={handleInsertValueChange} />
                <button onClick={handleInsert} className="action-btn">Insert value</button>

            </div>
            <div>
                {visualizerHead && 
                    <Tree
                        data={visualizerHead}
                        height={400}
                        width={400}
                        svgProps={{
                            transform: 'rotate(90)'
                        }}

                    />
                }
            </div>
        </div>
    )
}

export default Visualizer