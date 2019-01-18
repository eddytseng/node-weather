const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {

	describe('#add', () => {
		it('should add two numbers', () => {
			var results = utils.add(33, 36);
		
			expect(results).toBe(69).toBeA('number');
		});
	});
	
	// Async test
	it('should async add two numbers', (done) => {
		utils.asyncAdd(4, 3, (sum) => {
			expect(sum).toBe(7).toBeA('number');
			done();
		});
	})
	
	it('should square a number', () => {
		var results = utils.square(4);
	
		expect(results).toBe(16).toBeA('number');
	});
	
	it('should expect some values', () => {
		// expect({ person: 'Archer' }).toEqual({ person: 'Archer' });
		// expect([2, 3, 4]).toExclude(1);
		// expect({ name: 'Eddy', age: 34, location: 'Diamond Bar, CA' }).toInclude({ age: 35 });
	});
	
	it('should set firstName and lastName', () => {
		var user = ({ age: 34 });
		var results = utils.setName(user, 'Dingleberry Christmas');
	
		expect(results).toInclude({ firstName: 'Dingleberry', lastName: 'Christmas' });
	});
	
	it('should async square a number', (done) => {
		utils.asyncSquare(12, (squared) => {
			expect(squared).toBe(144).toBeA('number');
			done();
		});
	});
});
