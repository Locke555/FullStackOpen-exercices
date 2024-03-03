const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)

})

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const blog = await Blog.findById(id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (req, res, next) => {
  try {
    const blog = new Blog(req.body)
    const result = await blog.save()
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const body = req.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const newBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true })
    res.json(newBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter