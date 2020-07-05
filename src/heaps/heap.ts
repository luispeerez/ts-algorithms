const Heap = (): any => {

    const getLeftIndex = (i: number) => (2*i) + 1

    const getLeft = (a: number[], i: number): number => {
        return a[getLeftIndex(i)];
    }

    const getRightIndex = (i: number) => (2*i) + 2

    const getRight = (a: number[], i: number): number => {
        return a[getRightIndex(i)];
    }

    const getParent = (a: number[], i: number): number => {
        return a[Math.floor((i-1)/2)]
    }

    const buildMaxHeap = (arr: number[]) => {
        let items = [...arr]
        let n = items.length;
        for(let i = Math.floor( (n/2) -1 ); i >= 0; i--){
            maxHeapify(items, i)
        }
        console.log("items heapified", items)
    }

    const maxHeapify = (a: number[], i: number): void => {
        let n = a.length;
        let left = getLeft(a, i)
        let right = getRight(a, i)
        
        // If current item is less than its childrens
        if(a[i] < left || a[i] < right){
            
            // Starting with current as biggest default
            // This should change to left or right
            let biggestIdx = -1
            let biggestValue = -1;

            if(left > a[i] && getLeftIndex(i) < n && left > right ){
                biggestIdx = getLeftIndex(i)
                biggestValue = left;
            }
            
            if(right > a[i] && getRightIndex(i) < n && right > left ){
                biggestIdx = getRightIndex(i)
                biggestValue = right;                    
            }

            // Swap biggest child with parent
            a[biggestIdx] = a[i]
            a[i] = biggestValue
            
            // Recurse call to maxheapify childs of biggest child if affected
            maxHeapify(a, biggestIdx)
        }
    
    }

    return {
        buildMaxHeap
    }
}

export default Heap;