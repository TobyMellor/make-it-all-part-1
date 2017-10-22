/**
 * StaffManager
 *
 * Responsible for parsing the AJAX request containing staff
 * creating the corresponding classes. 
 * Contains all functions to return and search the data.
 *
 * StaffManager should never know about the DOM
 */

class StaffManager extends Manager {
	constructor(staffMembers) {
		super();
		
		this.staffMembers = [
			{
				id: 0,
				name: 'Toby Mellor',
				email: 'example@domain.com',
				permission_level: 3, // analyst
				job_title: 'Developer',
				department: 'Lboro',
				telephone_number: 987654321
			},
			{
				id: 1,
				name: 'Another user',
				email: 'another@email.com',
				permission_level: 0,
				job_title: 'Coffee Maker',
				department: 'N/A',
				telephone_number: 123456789
			}
		];

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

		return this.staffMembers[staffMemberId];
	}
}