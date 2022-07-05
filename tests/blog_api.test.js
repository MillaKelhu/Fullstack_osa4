const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('blogs', () => {
    test('are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('have an identifying field id', async () => {
        const blogs = await helper.blogsInDb()
        const ids = blogs.map(b => b.id)

        for (const id of ids) {
            expect(id).toBeDefined()
        }
    })
})

afterAll(() => {
    mongoose.connection.close()
})