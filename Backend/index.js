const express = require("express");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./routes/user.routes");
const reservasRoutes = require("./routes/reservas.routes");
const serviciosRoutes = require("./routes/servicios.routes");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes"); // Importa las rutas de upload
const mailingRouter = require("./routes/mailing.routes")
const {PORT,MONGO_URI, corsOptions,limiter} = require("./config");
const mongoose = require("mongoose");
const app = express();

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/reservas", reservasRoutes);
app.use("/servicios", serviciosRoutes);
app.use("/", uploadRoutes);
app.use("/sent-email", mailingRouter);

app.listen(PORT, () => console.log(`server run in port ${PORT}`));

function main() {
  mongoose.connect(MONGO_URI)
  .then(()=> console.log('connect with mongo'))
  .catch(()=> console.log('error to connection'))
}
main()

