const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('./server');
const { Todo } = require('./todo/todo.model');
const { todos, populateTodos } = require('./todo/todo.test');
const { User } = require('./user/user.model');
const { users, populateUsers } = require('./user/user.test');

beforeEach(populateTodos);
beforeEach(populateUsers);

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
					.find({ text })
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
						expect(todos.length).toBe(2);
						done();
					})
					.catch(error => done(error));
			});
	});
});


describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2)
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not found', (done) => {
		request(app)
			.get(`/todos/${new ObjectID().toHexString()}`) // passing a valid object id that does not exist in the database
			.expect(404)
			.end(done);
	});

	it('should return 404 for non-object ids', (done) => {
		request(app)
			.get(`/todos/1234`) // purposefully passing an invalid object id
			.expect(404)
			.end(done);
	});
});

describe('GET /users/me', () => {
	it('should return user if authenticated', (done) => {
		request(app)
			 .get('/users/me')
			 .set('x-auth', users[0].tokens[0].token)
			 .expect(200)
			 .expect((res) => {
				 expect(res.body._id).toBe(users[0]._id.toHexString());
				 expect(res.body.email).toBe(users[0].email);
			 })
			 .end(done);
	});

	it('should return 401 if not authenticated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
	});
});

describe('POST /users', () => {
	it('should create a user', (done) => {
		const email = 'example@email.com';
		const password = '123mnb!!!!!';

		request(app)
			.post('/users')
			.send({ email, password })
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
			})
			.end((error) => {
				if (error) {
					return done(error);
				}

				User
					.findOne({ email })
					.then((user) => {
						expect(user).toExist();
						expect(user.password).toNotBe(password);
						done();
					});
			});
	});

	it('should return validation errors if request invalid', (done) => {
		request(app)
			.post('/users')
			.send( { email: '!!!', password: '123' })
			.expect(400)
			.end(done);
	});

	it('should not create user if email in use', (done) => {
		request(app)
			.post('/users')
			.send( { email: users[0].email, password: 'Password1234!!!!' })
			.expect(400)
			.end(done);
	});
})