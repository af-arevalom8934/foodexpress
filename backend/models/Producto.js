const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, default: "" },

    categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true
    },

    precio: { type: Number, required: true, min: 0 },
    imagen: { type: String, default: "" },
    disponibilidad: { type: Boolean, default: true },
    estado: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Producto", productoSchema);