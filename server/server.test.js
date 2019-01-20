const expect = require('expect');
const request = require('supertest');

const app = require('./server');
const { Todo } = require('./todo/todo.model');

beforeEach(done => {
	Todo.remove({}).then(() => done());
});

describe('GET /', () => {
	it('should run hello world response', (done) => {
		request(app)
			.get('/')
			.expect(200)
			.expect('Hello, World!')
			.end(done);
	});
});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		const text = 'Test todo route';

		request(app)
			.post('/todos')
			.send({ text })
			.expect(200)
			.expect(res => {
				expect(res.body.text).toBe(text);
			})
			.end((error, res) => {
				if (error) {
					return done(error);
				}

				Todo
					.find()
					.then(todos => {
						expect(todos.length).toBe(1);
						expect(todos[0].text).toBe(text);
						done();
					})
					.catch(error => done(error));
			});
	});

	it('should not create a todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send()
			.expect(400)
			.end((error, res) => {
				if (error) {
					return done(error);
				}

				Todo
					.find()
					.then(todos => {
						expect(todos.length).toBe(0);
						done();
					})
					.catch(error => done(error));
			});
	});
});

describe('POST /users', () => {
	it('should return a user', (done) => {
		request(app)
			.post('/users')
			.send({ email: 'eddytseng@icloud.com '})
			.expect(200)
			.end(done);
	});
});
