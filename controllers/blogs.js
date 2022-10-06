const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.user || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!(blog.likes)) {
    blog.likes=0
  }

  if (blog.title && blog.url){
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
  }

  else{
    response.status(400).end()
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})


blogsRouter.delete('/:id', async (request, response) => {
/*  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
*/  
  if (request.user){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  
  
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter