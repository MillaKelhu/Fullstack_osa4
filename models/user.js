const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: 2,
        required: true
    },
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    passwordHash: {
        type: String,
        minlength: 5,
        required: true
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)