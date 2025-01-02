//variables de desarrollo
const PORT = process.env.PORT || '3000'
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Yoel10:yoel2024@dbtesting.lrttm0z.mongodb.net/Ofiflex?retryWrites=true&w=majority&appName=DBTesting'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'la_contraseña_mas_segura_y_fiable_27/10/2024'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '233276774937-dlpho3it1g2oq9kbefe5u7grk9te3sth.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET=  process.env.GOOGLE_CLIENT_SECRET || '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'
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

module.exports = {PORT, MONGO_URI, JWT_SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FRONTEND_URL}