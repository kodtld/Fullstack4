const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  var { username, name, password } = request.body
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  
  if (!(username && name)){
    return response.status(400).json({
        error: 'must include username and name'
      })
  }

  if (!(String(username).length > 2)){
    return response.status(400).json({
        error: 'username must be atleast 3 chars. long'
      })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs', { title: 1, url: 1, likes:1 })    
    response.json(users)
  })

module.exports = usersRouter