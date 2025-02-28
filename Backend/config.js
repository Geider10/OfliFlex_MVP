//ambite de produccion o de desarrollo
const PORT = process.env.PORT || '3000'
const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URI_DEV
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET_KEY_DEV
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID_DEV
const GOOGLE_CLIENT_SECRET=  process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET_DEV
const FRONTEND_URL = process.env.FRONTEND_URL || process.env.FRONTEND_URL_DEV
const EMAIL_ADMIN = process.env.EMAIL_ADMIN || process.env.EMAIL_ADMIN_DEV
const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN || process.env.PASSWORD_ADMIN_DEV

module.exports = {PORT, MONGO_URI, JWT_SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FRONTEND_URL, EMAIL_ADMIN, PASSWORD_ADMIN}