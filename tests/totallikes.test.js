const listHelper = require('../utils/list_helper')

describe('total likes', () => {
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
    const listWithFourBlogs = [
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
          "likes": 7,
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
          "likes": 12,
          "__v": 0
        }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(listWithZeroBlogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithFourBlogs)
        expect(result).toBe(34)
    })
})
  