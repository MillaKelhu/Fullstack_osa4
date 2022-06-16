const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, current) => {
        return sum + current.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (favorite, current) => {
        return (favorite.likes > current.likes)
            ? favorite
            : current
    }
    const favorite = blogs.reduce(reducer, {})

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    const authors = _.countBy(blogs, 'author')

    if (Object.keys(authors).length === 0) {
        return {}
    }

    const authorName = Object.keys(authors).reduce((author1, author2) => authors[author1] > authors[author2] ? author1 : author2)
    const authorBlogs = authors[authorName]

    return {
        author: authorName,
        blogs: authorBlogs
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}