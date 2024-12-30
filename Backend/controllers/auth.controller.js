const {userModel} = require('../models/user'); 
const jwt = require('jsonwebtoken')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET_KEY} = require('../config')

const signup = async (req,res) => {
    const data = req.body
    try{
        const user = await userModel.findOne({email : data.email})
        if(user) return res.status(400).json({message: 'The user already exists'})
        await userModel.create(data)
        res.status(201).json({message: 'User created successfully'})    
        }
    catch(e){
        res.status(500).json({error: e.message})
    }
}
const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) return res.status(400).json({message: 'Email and password are required'})
    try{
        const user = await userModel.findOne({email})
        if(!user) return res.status(404).json({message: 'User not found'})
        const validate = await user.isValidPassword(password) //retorna true o false
        if(!validate) return res.status(400).json({message: 'Incorrect password'})
        const bodyToken = {_id: user._id, email: user.email}
        const token = jwt.sign({user: bodyToken}, JWT_SECRET_KEY, {expiresIn: '1h'}) 
        res.status(200).json({token})
    }
    catch(e){
        res.status(500).json({error: e.message})
    }
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
},  async (accessToken, refreshToken, profile, done) => {
        console.log(profile); // data del user logueado por google
        //verifico que exista el usuario de google en la db
        let user = await userModel.findOne({googleId : profile.id})
        if(user) return done(null, user, {message: 'Usuario logueado por googgleId'})
        
        //verifico si el usuario que se inteta registrar ya existe con su mail en la db
        user = await userModel.findOne({email: profile.emails[0].value})
        if(user) {
            user.googleId = profile.id
            await user.save()
            return done(null, user, {message: 'Usuario logueado por email'})
        }

        //si no sucede ninguno de los 2 casos creo el usuario nuevo en la db
        const newUser = {
            googleId: profile.id,
            email: profile.emails[0].value,
            nombre: profile.name.givenName,
            apellido: profile.name.familyName,
            telefono: profile.phoneNumbers ? profile.phoneNumbers[0].value : 1122334455,
            edad : 22
        }
        await userModel.create(newUser)
        return done(null, newUser, {message: 'Usuario logueado correctamente'})
    })
)
module.exports = {signup, login}