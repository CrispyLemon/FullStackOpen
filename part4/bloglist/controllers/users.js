const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})


usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  const username = body.username
  const name = body.name
  const password = body.password
  if (!password || !username) {
    return response.status(400).json({
      error: 'username and password are required',
    })
  } else if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'username and password must be at least 3 characters long',
    })
  }
    const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save().catch(error => next(error))

  response.status(201).json(savedUser)
})

module.exports = usersRouter