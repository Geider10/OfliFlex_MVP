const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
  reservaId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    auto: true,
  },
  servicioID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  usuarioReserva: { type: String, required: true },
  servicioReservado: { type: String, required: true },
  fechaCreacion: { type: mongoose.Schema.Types.Date, auto: true },
  estado: { type: String, enum: ["activa", "realizada"], default: "activa" },
  feedback: { type: String, required: false, default: "" },
});

const reservaModel = mongoose.model("bookings", ReservaSchema);
module.exports = {reservaModel}
