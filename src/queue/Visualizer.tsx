import React, { useState, useEffect, useCallback} from "react"
import 'react-tree-graph/dist/style.css'
import '../heaps/visualizer.css'
import Queue from './queue'

const Tree = require('react-tree-graph')

const Visualizer = () => {
    const [visualizerHead, setVisualizerHead] = useState<VisualizerNode | null>(null)
    const [queue, setQueue] = useState<Queue | null>(null)
    const [valueToInsert, setValueToInsert] = useState("")

    useEffect(() => {
        const queue = new Queue()
        setQueue(queue)
    }, [setQueue])


    const handleValueToInsertChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {value}} = ev;
        setValueToInsert(value)
    }

    const handleInsert = useCallback(() => {
        if(queue){
            queue.enqueue(Number(valueToInsert))
            let visualHead = queue.toVisualizer()
            setVisualizerHead(visualHead)
        }
    }, [setVisualizerHead, queue, valueToInsert])


    const handlePop = useCallback(() => {
        if(queue){
            try{
                queue.dequeue()
                let visualHead = queue.toVisualizer()
                setVisualizerHead(visualHead)
            }catch(err){
                console.error(err)
            }
            
        }
    }, [setVisualizerHead, queue, valueToInsert])


    return (
        <div className="queue-visualizer">
            <div>
                <h1>Queue</h1>
                <input type="text" className="arr-input" value={valueToInsert} onChange={handleValueToInsertChange} />
                <button onClick={handleInsert} className="action-btn">Insert</button>
                <button onClick={handlePop} className="action-btn">Dequeue</button>
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