const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialState = [
  {
    title: 'Exploring Mongoose Schemas',
    author: 'John Doe',
    url: 'www.example.com',
    likes: 25
  },
  {
    title: 'Mastering Validation in Mongoose',
    author: 'Jane Smith',
    url: 'www.tutorialspoint.com',
    likes: 18
  },
  {
    title: 'Building Efficient Data Models with Mongoose',
    author: 'David Johnson',
    url: 'www.mongodb.com',
    likes: 31
  },
  {
    title: 'Querying Data Effectively in Mongoose',
    author: 'Emily Williams',
    url: 'www.mongoosejs.com',
    likes: 42
  },
  {
    title: 'Optimizing Performance with Mongoose',
    author: 'Robert Jackson',
    url: 'www.codementor.io',
    likes: 15
  },
  {
    title: 'Handling Relationships in Mongoose',
    author: 'Michelle Lee',
    url: 'www.sitepoint.com',
    likes: 29
  },
  {
    title: 'Best Practices for Using Mongoose in Production',
    author: 'Ryan Miller',
    url: 'www.nodejs.org',
    likes: 38
  },
  {
    title: 'Troubleshooting Common Mongoose Issues',
    author: 'Sarah Thompson',
    url: 'www.stackoverflow.com',
    likes: 12
  },
  {
    title: 'Advanced Techniques for Mongoose Developers',
    author: 'Michael Brown',
    url: 'www.medium.com',
    likes: 50
  },
  {
    title: 'Building Scalable Applications with Mongoose',
    author: 'Laura White',
    url: 'www.digitalocean.com',
    likes: 21
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(initialState)
})

test('all notes are returned as JSON', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 10)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  assert(Object.hasOwn(response.body[0], 'id'))
})

test('Makin a HTTP POST Request, succesfully creates a new blog post', async () => {
  const newBlogPost = {
    title: 'Rust is Awesome',
    author: 'Rustecean',
    url: 'www.rustlang.org',
    likes: 200
  }

  const response = await api.post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allData = await api.get('/api/blogs')
    .expect(200)

  delete response.body.id

  assert.strictEqual(allData.body.length, initialState.length + 1)
  assert.deepStrictEqual(response.body, newBlogPost)

})

test.only('if likes property is missing, it will be default to 0', async () => {
  const newBlogPost = {
    title: 'Rust is Awesome',
    author: 'Rustecean',
    url: 'www.rustlang.org',
  }

  const response = await api.post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})