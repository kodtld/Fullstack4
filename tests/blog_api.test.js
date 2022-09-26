const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
    title: "RuokaBlogi",
    author: "Pieta Vasikka",
    url: "www.url.com",
    likes: 14,
    id: "63288d933cfe4b0f8a895f94"
    },
    {
    title: "Vaate Blogi",
    author: "Maisa Mäkäräinen",
    url: "www.urlivaate.com",
    likes: 22,
    id: "6331bee4e8e55333b3acf288"
    }
    ]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    })

test('right amount of notes are returned as json', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
    expect(200)
    expect(/application\/json/)
  })


test('notes id is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

test('a valid note can be added ', async () => {
    const newBlog = {
        title: "Kalastajan tarinat",
        author: "Jukka Suomalainen",
        url: "www.kala.kolumbus.fi",
        likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })


test('an invalid note cant be added ', async () => {
    const newBlog = {
        author: "Jukka Suomalainen",
        likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(404)

  })

test('if no likes, likes === 0 ', async () => {
    const newBlog = {
        title: "Pesäpallo kikat",
        author: "Teuvo Maila",
        url: "www.palloapesään.org",
        likes:""
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toEqual(0)
  })


afterAll(() => {
  mongoose.connection.close()
})