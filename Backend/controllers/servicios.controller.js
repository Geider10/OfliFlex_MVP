const {servicioModel} = require('../models/servicios')
const {userModel} = require('../models/user')
const {reservaModel} = require('../models/reservas')
const crearServicio = async (req, res) => {
  try {
    const { titulo, descripcion, imagen, fecha, hora, categoria, userId } = req.body;

    if (!titulo || !descripcion || !imagen || !fecha || !hora || !categoria || !userId) {
      return res.status(400).json({
        error:"Se requiere el _id del usuario, titulo, descripcion, imagen, fecha, hora y categoria para crear un servicio",
      });
    }
    // Buscar el propietario que crea el servicio
    const usuarioAEditar = await userModel.findOne({ _id: userId });
    if (!usuarioAEditar) return res.status(400).json({ error: 'No se encontró al usuario' });
    const nuevoServicio = new servicioModel({
      userId : userId,
      titulo: titulo,
      descripcion: descripcion,
      imagen: imagen,
      fecha: fecha,
      hora: hora,
      categoria: categoria,
    });
    await nuevoServicio.save();

    // Agrego el nuevo servicio a la lista del propietario:
    usuarioAEditar.listaServicios.push(nuevoServicio);

    // Guardo en la db los datos:
    await usuarioAEditar.save();
    res.status(201).json(nuevoServicio);
  } catch (e) {
    res.json({error : e})
  }
};

const obtenerServicios = async (req, res) => {
    try {
      const servicios = await servicioModel.find({}).exec()
      res.json(servicios)
    } catch (e) {
      res.json({error : e})
    }
}

const obtenerServicioPorCategoria = async (req, res) => {
    try {
      const servicios = await servicioModel.findOne({ categoria: req.params.categoria }).exec()
      if(!servicios) return  res.status(404).json({ error: 'Categoria del servicio no encontrada' })
      res.json(servicios)
    } catch (e) {
      res.json({error : e})
    }
}

const obtenerServicioPorId = async (req, res) => {
  try {
    const servicio = await servicioModel.findOne({ _id: req.params.id }).exec()
    if(!servicio) return res.status(404).json({ error: 'servicioModel no encontrado' })
    res.json(servicio)
  } catch (e ) {
    res.json({error : e})
  }
}
const editarServicio = async (req,res) => {
  try {
    const id = req.params.servicioId
    const bodyService = req.body
    const service = await servicioModel.findOne({servicioID : id})
    if (!service) res.json({error : 'service not found'})
    for (const key in service) {
      if (bodyService.hasOwnProperty(key)) {
        service[key] = bodyService[key]
      }
    }
    await service.save()
    res.json({succes : 'req put service', payload : service})
  } catch (error) {
    res.json({error: error})
  }
}
const eliminarServicio = async (req, res) => {
    try {
      const servicioId = req.params.servicioId
      const servicio = await servicioModel.findOne({servicioID: servicioId})
      if (!servicio) return res.status(404).json({error : 'servicio-propetario not found'})
      //eliminar servicio de la lista desde el propietario y eliminar servicio
      const propietario = await userModel.findOne({_id : servicio.userId})
      if (!propietario) return res.status(404).json({error : 'propietario not found'})
      const filterServicios = propietario.listaServicios.filter( s => s.servicioID != servicioId)
      await userModel.updateOne({_id : servicio.userId} , {$set : {listaServicios : filterServicios}})
      const servicioAEliminar = await servicioModel.deleteOne({ servicioID: servicioId }).exec()
      //eliminar servicio desde el usuario
      const serviceUser = await reservaModel.findOne({servicioID : servicioId})
      if (!serviceUser) return res.status(404).json({error : 'servicio-usuario not found'})
      const user = await userModel.findOne({_id : serviceUser.usuarioId})
      const filterReservas = user.listaReservas.filter(r => r.servicioID != servicioId)
      console.log(filterReservas);
      await userModel.updateOne({_id : serviceUser.usuarioId}, {$set:{listaReservas : filterReservas}})
      if (servicioAEliminar.deletedCount == 0) return res.status(404).json({ error: 'no se elimino dicho servicio' })
      res.status(200).json({ success: 'servicioModel eliminado correctamente' })
    } catch (e) {
      res.json({error : e})
    }
}

module.exports = {
    crearServicio,
    obtenerServicios,
    obtenerServicioPorCategoria,
    obtenerServicioPorId,
    eliminarServicio,
    editarServicio
}