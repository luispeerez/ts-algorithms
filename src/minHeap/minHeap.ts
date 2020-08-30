class Node{
    val: number;
    id: number;

    constructor(val: number, id: number){
        this.val = val;
        this.id = id;
    }
}

class MinHeap{
    arr: number[];
    n: number;
    //traverseHeap: function;

    constructor(arr: number[]){
        this.arr = arr;
        this.n = arr.length;
        this.buildMaxHeap()
    }

    getLeftIndex = (i: number) => (2*i) + 1

    getLeft = (a: number[], i: number): number => {
        return a[this.getLeftIndex(i)];
    }

    getRightIndex = (i: number) => (2*i) + 2

    getRight = (a: number[], i: number): number => {
        return a[this.getRightIndex(i)];
    }

    getParentIndex = (i: number) => Math.floor((i-1)/2)

    getParent = (a: number[], i: number): number => {
        return a[this.getParentIndex(i)]
    }

    //extractMax = () => this.arr && this.arr.length ? this.arr[0] : null
    

    buildMaxHeap = () => {
        let items = this.arr;
        let n = items.length;
        for(let i = Math.floor( (n/2) -1 ); i >= 0; i--){
            this.maxHeapify(items, i)
        }
    }


    insert = (value: number) :void => {
        this.n++;
        this.arr[this.n-1] = value
        this.insertHelper(this.n - 1)
    }

    // Function to correct heap invariant
    // for insertion operation
    insertHelper = (i: number) => {
        let parentIdx = this.getParentIndex(i)
        let childIdx = i
        
        // Swapping child with parent, if child is greater
        while(this.arr[childIdx] > this.arr[parentIdx] ){
            const tmp = this.arr[childIdx]
            this.arr[childIdx] = this.arr[parentIdx]
            this.arr[parentIdx] = tmp;

            // Swapping indexes too, for while loop condition
            childIdx = parentIdx;
            parentIdx = this.getParentIndex(childIdx)
        }   
    }

    extractMax = (): number | null => {
        if(this.n > 0){
            // Swap first with last
            let top = this.arr[0]
            this.arr[0] = this.arr[this.n-1];
            this.arr[this.n-1] = top
            
            // Decreasing arr size
            this.n--;

            // Run maxHeapify from root to fix possible
            // issues with heap invariant
            this.maxHeapify(this.arr, 0)
            return top;
        }

        return null;
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

        const leftIdx = this.getLeftIndex(i);
        const rightIdx = this.getRightIndex(i);

        // Only grabbing values if those are
        // not exceeding bounds of n
        let leftChild = leftIdx < this.n ? this.traverseHelper(leftIdx, a) : null
        let rightChild = rightIdx < this.n ? this.traverseHelper(rightIdx, a): null
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
        let largestIdx = i;
        let leftIdx = this.getLeftIndex(i)
        let rightIdx = this.getRightIndex(i);

        // Checking if left idx is in bounds and if its greater
        // than parent
        if(leftIdx < this.n && a[leftIdx] > a[largestIdx]){
            largestIdx = leftIdx
        }

        // Checking if right idx is in bounds and if its greater
        // than parent
        if(rightIdx < this.n && a[rightIdx] > a[largestIdx]){
            largestIdx = rightIdx
        }

        // If largest is not root
        if(largestIdx !== i){
            let tmp = a[i]
            a[i] = a[largestIdx]
            a[largestIdx] = tmp
            this.maxHeapify(a, largestIdx)
        }
    }

}

export default MinHeap;