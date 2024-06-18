const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
 blog = blogs.map(blog => blog.likes)
  return blog.reduce((a,b) => a + b, 0) 
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const blog = blogs.find(blog => blog.likes === maxLikes)
  if (blog){
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
  } else {
    return undefined
  }

}


const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: '',
      blogs: 0
    }
  }
  
  const author = _.countBy(blogs, 'author')
  const authorArray = Object.entries(author)
  const maxBlogs = Math.max(...authorArray.map(author => author[1]))
  const mostBlogs = authorArray.find(author => author[1] === maxBlogs)
  return {
    author: mostBlogs[0],
    blogs: mostBlogs[1]
  }
}


const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: '',
      likes: 0
    }
  }
  
  const author = _.groupBy(blogs, 'author')
  const authorArray = Object.entries(author)
  const likes = authorArray.map(author => {
    const sum = author[1].reduce((a, b) => a + b.likes, 0)
    return { author: author[0], likes: sum }
  }
  )
  const maxLikes = Math.max(...likes.map(author => author.likes))
  const mostLikes = likes.find(author => author.likes === maxLikes)
  return mostLikes
}


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }