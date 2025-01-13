const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = require('../config')
function verifyToken(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ','')
        if (!token) return res.status(401).json({ error: 'No hay token' })
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.userId = decoded.user._id;
        next()
    } catch (error) {
        res.status(401).json({ error: 'Token inválido by auth' })
    }
}

module.exports = verifyToken