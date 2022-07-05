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

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs have an identifying field id', async () => {
    const blogs = await helper.blogsInDb()
    const ids = blogs.map(b => b.id)
    for (const id of ids) {
        expect(id).toBeDefined()
    }
})

test('a valid blog can be added', async () => {
    const newBlog = {
        "title": "Bond and Banter",
        "author": "Jack Lugo",
        "url": "https://bondandbanter.libsyn.com/"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterAddition = await helper.blogsInDb()
    expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAfterAddition.map(b => b.title)
    expect(titles).toContain(newBlog.title)
})

afterAll(() => {
    mongoose.connection.close()
})