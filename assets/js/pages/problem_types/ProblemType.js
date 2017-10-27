/**
 * ProblemType
 *
 * Holds information about a piece of Hardware.
 * Contains all software that is running on the Hardware Unit
 */

class ProblemType {
	constructor(
		id,
		problemName,
		subProblemTypes
	) {
		this.id                = id;
		this.problem_name      = problemName;
		this.sub_problem_types = subProblemTypes; // ID of ProblemType's, get method returns instances of ProblemType's
	}

	get sub_problem_types() {
		return makeItAll.problemManager.getProblemTypes(this._sub_problem_types);
	}

	set sub_problem_types(subProblemTypes) {
		this._sub_problem_types = subProblemTypes;
	}
}