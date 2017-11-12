/**
 * Manager
 *
 * Abstract class extended by all managers,
 * contains methods that may be useful to the managers.
 */
class Manager {
	constructor() {
		//
	}
	
	/**
	 * Search array of elements for query in given property names
	 * 
	 * @param elements Array of objects to be searched through
	 * @param query Case insensitive string to search elements
	 * @param properties Array of strings representing elements property names to search through
	 */
	search(elements = [], query = "", properties = []) {
		query = query.toLowerCase(); // Normalise query (and properties individually later)
		return elements.filter(el => { // Get all elements
			return properties.some(prop => { // Check properties until match is found
				if (String(el[prop]).toLowerCase().includes(query)) return true; // Determine if property is a match for query
			});
		});
	}
}
