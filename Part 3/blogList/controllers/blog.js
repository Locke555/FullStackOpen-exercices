const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { 'username': 1, 'name': 1 })
  res.json(blogs)

})

blogRouter.get('/:id', async (req, res) => {

  const id = req.params.id
  const blog = await Blog.findById(id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }

})

blogRouter.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    res.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== decodedToken.id.toString()) {
    res.status(401).json({ error: 'Only the user who created the blog can delete it' })
  }

  await Blog.findByIdAndDelete(blog._id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {

  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const newBlog = await Blog.findByIdAndUpdate(req.params.id, blog,
    { new: true, runValidators: true })
  res.json(newBlog)

})

module.exports = blogRouter