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
    await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterAddition = await helper.blogsInDb()
    expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAfterAddition.map(b => b.title)
    expect(titles).toContain(helper.newBlog.title)
})

test('a new blog without predefined likes has 0 likes', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    const newestBlog = allBlogs[allBlogs.length - 1]
    expect(newestBlog.likes).toEqual(0)
})

test('an incomplete blog entry will not be added', async () => {
    const newBlog = {
        "author": "Ian Fleming"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toEqual(helper.initialBlogs.length)
})

test('a blog with existing id can be deleted', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    let allBlogs = await helper.blogsInDb()
    const idToBeDeleted = allBlogs[allBlogs.length - 1].id

    await api
        .delete(`/api/blogs/${idToBeDeleted}`)
        .expect(204)

    allBlogs = await helper.blogsInDb()
    expect(allBlogs.length).toEqual(helper.initialBlogs.length)

    const titles = allBlogs.map(b => b.titles)
    expect(titles).not.toContain(helper.newBlog.title)
})

afterAll(() => {
    mongoose.connection.close()
})