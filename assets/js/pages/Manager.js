/**
 * Manager
 *
 * Abstract class extended by all managers,
 * contains methods that may be useful to the
 * managers.
 */

 class Manager {
 	constructor() {
 		//
 	}

 	findAllWhere(elements, condition) {
 		var matched = [];

 		for (var i = 0; i < elements.length; i++) {
 			var element = elements[i];

 			if (condition(element)) {
 				matched.push(element);
 			}
 		}

 		return matched;
 	}

 	findFirstWhere(elements, condition) {
 		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];

			if (condition(element)) {
				return element;
			}
		}

		return null;
 	}
 }