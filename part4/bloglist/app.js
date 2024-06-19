const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoUrl = config.MONGODB_URI

  mongoose.connect(mongoUrl)
    .then(
      logger.info('Connected to MongoDB @', mongoUrl)
    )
    .catch(error => {
      logger.error('Error connecting to MongoDB:', error.message)
    }
    )



app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app