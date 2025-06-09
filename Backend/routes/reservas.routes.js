const express = require("express");
const reservaRouter = express.Router();
const reservaController = require("../controllers/reservas.controller");
const verifyToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRoleMiddleware")

reservaRouter.get("/", verifyToken,checkRole(["usuario"]), reservaController.obtenerReservas);
reservaRouter.get("/:reservaId",checkRole(["usuario"]), verifyToken, reservaController.obtenerReservasPorId);
reservaRouter.post("/", verifyToken,checkRole(["usuario"]), reservaController.crearReserva);
reservaRouter.put("/:reservaId", verifyToken,checkRole(["usuario"]), reservaController.feedBack);
reservaRouter.put('/cancel/:reservaId', verifyToken,checkRole(["usuario"]), reservaController.cancelarReserva)

module.exports = reservaRouter;
