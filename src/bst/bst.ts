interface Node{
    value: number;
    left: Node | null;
    right: Node | null;
}

class BST{
    head: Node | null;
    constructor(sortedArr: number[]){
        this.head = this.toBST(sortedArr)
        console.log("this.head", this.head)
    }

    toBST = (arr: number[]): Node | null => {
        return this.toBSTHelper(arr, 0, arr.length - 1)
    }

    toBSTHelper = (arr: number[], left: number, right: number): Node | null => {
        if(left > right){
            return null;
        }

        const m = left + (Math.floor((right - left) / 2))
        const node: Node = {value: arr[m], left: null, right: null}
        node.left = this.toBSTHelper(arr, left, m-1)
        node.right = this.toBSTHelper(arr, m+1, right)
        return node;
    }


    insert = (x: number): void => {
        this.head = this.insertHelper(x, this.head)
    } 

    insertHelper = (x: number, node: Node | null): Node => {
        if(node === null){
            const newNode : Node = {value: x, left: null, right: null} 
            return newNode
        }

        /**
         * If x is less than node, go right, until we
         * find a place to insert
         */

        if(x < node.value){
            node.left = this.insertHelper(x, node.left)
        }else{

            /**
             * If not the space should be at right
             */
            node.right = this.insertHelper(x, node.right)
        }

        return node
    }

    toVisualizerFormat = (): VisualizerNode | null => {
        if(this.head){
            return this.toVisualizerFormatHelper(this.head)
        }
        return null;
    }

    toVisualizerFormatHelper = (node: Node): VisualizerNode => {
        const vNode: VisualizerNode = {name: node.value, children: []}
        if(node.left){
            vNode.children.push(this.toVisualizerFormatHelper(node.left))
        }
        if(node.right){
            vNode.children.push(this.toVisualizerFormatHelper(node.right))
        }

        return vNode;
    }
}

export default BST