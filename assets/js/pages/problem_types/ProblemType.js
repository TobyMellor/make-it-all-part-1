/**
 * ProblemType
 *
 * Holds information about a piece of Hardware.
 * Contains all software that is running on the Hardware Unit
 */

class ProblemType {
	constructor(
		id,
		name,
		parent,
		children
	) {
		this.id       = id;
		this.name     = name;
		this.parent   = parent;
		this.children = children; // ID of ProblemType's, get method returns instances of ProblemType's
	}

	get parent() {
		return makeItAll.problemTypeManager.getProblemType(this._parent);
	}

	set parent(parent) {
		this._parent = parent;
	}

	get children() {
		return makeItAll.problemTypeManager.getProblemTypes(this._children);
	}

	set children(children) {
		this._children = children;
	}
}