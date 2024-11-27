const express = require("express");
const reservaRouter = express.Router();
const reservaController = require("../controllers/reservas.controller");
const verifyToken = require("../middlewares/authMiddleware");

reservaRouter.get("/", verifyToken, reservaController.obtenerReservas);
reservaRouter.get("/:reservaId", verifyToken, reservaController.obtenerReservasPorId);
reservaRouter.post("/", verifyToken, reservaController.crearReserva);
reservaRouter.put("/:reservaId", verifyToken, reservaController.feedBack);
reservaRouter.put('/cancel/:reservaId', verifyToken, reservaController.cancelarReserva)

module.exports = reservaRouter;
