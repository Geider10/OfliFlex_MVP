const express = require('express');
const {userModel} = require('../models/user');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const uploadImg = require('../middlewares/uploadMiddleware');
const uploadRouter = express.Router();


uploadRouter.post('/upload', verifyToken, checkRole(["usuario", "propietario"]), uploadImg.single('avatar'), async (req, res) => {
  try {
    const file = req.file;
    const usuarioId = req.userId;

    if (!file) return res.status(400).send({ error: 'No hay un archivo subido' });
    // Convertir img a base64 para almacenar en MongoDB
    const base64Image = file.buffer.toString('base64');
    const imagenUrl = `data:${file.mimetype};base64,${base64Image}`;

    const user = await userModel.findByIdAndUpdate(usuarioId, { imagenUrl }, { new: true });
    if (!user) return res.status(404).send({ error: 'Usuario no encontrado' });
    
    res.status(200).json({ message: 'Imagen subida exitosamente', imagenUrl: user.imagenUrl });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
module.exports = uploadRouter;