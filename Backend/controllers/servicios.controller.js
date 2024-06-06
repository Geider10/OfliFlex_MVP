const generarFechas = require('../helpers/generarFechas');

const Servicio = require('../models/servicios')

const crearServicio = async (req, res) => {
    const { titulo, descripcion, categoria, hora, rangoFechas } = req.body

    if (!titulo || !descripcion || !categoria || !hora) {
        return res.status(400).json({ error: 'Se requiere titulo, descripcion, categoria y hora para crear un servicio' })
    }

    let fechasDisponibles = [];
    if (rangoFechas && rangoFechas.inicio && rangoFechas.fin) {
        fechasDisponibles = generarFechas(rangoFechas.inicio, rangoFechas.fin);
    }

    console.log(fechasDisponibles);

    // Crear servicio nuevo:
    const nuevoServicio = new Servicio({ titulo: titulo, descripcion: descripcion, categoria: categoria, hora: hora, fechasDisponibles: fechasDisponibles })
    await nuevoServicio.save();

    // Devuelvo el nuevo servicio:
    res.status(201).json(nuevoServicio)
}

const obtenerServicios = async (req, res) => {
    const servicios = await Servicio.find({}).exec()
    res.json(servicios)
}

const obtenerServicioPorCategoria = async (req, res) => {
    const servicios = await Servicio.findOne({ categoria: req.params.categoria }).exec()

    if (servicios) {
        res.json(servicios)
    } else {
        res.status(404).json({ error: 'Categoria del servicio no encontrada' })
    }
}

const eliminarServicio = async (req, res) => {
    const servicioAEliminar = await Servicio.deleteOne({ servicioId: req.params.servicioId }).exec()

    if (!servicioAEliminar) {
        return res.status(404).json({ error: 'Servicio no encontrado' })
    } else {
        return res.status(200).json({ error: 'Servicio eliminado correctamente' })
    }
}

module.exports = {
    crearServicio,
    obtenerServicios,
    obtenerServicioPorCategoria,
    eliminarServicio
}