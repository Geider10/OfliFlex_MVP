const {servicioModel} = require('../models/servicios')
const {userModel} = require('../models/user')

const crearServicio = async (req, res) => {
  try {
    const { titulo, descripcion, imagen, fecha, hora, categoria, usuarioId } = req.body;

    if (!titulo || !descripcion || !imagen || !fecha || !hora || !categoria || !usuarioId) {
      return res.status(400).json({
        error:"Se requiere el _id del usuario, titulo, descripcion, imagen, fecha, hora y categoria para crear un servicio",
      });
    }
    // Buscar el propietario que crea el servicio
    const usuarioAEditar = await userModel.findOne({ _id: usuarioId });
    if (!usuarioAEditar) return res.status(400).json({ error: 'No se encontró al usuario' });
    const nuevoServicio = new servicioModel({
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

// const crearServicio = async (req, res) => {
//     const { titulo, descripcion, imagen, categoria, hora, rangoFechas } = req.body

//     if (!titulo || !descripcion || !imagen || !categoria || !hora) {
//         return res.status(400).json({ error: 'Se requiere titulo, descripcion, imagen, categoria y hora para crear un servicio' })
//     }

//     let fechasDisponibles = [];
//     if (rangoFechas && rangoFechas.inicio && rangoFechas.fin) {
//         fechasDisponibles = generarFechas(rangoFechas.inicio, rangoFechas.fin);
//     }

//     console.log(fechasDisponibles);

//     // Crear servicio nuevo:
//     const nuevoServicio = new servicioModel({ titulo: titulo, descripcion: descripcion, imagen: imagen, categoria: categoria, hora: hora, fechasDisponibles: fechasDisponibles })
//     await nuevoServicio.save();

//     // Devuelvo el nuevo servicio:
//     res.status(201).json(nuevoServicio)
// }

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

const eliminarServicio = async (req, res) => {
    try {
      const servicioId = req.params.servicioId
      const servicioAEliminar = await servicioModel.deleteOne({ servicioID: servicioId }).exec()
      if (servicioAEliminar.deletedCount == 0) return res.status(404).json({ error: 'servicioModel no encontrado' })
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
    eliminarServicio
}