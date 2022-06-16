// Sovelluksen määrittely, tietokantayhteys
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')

const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

app.use(blogsRouter)

module.exports = app