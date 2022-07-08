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
        .send(helper.newUserA)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAfterAddition = await helper.usersInDb()
    expect(usersAfterAddition.length).toEqual(helper.initialUsers.length + 1)
    
    const names = usersAfterAddition.map(user => user.name)
    expect(names).toContain(helper.newUserA.name)
})

test('a user with too short username will not be added', async () => {
    const newUser = {
        username: "Vi",
        name: "Violet",
        password: "password"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const users = await helper.usersInDb()
    expect(users.length).toEqual(helper.initialUsers.length)

    const names = users.map(user => user.name)
    expect(names).not.toContain(newUser.name)
})

test('a user with too short password will not be added', async () => {
    const newUser = {
        username: "PrincessOfParallelograms",
        name: "Anne Isabella Noel Byron",
        password: "##"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const users = await helper.usersInDb()
    expect(users.length).toEqual(helper.initialUsers.length)

    const names = users.map(user => user.name)
    expect(names).not.toContain(newUser.name)
})

test('a username must be unique', async () => {
    const newUser = {
        username: "enchantress_of_numbers",
        name: "Augusta Ada King",
        password: "#####"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const users = await helper.usersInDb()
    expect(users.length).toEqual(helper.initialUsers.length)

    const names = users.map(user => user.name)
    expect(names).not.toContain(newUser.name)
})