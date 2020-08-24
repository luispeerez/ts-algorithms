class Node{
    val: number
    constructor(val: number){
        this.val = val
    }
}

class Dijkstra {
    //vertices: number[];
    //adj: number[][];
    //weights: number[][];
    dist: number[] = [];
    processed: boolean[] = [];
    graph: number[][] = [];
    V: number = 0;

    init(){
        for(let i = 0; i < this.V; i++){
            this.dist[i] = Number.MAX_SAFE_INTEGER;
            this.processed[i] = false;
        }
    }

    // TODO: Implement a priority queue
    minDistance(dist: number[], processed: boolean[]): number{
        let min = Number.MAX_SAFE_INTEGER;
        let minIdx = -1;

        for(let v = 0; v < this.V; v++){
            if(!processed[v] && dist[v] <= min){
                min = dist[v]
                minIdx = v;
            }
        }

        return minIdx;
    }

    weight(u: number, v: number){
        return this.graph[u][v];
    }

    relaxEdge(u: number, v: number){
        // Relax edge if u dist to src is reachable 
        // and if dist[u] + weight(u,v) is less than dist[v]
        if(this.dist[u] !== Number.MAX_SAFE_INTEGER ){
            let candidate = this.dist[u] + this.weight(u,v)
            if(candidate  < this.dist[v] ){
                this.dist[v] = candidate
            }
        }
        //if (!sptSet[v] && graph[u][v] != 0 && dist[u] != Integer.MAX_VALUE && dist[u] + graph[u][v] < dist[v]) 
        //dist[v] = dist[u] + graph[u][v]; 

    }

    resolve(graph: number[][], src: number){
        this.V = graph.length;
        this.dist = new Array(this.V);
        this.processed = new Array(this.V);
        this.graph = graph;

        this.init();

        // Setting source distance to 0
        this.dist[src] = 0;

        // Iterate through all vertices (except src)
        // to get shortest path
        for(let i= 0; i < this.V - 1; i++){
            /*
            *  Pick the minimum distance vertex from the set of vertices 
            *  not yet processed. u is always equal to src in first 
            *  iteration. 
            *  AKA Priority Queue
            */
            let u = this.minDistance(this.dist, this.processed);
        
            // Mark u as processed
            this.processed[u] = true;

            // "Relax" adjacent vertices
            for(let v = 0; v < this.V; v++){
                if(!this.processed[v] && this.graph[u][v]){
                    this.relaxEdge(u, v);
                }
            }
        }


        return this.dist;
    }
}

export default Dijkstra