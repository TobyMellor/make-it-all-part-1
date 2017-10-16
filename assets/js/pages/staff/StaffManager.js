/**
 * StaffManager
 *
 * Responsible for parsing the AJAX request containing staff
 * creating the corresponding classes. 
 * Contains all functions to return and search the data.
 *
 * StaffManager should never know about the DOM
 */

class StaffManager {
	constructor(staffMembers) {
		this.staffMembers = [];

		// loop through staffMembers, create instances and push to this.staffMembers
	}

	createStaffMember(staff, info, here) {
		// AJAX call here, which returns a ticketId
		// validation here

		var staffId = Math.floor(Math.random() * (10000 + 1));
			
		// create staff instance, push to this.staffMembers. Return new staff member instance
	}

	getStaffMember(staffMemberId) {
		// return staff member instance from this.staffMembers, return null if not found

		return {
			first_name: 'Example',
			last_name: 'User',
			email: 'example@domain.com',
			permission_level: 3 // analyst
		};
	}
}