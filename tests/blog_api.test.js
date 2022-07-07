const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const { use } = require('../app')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await User.deleteMany({})
    await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
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

test('a valid blog can be added if a user is logged in', async () => {
    const user = helper.newUser

    const userResponse = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${userResponse.body.token}`)
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterAddition = await helper.blogsInDb()
    expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAfterAddition.map(b => b.title)
    expect(titles).toContain(helper.newBlog.title)
})

test('even a valid blog will not be added if user is not logged in', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(401)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toEqual(helper.initialBlogs.length)
})

test('a new blog without predefined likes has 0 likes', async () => {
    const user = helper.newUser

    const userResponse = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${userResponse.body.token}`)
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    const newestBlog = allBlogs[allBlogs.length - 1]
    expect(newestBlog.likes).toEqual(0)
})

test('an incomplete blog entry will not be added', async () => {
    const user = helper.newUser

    const userResponse = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const newBlog = {
        author: "Ian Fleming"
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${userResponse.body.token}`)
        .send(newBlog)
        .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toEqual(helper.initialBlogs.length)
})

test('a blog with existing id can be deleted', async () => {
    const user = helper.newUser

    const userResponse = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${userResponse.body.token}`)
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

test('a blog can be updated', async () => {
    let allBLogs = await helper.blogsInDb()
    const blogToBeUpdated = allBLogs[0]
    const newLikes = {
        likes: blogToBeUpdated.likes + 20
    }

    await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .send(newLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    allBLogs = await helper.blogsInDb()
    const updatedBLog = allBLogs[0]
    expect(updatedBLog.id).toEqual(blogToBeUpdated.id)
    expect(updatedBLog.likes).toEqual(blogToBeUpdated.likes + 20)

})

test('a newly added blog will have a user attached', async () => {
    let user = helper.newUser

    const userResponse = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${userResponse.body.token}`)
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    const newestBlog = allBlogs[allBlogs.length - 1]
    user = await User.findOne({username: user.username})
    expect(newestBlog.user).toEqual(user._id)

    const userBlogs = user.blogs.map(id => id.toString())
    expect(userBlogs).toContain(newestBlog.id)
})

afterAll(() => {
    mongoose.connection.close()
})