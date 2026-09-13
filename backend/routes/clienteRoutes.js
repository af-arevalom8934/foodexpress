const express = require("express");
const router = express.Router();

const Cliente = require("../models/Cliente");

router.get("/", async (req, res) => {
    try {
    const clientes = await Cliente.find().select("-password");
    res.json(clientes);
    } catch (error) {
    res.status(500).json({
        mensaje: "Error consultando clientes"
    });
    }
});

router.post("/", async (req, res) => {
    try {
    const cliente = await new Cliente(req.body).save();

    const salida = cliente.toObject();
    delete salida.password;

    res.status(201).json(salida);

    } catch (error) {
    res.status(400).json({
        mensaje: "Error creando cliente",
        detalle: error.message
    });
    }
});

router.put("/:id", async (req, res) => {
    try {
    const datos = { ...req.body };

    delete datos.password;

    const cliente = await Cliente.findByIdAndUpdate(
        req.params.id,
        datos,
        { new: true }
    ).select("-password");

    if (!cliente) {
        return res.status(404).json({
        mensaje: "Cliente no encontrado"
        });
    }

    res.json(cliente);

    } catch (error) {
    res.status(400).json({
        mensaje: "Error actualizando cliente"
    });
    }
});

router.delete("/:id", async (req, res) => {
    try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);

    if (!cliente) {
        return res.status(404).json({
        mensaje: "Cliente no encontrado"
        });
    }

    res.json({
        mensaje: "Cliente eliminado"
    });

    } catch (error) {
    res.status(400).json({
        mensaje: "Error eliminando cliente"
    });
    }
});

module.exports = router;