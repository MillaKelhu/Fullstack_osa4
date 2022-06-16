// Sovelluksen määrittely, tietokantayhteys
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info('Connected to MongoDB, yay you')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message)
    })

const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

app.use(blogsRouter)

module.exports = app