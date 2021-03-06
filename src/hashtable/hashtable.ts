class Node{
    key: string | number;
    val: any;
    next: Node | null;

    constructor(val: number, key: string | number){
        this.val = val
        this.next = null
        this.key = key
    }
}

class HashTable {
    tableSize: number;
    table: (Node | null)[]
    usedSlots: number;
    growFactor: number;
    shrinkFactor: number;

    constructor(){
        this.growFactor = 2;
        this.shrinkFactor = 4;
        this.tableSize = 2
        this.usedSlots = 0;
        this.table = new Array(this.tableSize)
    }

    hash = (key: string | number): number => {
        if(typeof key === "string"){
            return this.prehash(key) % this.tableSize
        }

        return key % this.tableSize
    }

    prehash = (key: string) => {
        let result = 0;
        for(let i = 0; i < key.length; i++){
            result += key.charCodeAt(i)
        }
        return result
    }

    insert = (key: string | number, value: any): void => {
        const idx = this.hash(key);
        const newNode = new Node(value, key)

        // If table is full, double it
        if(this.tableSize === this.usedSlots){
            this.doubleTable();
        }

        if(!this.table[idx]){
            this.table[idx] = newNode
            this.usedSlots++
            return
        }

        let n = this.table[idx]
        while(n !== null && n.next !== null){
            n = n.next
        }
        if(n !== null){
            n.next = newNode
        }
        
    }

    get = (key:string | number) => {
        const idx = this.hash(key)
        console.log("key", key,this.table)
        if(!this.table[idx]){
            return null;
        }

        let node: Node | null = this.table[idx]
        while(node){
            if(node.key === key){
                return node.val;
            }
            node = node.next
        }
        return null;   
    }

    remove = (key: string | number):void => {
        const idx = this.hash(key)
        let node: Node | null = this.table[idx]
        if(!node){
            return;
        }

        if(node.key === key){
            this.table[idx] = null;
            this.usedSlots--;

            if( this.usedSlots <= this.tableSize / this.shrinkFactor ){
                this.shrinkTable()
            }

            return;
        }

        while(node && node.next !== null){
            if(node.next.key === key){
                node.next = node.next.next
                return;
            }
            node = node.next
        }
        return;   
    }

    shrinkTable = (): void => {
        this.tableSize = this.tableSize / 2;
        this.usedSlots = 0;
        let auxTable = this.table
        this.table = new Array(this.tableSize);

        for(let i = 0 ; i < auxTable.length; i++){
            if(auxTable[i]){
                let node: Node | null = auxTable[i]
                while(node){
                    this.insert(node.key, node.val)
                    node = node.next
                }
            }
        }
    }

    doubleTable = () => {
        this.tableSize = this.tableSize * this.growFactor;
        this.usedSlots = 0;
        let auxTable = this.table
        this.table = new Array(this.tableSize);

        for(let i = 0 ; i < auxTable.length; i++){
            if(auxTable[i]){
                let node: Node | null = auxTable[i]
                while(node){
                    this.insert(node.key, node.val)
                    node = node.next
                }
            }
        }
    }

    toVisualizer = () => {
        let visualTable: (VisualizerNode | null)[] = new Array(this.table.length)
        for(let i = 0 ; i < this.table.length; i++){
            if(this.table[i]){
                let node: Node | null = this.table[i]
                let childrenTail = null
                let childrenHead = null
                
                while(node != null){
                    let newChildren: VisualizerNode = {name: `Key: ${node?.key}, Val: ${node?.val}`, children: []}
                    
                    if(!childrenTail){
                        childrenHead = newChildren
                        childrenTail = childrenHead
                    }else{
                        childrenTail.children.push(newChildren)
                        childrenTail = childrenTail.children[0]
                    }
                    
                    node = node.next
                }
                
                visualTable[i] = childrenHead
            }else{
                visualTable[i] = null
            }
        }
        return visualTable
    }

}

export default HashTable