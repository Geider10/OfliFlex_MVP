const {reservaModel} = require("../models/reservas");
const {userModel} = require("../models/user");
const {servicioModel} = require("../models/servicios")

const crearReserva = async (req, res) => {
  const { servicioID, usuarioId, usuarioReserva, servicioReservado, fecha} = req.body;
  if (!servicioID || !usuarioId) return res.status(400).json({ error: "Se requiere un servicio a reservar y un usuario que reserve"});
  try {
    const usuarioAEditar = await userModel.findOne({ _id: usuarioId }).exec();
    if (!usuarioAEditar) return res.status(400).json({ error: 'No se encontró al usuario' });
    // Actualizar estado del servicio a no disponible y obtener el servicio actualizado
    await servicioModel.updateOne({servicioID : servicioID}, {$set : { disponible: false }});
    // Crear reserva nueva
    const nuevaReserva = new reservaModel({ servicioID, usuarioId, usuarioReserva, servicioReservado, fecha});
    await nuevaReserva.save();        
    // Agrego la nueva reserva las citas de ambos:
    usuarioAEditar.listaReservas.push(nuevaReserva);
    // Actualizo al user en db:
    await usuarioAEditar.save();
    res.status(201).json({
      reservaId: nuevaReserva._id,
      mensaje: 'reserva creada y estado del servicio actualizado correctamente'
    });
  } catch (e) {
    res.json({error: e.message})
  }
};

const obtenerReservas = async (req, res) => {
  try {
    const reservas = await reservaModel.find({}).exec();
    res.json(reservas);
  } catch (e) {
    res.json({error: e})
  }
};

const obtenerReservasPorId = async (req, res) => {
  try {
    const reserva = await reservaModel.findOne({reservaId: req.params.reservaId}).exec();
    if (!reserva) return res.status(404).json({ error: "reservaModel no encontrada" });
    res.json(reserva);
  } catch (e) {
    res.json({error: e})
  }
};

const feedBack = async (req, res) => {
  try {
    const reservaRealizada = await reservaModel.findOne({reservaId: req.params.reservaId}).exec();

    if (!reservaRealizada) return res.status(404).json({ error: "reservaModel no encontrada" });
    const nuevoFeedback = req.body.feedback;

    reservaRealizada.feedback = nuevoFeedback;
    await reservaRealizada.save();

    res.json(reservaRealizada);
  } catch (error) {
    res.json({error: error})
  }
};

const cancelarReserva = async (req, res) => {
  try {
    const idReserva = req.params.reservaId 
    const reserva = await reservaModel.findOne({reservaId : idReserva})
    if(!reserva) return res.status(400).json({ error: "reserva not found"})
    const userRol = await userModel.findOne({_id : reserva.usuarioId})
    if(!userRol) return res.status(400).json({ error: "user not found"})
    //clen the booking of user
    const reservasFilter = userRol.listaReservas.filter(r => r.reservaId != idReserva)
    await userModel.updateOne({_id : reserva.usuarioId}, {$set: {listaReservas : reservasFilter}})
    // chage status of service && delete reserva
    await servicioModel.updateOne({servicioID : reserva.servicioID}, {$set : { disponible : true}})
    await reservaModel.deleteOne({reservaId : idReserva})
    res.json({success : 'req put for cancel booking'})
  } catch (error) {
    res.json({error: error})
  }
}

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReservasPorId,
  feedBack,
  cancelarReserva
};
