class Node {
	constructor(data, priority) {
		this.data = data,
		this.priority = priority,
		this.parent = null,
		this.right = null,
		this.left = null
	}

	appendChild(node) {
		node.parent = this;
		if (this.left && this.right) {
			return;
		}
		if (this.left) {
			this.right = node;
			return;
		}
		this.left = node;
		return;
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
			return node;
		}
		if (this.right === node) {
			this.right = null;
			node.parent = null;
			return node;
		}
		throw Error ('this node is not a child ');
	}

	remove() {
		if (!this.parent) {
			return;
		}
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}

		let parentOfParent = this.parent.parent;
		let parentNode = this.parent;
		let parentLeft = this.parent.left;
		let parentRight = this.parent.right;
		let nodeLeft = this.left;
		let nodeRight = this.right;
		let mark = (parentLeft === this) ? 'left' : 'right';

		if (nodeLeft) this.removeChild(nodeLeft);
		if (nodeRight) this.removeChild(nodeRight);

		if (parentLeft) parentNode.removeChild(parentLeft);
		if (parentRight) parentNode.removeChild(parentRight);

		if (parentOfParent) {
			parentOfParent.removeChild(parentNode);
			parentOfParent.appendChild(this);
		}

		if (nodeLeft) {
			parentNode.left = nodeLeft;
			parentNode.left.parent = parentNode;
		}

		if (nodeRight) {
			parentNode.right = nodeRight;
			parentNode.right.parent = parentNode;
		}
		if (mark === 'left') {
			this.left = parentNode;
			parentNode.parent = this;
			if (parentRight) {
				this.appendChild(parentRight)
			}
		} else {
			this.right = parentNode;
			parentNode.parent = this;
			if (parentLeft) {
				this.appendChild(parentLeft);
			}
		}
	}
}


module.exports = Node;
