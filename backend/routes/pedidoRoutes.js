const express = require("express");
const router = express.Router();

const Pedido = require("../models/Pedido");

router.get("/", async (req, res) => {
    try {
    const filtro = {};

    if (req.query.estado) {
        filtro.estado = req.query.estado;
    }

    if (req.query.cliente) {
        filtro.cliente = req.query.cliente;
    }

    const pedidos = await Pedido.find(filtro)
        .populate("cliente", "nombre apellidos correo")
        .populate("productos.producto", "nombre codigo precio");

    res.json(pedidos);

    } catch (error) {
    res.status(500).json({
        mensaje: "Error consultando pedidos"
    });
    }
});

router.get("/:id", async (req, res) => {
    try {
    const pedido = await Pedido.findById(req.params.id)
        .populate("cliente", "nombre apellidos correo")
        .populate("productos.producto", "nombre codigo precio");

    if (!pedido) {
        return res.status(404).json({
        mensaje: "Pedido no encontrado"
        });
    }

    res.json(pedido);

    } catch (error) {
    res.status(400).json({
        mensaje: "ID inválido"
    });
    }
});

router.post("/", async (req, res) => {
    try {
    const nuevo = await new Pedido(req.body).save();

    res.status(201).json(nuevo);

    } catch (error) {
    res.status(400).json({
        mensaje: "Error creando pedido",
        detalle: error.message
    });
    }
});

router.put("/:id/estado", async (req, res) => {
    try {
    const pedido = await Pedido.findByIdAndUpdate(
        req.params.id,
        { estado: req.body.estado },
        {
        new: true,
        runValidators: true
        }
    );

    if (!pedido) {
        return res.status(404).json({
        mensaje: "Pedido no encontrado"
        });
    }

    res.json(pedido);

    } catch (error) {
    res.status(400).json({
        mensaje: "Estado inválido o error actualizando"
    });
    }
});

router.put("/:id/cancelar", async (req, res) => {
    try {
    const pedido = await Pedido.findByIdAndUpdate(
        req.params.id,
        { estado: "Cancelado" },
        { new: true }
    );

    if (!pedido) {
        return res.status(404).json({
        mensaje: "Pedido no encontrado"
        });
    }

    res.json(pedido);

    } catch (error) {
    res.status(400).json({
        mensaje: "Error cancelando pedido"
    });
    }
});

module.exports = router;