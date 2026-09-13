const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clienteSchema = new mongoose.Schema({
    documento: { type: String, required: true, unique: true },
    tipoDocumento: { type: String, required: true },
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, default: "" },
    direccion: { type: String, default: "" },
    password: { type: String, required: true }
}, { timestamps: true });

clienteSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("Cliente", clienteSchema);