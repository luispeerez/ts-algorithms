interface Node{
    value: number;
    left?: Node | null;
    right?: Node | null;
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
        const node: Node = {value: arr[m]}
        node.left = this.toBSTHelper(arr, left, m-1)
        node.right = this.toBSTHelper(arr, m+1, right)
        return node;
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