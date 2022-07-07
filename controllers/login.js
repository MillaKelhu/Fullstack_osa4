const config = require('../utils/config')
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = express.Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'Unauthorized: username or passwor is invalid'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, config.SECRET)

    response
        .status(200)
        .send({
            token,
            username: user.username,
            name: user.name
        })
})

module.exports = loginRouter