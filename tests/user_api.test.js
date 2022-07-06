const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('a valid user can be added', async () => {
    await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAfterAddition = await helper.usersInDb()
    expect(usersAfterAddition.length).toEqual(helper.initialUsers.length + 1)
    
    const names = usersAfterAddition.map(user => user.name)
    expect(names).toContain(helper.newUser.name)
})