const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
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

  const blog = new Blog(req.body)
  const result = await blog.save()
  res.status(201).json(result)

})

blogRouter.delete('/:id', async (req, res) => {

  await Blog.findByIdAndDelete(req.params.id)
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
  const newBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true })
  res.json(newBlog)

})

module.exports = blogRouter