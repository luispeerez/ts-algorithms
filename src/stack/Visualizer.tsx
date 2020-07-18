import React, { useState, useEffect, useCallback} from "react"
import 'react-tree-graph/dist/style.css'
import '../heaps/visualizer.css'
import Stack from './stack'

const Tree = require('react-tree-graph')

const Visualizer = () => {
    const [visualizerHead, setVisualizerHead] = useState<VisualizerNode | null>(null)
    const [stack, setStack] = useState<Stack | null>(null)
    const [valueToInsert, setValueToInsert] = useState("")

    useEffect(() => {
        const stack = new Stack()
        //let head = heapBuilt.convertToTree()   
        setStack(stack)
    }, [setStack])


    const handleValueToInsertChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {value}} = ev;
        setValueToInsert(value)
    }

    const handleInsert = useCallback(() => {
        if(stack){
            stack.push(Number(valueToInsert))
            let visualHead = stack.toVisualizer()
            setVisualizerHead(visualHead)
        }
    }, [setVisualizerHead, stack, valueToInsert])


    const handlePop = useCallback(() => {
        if(stack){
            try{
                stack.pop()
                let visualHead = stack.toVisualizer()
                setVisualizerHead(visualHead)
            }catch(err){
                console.error(err)
            }
            
        }
    }, [setVisualizerHead, stack, valueToInsert])


    return (
        <div className="stack-visualizer">
            <div>
                <h1>Stack</h1>
                <input type="text" className="arr-input" value={valueToInsert} onChange={handleValueToInsertChange} />
                <button onClick={handleInsert} className="action-btn">Insert</button>
                <button onClick={handlePop} className="action-btn">Pop</button>
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