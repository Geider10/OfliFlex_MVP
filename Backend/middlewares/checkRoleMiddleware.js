const {userModel} = require('../models/user')

const checkRole = (roles) => async (req, res, next) => {
    try {
      const usuario = await userModel.findOne({ _id: req.userId });
      if(!roles.includes(usuario.rol)) return res.status(403).json({error : 'acceso denegado'})
      next()
    } catch (e) {
      res.status(401).json({ error: 'Token inválido by rol' })
    }
};

module.exports = checkRole;