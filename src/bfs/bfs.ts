class BFS{
    V: number;
    parents: number[] | null[];
    adj: number[][];
    constructor(V: number, edges: number[][]){
        this.V = V
        this.parents = new Array(V).fill(null)
        this.adj = new Array(V).fill(null)
        this.adj = this.adj.map(() => [])
        console.log("this.adj", this.adj)
        
        for(let edge of edges){
            let parent = edge[0]
            let child = edge[1]
            this.adj[parent].push(child)
        }
    }

    doBFS(){
        for(var i = 0; i < this.V; i++){
            if(this.parents[i] === null){
                this.parents[i] = -1;
                console.log("visiting from main loop ", i, "parent", null)
                this.bfsNode(i)    
            }
        }
    }

    bfsNode(src: number){
        let frontier = []
        frontier.push(src);
        while(frontier.length){
            let next: number[] = [];
            for(let u of frontier){
                for(var adj of this.adj[u]){
                    if(this.parents[adj] === null){
                        this.parents[adj] = u;
                        console.log("visiting ", adj, "parent", u)
                        next.push(adj)
                    }
                }
            }

            frontier = next;
        }
    }
}

export default BFS