const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const assert = require('node:assert')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const blogs = helper.blogs


beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


describe("get requests", () => {
    test("blogs are returned as json", async () => {
        await api
            .get('/api/blogs')
            .expect(200)


            .expect('Content-Type', /application\/json/)
    })

    test("all blogs are returned", async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, blogs.length)
    })

    test("a specific blog is within the returned blogs", async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)
        assert(contents.includes('React patterns'))
    })
});

test("the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
})

after(() => {
    mongoose.connection.close()
})


describe("post requests", () => {
    test("a valid blog can be added", async () => { 
        const newBlog = {
            title: "new blog",
            id: "5a422a851b54a676234c17f7",
            author: "authorguy",
            url: "http://www.google.com",
            likes: 5
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)
        const contents = blogsAtEnd.map(r => r.title)
        assert(contents.includes('new blog'))
    })

})