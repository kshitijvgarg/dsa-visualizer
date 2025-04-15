export interface TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export class Tree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  addNode(data: TreeNode["data"]) {
    const newNode: TreeNode = {
      data: data,
      left: null,
      right: null,
    };

    if (this.root == null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(current: TreeNode, newNode: TreeNode) {
    if (newNode.data < current.data) {
      if (current.left == null) {
        current.left = newNode;
      } else {
        this.insertNode(current.left, newNode);
      }
    } else if (newNode.data > current.data) {
      if (current.right == null) {
        current.right = newNode;
      } else {
        this.insertNode(current.right, newNode);
      }
    }
  }
}
