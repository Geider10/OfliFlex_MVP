
const PORT = process.env.PORT_PRO || process.env.PORT_DEV
const MONGO_URI = process.env.MONGO_URI_PRO || process.env.MONGO_URI_DEV
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY_PRO || process.env.JWT_SECRET_KEY_DEV
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID_PRO || process.env.GOOGLE_CLIENT_ID_DEV
const GOOGLE_CLIENT_SECRET=  process.env.GOOGLE_CLIENT_SECRET_PRO || process.env.GOOGLE_CLIENT_SECRET_DEV

module.exports = {PORT, MONGO_URI, JWT_SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET}