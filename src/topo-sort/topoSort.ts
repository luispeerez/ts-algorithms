class Vertex {
    id: number;
    adj: Vertex[];
    parents: number;
    state: "BLANK" | "VISITING" | "VISITED"

    constructor(id:  number){
        this.id = id;
        this.adj = [];
        this.parents = 0;
        this.state = "BLANK";
    }

    setAdjacent = (v: Vertex) => {
        this.adj.push(v)
    }

    increaseParentCount = () => this.parents++;
    decreaseParentCount = () => this.parents--;
}

class QNode{
    val: Vertex;
    next: QNode | null;

    constructor(val: Vertex){
        this.val = val
        this.next = null
    }
}

class Queue {
    head: QNode | null;
    tail: QNode | null
    constructor(){
        this.head = null
        this.tail = null
    }

    enqueue = (val: Vertex): void => {
        let n = new QNode(val)
        
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

    dequeue = (): Vertex => {
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

    peek = (): Vertex => {
        if(this.isEmpty() || !this.head){
            throw new Error ("Empty stack")
        }

        return this.head.val;
    }
}

class TopoSort{
    //vertices: Vertex[] = []
    graph: Map<number, Vertex>;

    constructor(){
        this.graph = new Map();
    }

    buildGraph = (V: number[], E: number[][]) => {
        this.graph = new Map();
        for(let vertex of V){
            this.graph.set(vertex ,new Vertex(vertex))
        }

        for(let edge of E){
            let [parent, child] = edge
            let parentV = this.graph.get(parent);
            let childV = this.graph.get(child);
            
            if(parentV && childV){
                parentV.setAdjacent(childV);
                childV.increaseParentCount();
            }
            
        }
    }

    bfsSort = (V: number[], E: number[][]) => {
        let q = new Queue();
        this.buildGraph(V,E);
        this.getParents(this.graph, q);
        let order = [];

        while(!q.isEmpty()){
            let v = q.dequeue();
            order.push(v.id);

            this.visitNode(v, q);
        }

        if(order.length !== V.length){
            return []
        }

        return order;
    }

    getParents = (graph: Map<number, Vertex>,q: Queue) => {
        for(let k of graph.keys()){
            var v = graph.get(k);
            if(v && v.parents === 0){
                q.enqueue(v)
            }
        }
    }

    visitNode = (v: Vertex, q: Queue) => {
        for(let child of v.adj){
            child.decreaseParentCount()
            if(child.parents === 0){
                q.enqueue(child)
            }
        }
    }

    dfsSort = (V: number[], E: number[][]) => {
        this.buildGraph(V, E);
        let order: number[] = [];

        for(let k of this.graph.keys()){
            let v = this.graph.get(k);
            if(v && v.state === "BLANK"){
                v.state = "VISITING";
                
                for(let child of v.adj){
                    if(child.state !== "VISITED"){
                        if(!this.dfs(child, order)){
                            throw new Error("Cyclic graph");
                        }
                    }
                }
                
                v.state = "VISITED";
                order.push(v.id)
            }
        }

        let finalOrder = [];
        while(order.length){
            finalOrder.push(order.pop());
        }
        return finalOrder;
    }

    dfs = (v: Vertex, order: number[]): boolean => {
        if(v.state === "VISITING"){
            return false;
        }

        if(v.state === "VISITED"){
            return true;
        }

        v.state = "VISITING";
        for(let child of v.adj){
            if(!this.dfs(child, order)){
                return false;
            }
        }

        order.push(v.id)
        v.state = "VISITED";
        return true;
    }
}



export default TopoSort;