const {userModel} = require('../models/user'); 
const jwt = require('jsonwebtoken')

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
        const token = jwt.sign({user: bodyToken}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'}) 
        res.status(200).json({token})
    }
    catch(e){
        res.status(500).json({error: e.message})
    }
}
module.exports = {signup, login}