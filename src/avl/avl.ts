interface Node{
    value: number;
    left: Node | null;
    right: Node | null;
    parent: Node | null
}

class AVL{
    head: Node | null;
    constructor(){
        this.head = null
    }


    insert = (x: number): void => {
        this.head = this.insertHelper(x, this.head)
    } 

    insertHelper = (x: number, node: Node | null): Node => {
        if(node === null){
            const newNode : Node = {value: x, left: null, right: null, parent: null} 
            return newNode
        }

        /**
         * If x is less than node, go right, until we
         * find a place to insert
         */

        if(x < node.value){
            node.left = this.insertHelper(x, node.left)
            node.left.parent = node
        }else{

            /**
             * If not the space should be at right
             */
            node.right = this.insertHelper(x, node.right)
            node.right.parent = node;
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

        // Adding right first because of visualizer horizontal render

        if(node.right){
            vNode.children.push(this.toVisualizerFormatHelper(node.right))
        }

        if(node.left){
            vNode.children.push(this.toVisualizerFormatHelper(node.left))
        }


        return vNode;
    }
}

export default AVL