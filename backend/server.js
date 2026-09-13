require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");

const app = express();

conectarDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "API FOODEXPRESS funcionando" });
});

app.use("/api/categorias", require("./routes/categoriaRoutes"));
app.use("/api/productos", require("./routes/productoRoutes"));
app.use("/api/clientes", require("./routes/clienteRoutes"));
app.use("/api/usuarios", require("./routes/usuarioRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pedidos", require("./routes/pedidoRoutes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});