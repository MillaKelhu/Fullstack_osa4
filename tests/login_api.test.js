const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
})

test('login with an existing user works', async () => {
    const user = helper.newUser

    const response = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
    expect(response.body.username).toEqual(user.username)
    expect(response.body.name).toEqual(user.name)
})

test('login with a nonexistent user does not work', async () => {
    const user = {
        username: "fakeUsername",
        name: "Fakename Fakerson",
        password: "password"
    }

    const response = await api
        .post('/api/login')
        .send(user)
        .expect(401)
})