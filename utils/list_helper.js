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
        return (favorite.likes > current.likes) ? favorite : current
    }

    return blogs.reduce(reducer, {}) 
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}