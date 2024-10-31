const express = require("express");
require("dotenv").config();
const cors = require("cors");
const passport = require("./auth/auth");
const userRoutes = require("./routes/user.routes");
const reservasRoutes = require("./routes/reservas.routes");
const serviciosRoutes = require("./routes/servicios.routes");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes"); // Importa las rutas de upload
const mailingRouter = require("./routes/mailing.routes")
const app = express();
const mongoose = require("mongoose");

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.set("PORT", 3000);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/reservas", reservasRoutes);
app.use("/servicios", serviciosRoutes);
app.use("/", uploadRoutes);
app.use("/sent-email", mailingRouter);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server run in port ${PORT}`));

function main() {
  mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log('connect with mongo'))
  .catch(()=> console.log('error to connection'))
}
main()

