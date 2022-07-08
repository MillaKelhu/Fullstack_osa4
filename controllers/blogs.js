const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const blogsRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1, id: 1})

    response.json(blogs)
  })

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = request.token === null
    ? null
    :jwt.verify(request.token, config.SECRET)

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'Unauthorized: token is missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: typeof body.likes === Number
      ? body.likes
      : 0
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const body = request.body

  const decodedToken = request.token === null
    ? null
    :jwt.verify(request.token, config.SECRET)

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'Unauthorized: token is missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Unauthorized: user is missing or not authorized to delete blog' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter