const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
    const listWithZeroBlogs = []
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]
    const listWithFourBlogsWithDifferentLikes = [
        {
          "_id": "62aae337000618084ff81c09",
          "title": "License To Queer",
          "author": "David Lowbridge-Ellis",
          "url": "https://www.licencetoqueer.com/",
          "likes": 10,
          "__v": 0
        },
        {
          "_id": "62aae35e000618084ff81c0b",
          "title": "James Bond food",
          "author": "Edward Biddulph",
          "url": "https://jamesbondfood.com/",
          "likes": 9,
          "__v": 0
        },
        {
          "_id": "62aae5c9000618084ff81c0f",
          "title": "BAMF Style",
          "author": "Nick Guzan",
          "url": "https://bamfstyle.com/",
          "likes": 5,
          "__v": 0
        },
        {
          "_id": "62aae679000618084ff81c11",
          "title": "007 Travelers",
          "author": "Pirita & Mika",
          "url": "https://007travelers.blogspot.com/",
          "likes": 6,
          "__v": 0
        }
    ]
    const listWithFourBlogsWithSameLikes = [
        {
          "_id": "62aae337000618084ff81c09",
          "title": "License To Queer",
          "author": "David Lowbridge-Ellis",
          "url": "https://www.licencetoqueer.com/",
          "likes": 10,
          "__v": 0
        },
        {
          "_id": "62aae35e000618084ff81c0b",
          "title": "James Bond food",
          "author": "Edward Biddulph",
          "url": "https://jamesbondfood.com/",
          "likes": 10,
          "__v": 0
        },
        {
          "_id": "62aae5c9000618084ff81c0f",
          "title": "BAMF Style",
          "author": "Nick Guzan",
          "url": "https://bamfstyle.com/",
          "likes": 10,
          "__v": 0
        },
        {
          "_id": "62aae679000618084ff81c11",
          "title": "007 Travelers",
          "author": "Pirita & Mika",
          "url": "https://007travelers.blogspot.com/",
          "likes": 6,
          "__v": 0
        }
    ]

    test('of empty list does not exist', () => {
        const result = listHelper.favoriteBlog(listWithZeroBlogs)
        expect(result).toEqual({})
    })

    test('when list has only one blog equals that blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of a bigger list with one clear favorite equals that blog', () => {
        const result = listHelper.favoriteBlog(listWithFourBlogsWithDifferentLikes)
        expect(result).toEqual({
            "title": "License To Queer",
            "author": "David Lowbridge-Ellis",
            "likes": 10
          })
    })

    test('of a bigger list with many favorites equals one of those blogs', () => {
        const result = listHelper.favoriteBlog(listWithFourBlogsWithSameLikes)
        expect(result).toEqual({
            "title": "BAMF Style",
            "author": "Nick Guzan",
            "likes": 10
          })
    })

})