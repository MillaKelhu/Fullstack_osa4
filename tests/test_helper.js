const Blog = require('../models/blog')

const initialBlogs = [
    {
      "title": "License To Queer",
      "author": "David Lowbridge-Ellis",
      "url": "https://www.licencetoqueer.com/"
    },
    {
      "title": "James Bond food",
      "author": "Edward Biddulph",
      "url": "https://jamesbondfood.com/"
    },
    {
      "title": "BAMF Style",
      "author": "Nick Guzan",
      "url": "https://bamfstyle.com/"
    },
    {
      "title": "007 Travelers",
      "author": "Pirita & Mika",
      "url": "https://007travelers.blogspot.com/"
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}