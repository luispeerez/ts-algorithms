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
    table: Node[]
    insertedValues: number;
    growFactor: number;

    constructor(){
        this.growFactor = 2;
        this.tableSize = 2
        this.insertedValues = 0;
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
        if(this.tableSize === this.insertedValues){
            this.doubleTable();
        }

        if(!this.table[idx]){
            this.table[idx] = newNode
            this.insertedValues++
            return
        }

        let n = this.table[idx]
        while(n !== null && n.next !== null){
            n = n.next
        }
        n.next = newNode
        this.insertedValues++
    }

    get = (key:string | number) => {
        const idx = this.hash(key)
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

    doubleTable = () => {
        this.tableSize = this.tableSize * this.growFactor;
        this.insertedValues = 0;
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

}

export default HashTable