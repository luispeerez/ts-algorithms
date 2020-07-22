import React, { useState, useEffect, useCallback} from "react"
import 'react-tree-graph/dist/style.css'
import '../heaps/visualizer.css'
import HashTable from './hashtable'

const Tree = require('react-tree-graph')

const Visualizer = () => {
    const [visualTable, setVisualTable] = useState<(VisualizerNode | null)[]>([])
    const [hashTable, setHashTable] = useState<HashTable | null>(null)
    const [values, setValueToInsert] = useState({
        get: "",
        remove: "",
        insert: ""
    })
    const {get: getKey, remove: removeValue, insert: insertValue} = values
    const [getValue, setGetValue] = useState("")

    useEffect(() => {
        const hashTable = new HashTable()
        setHashTable(hashTable)
    }, [setHashTable])


    const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {value, name}} = ev;
        setValueToInsert((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleInsert = useCallback(() => {
        if(hashTable){
            const parts = insertValue.split(",").map(val => val.trim())
            if(parts.length < 2){
                return false;
            }
            const [key, value] = parts
            hashTable.insert(key, value)
            let visualHashTable = hashTable.toVisualizer()
            setVisualTable(visualHashTable)
        }
    }, [setVisualTable, hashTable, insertValue])


    const handleRemove = useCallback(() => {
        if(hashTable){
            try{
                hashTable.remove(removeValue)
                let visualHashTable = hashTable.toVisualizer()
                setVisualTable(visualHashTable)
            }catch(err){
                console.error(err)
            }
            
        }
    }, [setVisualTable, hashTable, removeValue])


    const handleGet = useCallback(() => {
        if(hashTable){
            try{
                const gottenValue = hashTable.get(getKey)
                setGetValue(gottenValue)
            }catch(err){
                console.error(err)
            }
            
        }
    }, [setGetValue, hashTable, getKey])


    console.log("visual table", visualTable)
    return (
        <div className="hashTable-visualizer">
            <div>
                <h1>HashTable</h1>
                <input type="text" name="insert" className="arr-input" value={insertValue} onChange={handleInputChange} />
                <button onClick={handleInsert} className="action-btn">Insert</button>

                <input type="text" name="remove" className="arr-input" value={removeValue} onChange={handleInputChange} />
                <button onClick={handleRemove} className="action-btn">Remove</button>

                <input type="text" name="get" className="arr-input" value={getKey} onChange={handleInputChange} />
                <button onClick={handleGet} className="action-btn">Get</button>
                {getValue && <p>Gotten value: {getValue}</p>}
            </div>
            <div>
                {
                    visualTable && visualTable.length && visualTable.map((slot, idx) => (<li key={idx}>
                        {slot ?    
                            <Tree
                                data={slot}
                                height={200}
                                width={600}
                                /> 
                        : "Empty space"}
                        </li>))
                }
            </div>
        </div>
    )
}

export default Visualizer