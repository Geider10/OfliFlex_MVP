const {signup, login} = require('../controllers/auth.controller')
const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = require('../config')

authRouter.post('/register', signup)
authRouter.post('/login', login)

//Endpoint que se ejecuta cuando el usuario hace click en el boton de google
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
//endpoint que se ejecuta despues de que el usuario se loguea con google
authRouter.get('/google/callback', passport.authenticate('google',  { session: false }), (req, res) => {
    const user = req.user//retorna el usuario que se logueo de la db
    const bodyToken = {_id: user._id, email: user.email}
    const token = jwt.sign({user: bodyToken}, JWT_SECRET_KEY, {expiresIn: '1h'}) 
    //redireciono al inicio del front con el token en la URL porque no supe como manipularlo desde el front
    res.redirect(`http://localhost:5173/?token=${token}`)
})
module.exports = authRouter