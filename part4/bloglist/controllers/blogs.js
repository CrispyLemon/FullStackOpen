const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).catch(error => next(error))  
  response.json(blogs)
  // Blog
  //     .find({})
  //     .then(blogs => {
  //       response.json(blogs)
  //     })
  //     .catch(error => next(error))
  })

blogsRouter.post('/', async (request, response, next) => {
    const blog = await new Blog(request.body)

    await blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
  })

module.exports = blogsRouter