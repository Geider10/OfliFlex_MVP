const express = require("express")
require("dotenv").config();
const mailingRouter = express.Router()
const nodemailer = require("nodemailer");
const {EMAIL_ADMIN,PASSWORD_ADMIN} = require("../config")

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  auth: {
    user: EMAIL_ADMIN,
    pass: PASSWORD_ADMIN,
  },
});
const emailOptions=  (from, subject, message) => {
  const configEmail = {
    from: EMAIL_ADMIN,
    to: EMAIL_ADMIN,
    replyTo: from,
    subject:  subject,
    html: message
  }
  return configEmail
}

mailingRouter.post("/", async (req, res) => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;
    const message = `
    <h1>Hola mi nombre es ${nombre} <h1/>
    <p>Tengo este mensaje para ti, ${mensaje} <p/>`

    await transport.sendMail(emailOptions(email, asunto, message));
    res.status(200).send("Mensaje enviado");
  } catch (error) {
    console.error(error);
    res.status(500).send("Fallo al enviar el correo electrónico", error);
  }
});

module.exports = mailingRouter;