class Heap{
    arr: number[];
    //traverseHeap: function;

    constructor(arr: number[]){
        this.arr = arr;
        this.buildMaxHeap()
    }

    getLeftIndex = (i: number) => (2*i) + 1

    getLeft = (a: number[], i: number): number => {
        return a[this.getLeftIndex(i)] || -1;
    }

    getRightIndex = (i: number) => (2*i) + 2

    getRight = (a: number[], i: number): number => {
        return a[this.getRightIndex(i)] || -1;
    }

    getParent = (a: number[], i: number): number => {
        return a[Math.floor((i-1)/2)]
    }

    extractMax = () => this.arr && this.arr.length ? this.arr[0] : null
    

    buildMaxHeap = () => {
        let items = this.arr;
        let n = items.length;
        for(let i = Math.floor( (n/2) -1 ); i >= 0; i--){
            this.maxHeapify(items, i)
        }
    }

    convertToTree = () => {
        let i = 0;
        let head = this.traverseHelper( i, this.arr)
        return head
    }

    traverseHelper = (i: number, a: number[]): any => {
        if(!a[i]){
            return
        }

        let node: any = {
            name: a[i],
            gProps: {
                className: i === 0 ? "parent-node" : ""
            }
        }
        let leftChild = this.traverseHelper(this.getLeftIndex(i), a)
        let rightChild = this.traverseHelper(this.getRightIndex(i), a)
        node.children = []
        if(leftChild){
            node.children.push(leftChild)
        }
        if(rightChild){
            node.children.push(rightChild)
        }
        //tree = node
        return node;
    }

    maxHeapify = (a: number[], i: number): void => {
        let n = a.length;
        let left = this.getLeft(a, i)
        let right = this.getRight(a, i)
        
        // If current item is less than its childrens
        if(a[i] < left || a[i] < right){
            
            // Starting with current as biggest default
            // This should change to left or right
            let biggestIdx = -1
            let biggestValue = a[i];

            console.log("comparing", a[i], left, right)

            if(left > a[i] && this.getLeftIndex(i) < n && left > right ){
                biggestIdx = this.getLeftIndex(i)
                biggestValue = left;
            }
            
            if(right > a[i] && this.getRightIndex(i) < n && right > left ){
                biggestIdx = this.getRightIndex(i)
                biggestValue = right;                    
            }

            console.log("biggest: ", biggestValue)

            // Parent was the biggest, no need to continue traversing
            if(biggestIdx === - 1){
                return;
            }

            // Swap biggest child with parent
            a[biggestIdx] = a[i]
            a[i] = biggestValue
                        

            // Recurse call to maxheapify childs of biggest child if affected
            this.maxHeapify(a, biggestIdx)
        }
    
    }

}

export default Heap;