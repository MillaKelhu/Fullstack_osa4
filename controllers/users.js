const express = require('express')
const bcrypt = require('bcrypt')
const usersRouter = express.Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', {url: 1, title: 1, author: 1, id: 1})

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    const existingUser = await User.findOne({ username: `${body.username}` })
    if (existingUser) {
        return response.status(400).json({
            error: `User validation failed: username ('${body.username}') is not unique`
        })
    }

    if (body.password.length > 2) {
        saltRounds = 10
        const hashedPassword = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash: hashedPassword
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } else {
        return response.status(400).json({error: `User validation failed: password is shorter than the minimum allowed length (3).`})
    }
})

module.exports = usersRouter