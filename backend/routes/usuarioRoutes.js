const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");

router.get("/", async (req, res) => {
    try {
    const usuarios = await Usuario.find().select("-password");
    res.json(usuarios);

    } catch (error) {
    res.status(500).json({
        mensaje: "Error consultando usuarios"
    });
    }
});

router.post("/", async (req, res) => {
    try {
    const usuario = await new Usuario(req.body).save();

    const salida = usuario.toObject();
    delete salida.password;

    res.status(201).json(salida);

    } catch (error) {
    res.status(400).json({
        mensaje: "Error creando usuario",
        detalle: error.message
    });
    }
});

router.put("/:id", async (req, res) => {
    try {
    const datos = { ...req.body };

    delete datos.password;

    const usuario = await Usuario.findByIdAndUpdate(
        req.params.id,
        datos,
        { new: true }
    ).select("-password");

    if (!usuario) {
        return res.status(404).json({
        mensaje: "Usuario no encontrado"
        });
    }

    res.json(usuario);

    } catch (error) {
    res.status(400).json({
        mensaje: "Error actualizando usuario"
    });
    }
});

router.delete("/:id", async (req, res) => {
    try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
        return res.status(404).json({
        mensaje: "Usuario no encontrado"
        });
    }

    res.json({
        mensaje: "Usuario eliminado"
    });

    } catch (error) {
    res.status(400).json({
        mensaje: "Error eliminando usuario"
    });
    }
});

module.exports = router;