const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.sizeMark = [];
	}

	push(data, priority) {
		let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
		this.sizeMark.push(1);
	}

	pop() {
		if (!this.isEmpty()) {
			let rootData = this.root.data;
			let detachedRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.sizeMark.pop(1);
			this.shiftNodeDown(this.root);
			return rootData;
		}
	}

	detachRoot() {
		let thisRoot = this.root;
		this.root = null;
		if (~this.parentNodes.indexOf(thisRoot)) {
			this.parentNodes.splice(this.parentNodes.indexOf(thisRoot), 1)
		}
		return thisRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes[0]) {
			this.root = this.parentNodes.pop();
			if (detached.left) {
				this.root.appendChild(detached.left)
			}
			if (detached.right) {
				this.root.appendChild(detached.right);
			}
			if (this.root.parent) {
				this.parentNodes.unshift(this.root.parent);
				this.root.parent.removeChild(this.root);
			}
		}
	}

	size() {
		if (this.parentNodes.length === 0) {
			return 0;
		}
		return this.sizeMark.length;
	}

	isEmpty() {
		if (this.root) {
			return false;
		}
		return true;
	}

	clear() {
		this.root = null;
		this.parentNodes.length = 0;
	}

	insertNode(node) {
		this.parentNodes.push(node);
		if (this.root) {
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].right) {
				this.parentNodes.splice(0, 1);
			}
		} else {
			this.root = node;
		}

	}

	shiftNodeUp(node) {
		if (node.parent === null) {
			return;
		}
		let nodePosition = this.parentNodes.indexOf(node);
		let parentPosition = this.parentNodes.indexOf(node.parent);
		if (node.priority > node.parent.priority && node.parent !==this.root ) {
			this._swapElementInParentNode(parentPosition, nodePosition, node.parent);
			node.swapWithParent();
			this.shiftNodeUp(node);
		} 
		if(node.parent === this.root && node.priority > node.parent.priority){
			this._swapElementInParentNode(parentPosition, nodePosition, node.parent);
			let thisRoot = this.root;
			this.root = null;
			node.swapWithParent();
			node.parent = null;
			this.root = node;
			this.shiftNodeUp(node);
		}
	}
	_swapElementInParentNode(firstNode, secondNode, node) {
		if (~secondNode) {
			if (!~firstNode) {
				this.parentNodes[secondNode] = node;
			} else {
				let thisNode = this.parentNodes[secondNode];
				this.parentNodes[secondNode] = this.parentNodes[firstNode];
				this.parentNodes[firstNode] = thisNode;
			}
		}
	}

	shiftNodeDown(node) {
		if ( node === null || !node.left ) {
			return;
		}

		let arrayOfNodes = [];
		arrayOfNodes.splice(0, 0, node, node.left, node.right);
		let indexOfNull = arrayOfNodes.indexOf(null);
		if (~indexOfNull) {
			arrayOfNodes.splice(indexOfNull, 1);
		}
		arrayOfNodes.sort( (a,b) => b.priority - a. priority);

		let nodePosition =this.parentNodes.indexOf(node);
		let childrenPosition =this.parentNodes.indexOf(arrayOfNodes[0]);
		this._swapElementInParentNode(nodePosition, childrenPosition, node);

		if (this.root === node) {
			if (arrayOfNodes[0] !== node) {
				this.root = null;
				arrayOfNodes[0].swapWithParent();
				arrayOfNodes[0].parent = null;
				this.root = arrayOfNodes[0];
				arrayOfNodes.length = 0;
				this.shiftNodeDown(node);
			}
		}

		if (node.left && this.root !== node && arrayOfNodes[0]) {
			if (arrayOfNodes[0] !== node) {
				arrayOfNodes[0].swapWithParent();
				arrayOfNodes.length = 0;
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
