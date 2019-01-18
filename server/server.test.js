const request = require('supertest');
const expect = require('expect'); // Assertions (like Chai)

const app = require('./server').app;

describe('Server', () => {

	describe('GET /', () => {
		it('should run hello world response', (done) => {
			request(app)
				.get('/')
				.expect(200)
				.expect('Hello, World!')
				.end(done);
		});
	});
	
	describe('GET /users', () => {
		it('should return a user object', (done) => {
			request(app)
				.get('/users')
				.expect(200)
				.expect((res) => {
					expect(res.body).toInclude({ name: 'Archer Tseng', age: 5 });
				})
				.end(done);
		});
	});
});