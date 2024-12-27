const {signup, login} = require('../controllers/auth.controller')
const express = require('express')
const authRouter = express.Router()

authRouter.post('/register', signup)
authRouter.post('/login', login)

module.exports = authRouter