const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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
// eslint-disable-next-line no-unused-vars
const usersInitialState = []

beforeEach(async () => {
  await Blog.deleteMany({})

  await User.deleteMany({})

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

test('if likes property is missing, it will be default to 0', async () => {
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

test('if the title or url properties are missing, responds to the request with the status code 400', async () => {
  let newBlogPost = {
    author: 'Rustecean',
    likes: 200
  }

  await api.post('/api/blogs')
    .send(newBlogPost)
    .expect(400)
})

test('delete succesfully a single blog', async () => {
  let allNotes = await api.get('/api/blogs')
    .expect(200)

  let singleNoteId = allNotes.body[0].id

  await api.delete(`/api/blogs/${singleNoteId}`)
    .expect(204)

  let allNotesBeforeDelete = await api.get('/api/blogs')
    .expect(200)

  assert.strictEqual(allNotesBeforeDelete.body.length, allNotes.body.length - 1)
})

test('update succesfully a single blog', async () => {
  let allNotes = await api.get('/api/blogs')
    .expect(200)

  let singleNoteId = allNotes.body[0].id

  let newNote = {
    title: 'Exploring Mongoose Schemas',
    author: 'John Doe',
    url: 'www.example.com',
    likes: 100
  }

  let putResponse = await api.put(`/api/blogs/${singleNoteId}`)
    .send(newNote)
    .expect(200)

  let newState = await api.get('/api/blogs')
    .expect(200)

  assert.strictEqual(putResponse.body.id, singleNoteId)
  assert.deepStrictEqual(putResponse.body, newState.body[0])
})

describe.only('Users Test', () => {
  test.only('create succesfully a single user', async () => {
    let newUser = {
      username: 'foooo',
      name: 'foo bar',
      password: '12345'
    }

    let response = await api.post('/api/users')
      .send(newUser)
      //.expect(201)
    console.log(response.body)
    assert(Object.hasOwn(response.body, 'id'))
  })

  test.only('cant create a user with a password or username shorter than 3 character', async () => {
    let badPassword = {
      username: 'foooo',
      name: 'foo bar',
      password: '12'
    }

    let badUsername = {
      username: 'fo',
      name: 'foo bar',
      password: '12456789'
    }

    let badPasswordResponse = await api.post('/api/users')
      .send(badPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(badPasswordResponse.body.error, 'You cannot create a password with a length of less than 3 characters.')

    let badUsernameResponse = await api.post('/api/users')
      .send(badUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(badUsernameResponse.body.error, 'You cannot create a user with a length of less than 3 characters.')
  })
})

after(async () => {
  await mongoose.connection.close()
})