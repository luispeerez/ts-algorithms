import React, { useState, useEffect, useCallback} from "react"
import 'react-tree-graph/dist/style.css'
import '../heaps/visualizer.css'
import AVL from './avl'

const Tree = require('react-tree-graph')

const Visualizer = () => {
    const [avl, setAVL] = useState<AVL | null>(null)
    const [visualizerHead, setVisualizerHead] = useState<VisualizerNode | null>(null)
    const [insertVal, setInsertVal] = useState("")


    useEffect(() => {
        const avlBuilt = new AVL()
        let vHead = avlBuilt.toVisualizerFormat()   
        setAVL(avlBuilt)
        setVisualizerHead(vHead)     
    }, [setAVL, setVisualizerHead])

    const handleInsertValueChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {value}} = ev;
        setInsertVal((value))
    }

    const handleInsert = useCallback(() => {
        avl?.insert(Number(insertVal))
        if(avl){
            let vHead = avl.toVisualizerFormat()   
            setVisualizerHead(vHead)         
        }
    }, [setAVL, insertVal, setVisualizerHead, avl])


    return (
        <div className="heap-visualizer">
            <div>
                <h1>AVL</h1>

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