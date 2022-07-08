const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "License To Queer",
    author: "David Lowbridge-Ellis",
    url: "https://www.licencetoqueer.com/",
    likes: 10
  },
  {
    title: "James Bond food",
    author: "Edward Biddulph",
    url: "https://jamesbondfood.com/",
    likes: 9
  },
  {
    title: "BAMF Style",
    author: "Nick Guzan",
    url: "https://bamfstyle.com/",
    likes: 5
  },
  {
    title: "007 Travelers",
    author: "Pirita & Mika",
    url: "https://007travelers.blogspot.com/",
    likes: 6
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const newBlog = {
  title: "Bond and Banter",
  author: "Jack Lugo",
  url: "https://bondandbanter.libsyn.com/"
}

const initialUsers = [
  {
    username: "enchantress_of_numbers",
    name: "Ada Lovelace",
    passwordHash: "#####"
  },
  {
    username: "AmazingGrace",
    name: "GraceHopper",
    passwordHash: "#####"
  },
  {
    username: "mother-of-wifi",
    name: "Hedy Lamarr",
    passwordHash: "#####"
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const newUserA = {
  username: "rope-mother",
  name: "Margaret Hamilton",
  password: "password"
}

const newUserB = {
  username: "dragonTattoo",
  name: "Lisbeth Salander",
  password: "password"
}

module.exports = {
    initialBlogs,
    blogsInDb,
    newBlog,
    initialUsers,
    usersInDb,
    newUserA,
    newUserB
}