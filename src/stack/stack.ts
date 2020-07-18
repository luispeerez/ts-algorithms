class Node{
    val: number;
    next: Node | null;

    constructor(val: number){
        this.val = val
        this.next = null
    }
}

class Stack {
    top: Node | null;
    constructor(){
        this.top = null
    }

    push = (val: number): void => {
        if(!this.top){
            this.top = new Node(val)
        }else{
            let tmp = this.top
            this.top = new Node(val)
            this.top.next = tmp
        }
    }
    
    isEmpty = (): boolean => !this.top 

    pop = (): number => {
        if(this.isEmpty() || !this.top){
            throw new Error ("Empty stack")
        }

        const val = this.top.val;
        this.top = this.top.next
        return val;
    }

    peek = (): number => {
        if(this.isEmpty() || !this.top){
            throw new Error ("Empty stack")
        }

        return this.top.val;
    }

    toVisualizer = (): VisualizerNode | null => {
        if(!this.top){
            return null
        }

        const head: VisualizerNode = {name: this.top.val, children: []}
        let nV = head
        let n = this.top
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

export default Stack