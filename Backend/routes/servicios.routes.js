const express = require('express')
const servicioRouter = express.Router()
const servicioController = require('../controllers/servicios.controller')
const verifyToken = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/checkRoleMiddleware')
const uploadImg = require('../middlewares/uploadMiddleware')


//Quito verifyToken para que sean rutas publicas
servicioRouter.get('/', servicioController.obtenerServicios)
servicioRouter.get('/:categoria', servicioController.obtenerServicioPorCategoria)
servicioRouter.get('/id/:id', servicioController.obtenerServicioPorId)

//El propietario solo deberia poder eliminas sus productos. //El admin todos
servicioRouter.post('/', verifyToken, checkRole(["propietario"]),uploadImg.single('avatar'), servicioController.crearServicio)
servicioRouter.put('/:servicioId',verifyToken, checkRole(["propietario"]),uploadImg.single('avatar'),servicioController.editarServicio)
servicioRouter.delete("/:servicioId",verifyToken,checkRole(["propietario"]),servicioController.eliminarServicio);
module.exports = servicioRouter