const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
    cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true
    },

    productos: [{
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true
    },

    cantidad: {
        type: Number,
        required: true,
        min: 1
    },

    precioUnitario: {
        type: Number,
        required: true,
        min: 0
    }
    }],

    total: {
    type: Number,
    required: true,
    min: 0
    },

    fecha: {
    type: Date,
    default: Date.now
    },

    estado: {
    type: String,
    enum: [
        "Pendiente",
        "En preparación",
        "En camino",
        "Entregado",
        "Cancelado"
    ],
    default: "Pendiente"
    }

}, { timestamps: true });

module.exports = mongoose.model("Pedido", pedidoSchema);