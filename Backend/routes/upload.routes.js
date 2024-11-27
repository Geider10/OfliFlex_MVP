const express = require('express');
const multer = require('multer');
const {userModel} = require('../models/user');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const uploadRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(), // Usar almacenamiento en memoria para obtener el buffer
  limits: {
    fileSize: 3000000 // 3 megas
  },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return callback(new Error('Por favor subir una foto en formato PNG, JPEG ó JPG'));
    }
    callback(null, true);
  }
});

uploadRouter.post('/upload', verifyToken, checkRole(["usuario", "propietario"]), upload.single('avatar'), async (req, res) => {
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