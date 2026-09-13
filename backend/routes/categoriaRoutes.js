const express = require("express");
const router = express.Router();

const Categoria = require("../models/Categoria");

router.get("/", async (req, res) => {
    try {
    const categorias = await Categoria.find();
    res.json(categorias);
    } catch (error) {
    res.status(500).json({
        mensaje: "Error consultando categorías"
    });
    }
});

router.post("/", async (req, res) => {
    try {
    const nueva = await new Categoria(req.body).save();
    res.status(201).json(nueva);
    } catch (error) {
    res.status(400).json({
        mensaje: "Error creando categoría",
        detalle: error.message
    });
    }
});

router.put("/:id", async (req, res) => {
    try {
    const actualizada = await Categoria.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
        new: true,
        runValidators: true
        }
    );

    if (!actualizada) {
        return res.status(404).json({
        mensaje: "Categoría no encontrada"
        });
    }

    res.json(actualizada);
    } catch (error) {
    res.status(400).json({
        mensaje: "Error actualizando categoría"
    });
    }
});

router.delete("/:id", async (req, res) => {
    try {
    const eliminada = await Categoria.findByIdAndDelete(req.params.id);

    if (!eliminada) {
        return res.status(404).json({
        mensaje: "Categoría no encontrada"
        });
    }

    res.json({
        mensaje: "Categoría eliminada"
    });
    } catch (error) {
    res.status(400).json({
        mensaje: "Error eliminando categoría"
    });
    }
});

module.exports = router;