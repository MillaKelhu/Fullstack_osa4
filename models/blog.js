const logger = require('../utils/logger')
const config = require('../utils/config')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info('Connected to MongoDB, yay you')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message)
    })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

module.exports = mongoose.model('Blog', blogSchema)