require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const PORT = process.env.PORT
const KEY = process.env.KEY_FILE
const CERT = process.env.CERT_FILE
const SECRET = process.env.SECRET

module.exports = {
    MONGODB_URI,
    PORT,
    KEY,
    CERT,
    SECRET
}