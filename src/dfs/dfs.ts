class DFS {
  vertices: number[];
  adj: number[][];
  parents: number[] | null[];

  constructor(vertices: number[], edges: number[][]) {
    this.vertices = vertices;
    this.adj = new Array(vertices.length);
    this.parents = new Array(vertices.length).fill(null);

    for (let edge of edges) {
      let parent = edge[0];
      let child = edge[1];

      if (!this.adj[parent]) {
        this.adj[parent] = [];
      }

      this.adj[parent].push(child);
    }
  }

  doDFS = () => {
    for (let v of this.vertices) {
      if (this.parents[v] === null) {
        this.parents[v] = -1;
        console.log("visiting from root", v, "parent", this.parents[v]);
        this.dfsVisit(v);
      }
    }
  };

  dfsVisit = (v: number) => {
    if (!this.adj[v]) {
      return;
    }

    let vAdj = this.adj[v];
    for (let a of vAdj) {
      if (this.parents[a] === null) {
        this.parents[a] = v;
        console.log("visiting", a, "parent", this.parents[a]);
        this.dfsVisit(a);
      }
    }
  };
}

export default DFS;
