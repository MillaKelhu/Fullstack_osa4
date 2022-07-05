const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "License To Queer",
    "author": "David Lowbridge-Ellis",
    "url": "https://www.licencetoqueer.com/",
    "likes": 10
  },
  {
    "title": "James Bond food",
    "author": "Edward Biddulph",
    "url": "https://jamesbondfood.com/",
    "likes": 9
  },
  {
    "title": "BAMF Style",
    "author": "Nick Guzan",
    "url": "https://bamfstyle.com/",
    "likes": 5
  },
  {
    "title": "007 Travelers",
    "author": "Pirita & Mika",
    "url": "https://007travelers.blogspot.com/",
    "likes": 6
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const newBlog = {
  "title": "Bond and Banter",
  "author": "Jack Lugo",
  "url": "https://bondandbanter.libsyn.com/"
}

module.exports = {
    initialBlogs,
    blogsInDb,
    newBlog
}