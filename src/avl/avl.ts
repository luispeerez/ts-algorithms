interface Node{
    value: number;
    left: Node | null;
    right: Node | null;
    parent: Node | null
    height: number
}

class AVL{
    head: Node | null;
    constructor(){
        this.head = null
    }


    insert = (x: number): void => {
        this.head = this.insertHelper(x, this.head)
        console.log(this.head)
    } 

    insertHelper = (x: number, node: Node | null): Node => {
        if(node === null){
            const newNode : Node = {
                value: x, 
                left: null, 
                right: null, 
                parent: null,
                height: 0
            } 
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

        let nodeLeftHeight = node.left ? node.left.height : -1;
        let nodeRightHeight = node.right ? node.right.height : -1;

        // Checking if it is unbalanced
        if(Math.abs(nodeLeftHeight - nodeRightHeight) > 1 ){
            node = this.rotateTree(node)

            // Calculating heights again, rotation
            nodeLeftHeight = node.left ? node.left.height : -1;
            nodeRightHeight = node.right ? node.right.height : -1;
        }


        node.height = 1 + Math.max(nodeLeftHeight, nodeRightHeight);

        return node
    }

    rotateTree = (node: Node): Node => {
        // Handling the case where path is straight
        // TODO: Handle zigzag case
        const nodeLeftHeight = node.left ? node.left.height : -1;
        const nodeRightHeight = node.right ? node.right.height : -1;

        // If left heavy
        if(nodeLeftHeight > nodeRightHeight){
            return this.rotateRight(node)
        }

        // Right heavy
        return this.rotateLeft(node)

    }

    rotateRight = (oldRoot: Node): Node => {
        let defaultNode: Node = {value: -1, parent: null, height: -1, right: null, left: null};
        let root = oldRoot.left;
        oldRoot.left = root ? root.right : null
        if(root){
            root.right = oldRoot || null
        }
        return root || defaultNode;
    } 

    rotateLeft = (oldRoot: Node): Node => {
        let defaultNode: Node = {value: -1, parent: null, height: -1, right: null, left: null};
        let root = oldRoot.right;
        oldRoot.right = root ? root.left : null
        if(root){
            root.left = oldRoot || null
        }
        return root || defaultNode;
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