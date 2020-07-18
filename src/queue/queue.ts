class Node{
    val: number;
    next: Node | null;

    constructor(val: number){
        this.val = val
        this.next = null
    }
}

class Queue {
    head: Node | null;
    tail: Node | null
    constructor(){
        this.head = null
        this.tail = null
    }

    enqueue = (val: number): void => {
        let n = new Node(val)
        
        if(this.head && this.tail){
            this.tail.next = n
            this.tail = this.tail.next
        }
        else{       
            this.head = n
            this.tail = n    
        }
    }
    
    isEmpty = (): boolean => !this.head 

    dequeue = (): number => {
        if(this.isEmpty() || !this.head){
            throw new Error ("Empty queue")
        }

        
        const val = this.head.val;
        this.head = this.head.next
        if(!this.head){
            this.head = null
            this.tail = null
        }
        return val;
        
    }

    peek = (): number => {
        if(this.isEmpty() || !this.head){
            throw new Error ("Empty stack")
        }

        return this.head.val;
    }

    toVisualizer = (): VisualizerNode | null => {
        if(!this.head){
            return null
        }

        const head: VisualizerNode = {name: this.head.val, children: []}
        let nV = head
        let n = this.head
        while(n !== null && n.next !== null){
            const newChildren = {name: n.next.val, children: []}
            nV.children = [newChildren]
            nV = nV.children[0]
            n = n.next
        }

        console.log("stackhead ",head)
        return head
    }

}

export default Queue