const express = require("express");
const router = express.Router();

const Producto = require("../models/Producto");

router.get("/", async (req, res) => {
    try {
    const { nombre, categoria, codigo } = req.query;

    const filtro = {};

    if (nombre) {
        filtro.nombre = {
        $regex: nombre,
        $options: "i"
        };
    }

    if (categoria) {
        filtro.categoria = categoria;
    }

    if (codigo) {
        filtro.codigo = codigo;
    }

    const productos = await Producto.find(filtro)
        .populate("categoria");

    res.json(productos);

    } catch (error) {
    res.status(500).json({
        mensaje: "Error consultando productos"
    });
    }
});

router.get("/:id", async (req, res) => {
    try {
    const producto = await Producto
        .findById(req.params.id)
        .populate("categoria");

    if (!producto) {
        return res.status(404).json({
        mensaje: "Producto no encontrado"
        });
    }

    res.json(producto);

    } catch (error) {
    res.status(400).json({
        mensaje: "ID inválido"
    });
    }
});

router.post("/", async (req, res) => {
    try {
    const nuevo = await new Producto(req.body).save();

    res.status(201).json(nuevo);

    } catch (error) {
    res.status(400).json({
        mensaje: "Error creando producto",
        detalle: error.message
    });
    }
});

router.put("/:id", async (req, res) => {
    try {
    const actualizado = await Producto.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
        new: true,
        runValidators: true
        }
    );

    if (!actualizado) {
        return res.status(404).json({
        mensaje: "Producto no encontrado"
        });
    }

    res.json(actualizado);

    } catch (error) {
    res.status(400).json({
        mensaje: "Error actualizando producto"
    });
    }
});

router.delete("/:id", async (req, res) => {
    try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!eliminado) {
        return res.status(404).json({
        mensaje: "Producto no encontrado"
        });
    }

    res.json({
        mensaje: "Producto eliminado"
    });

    } catch (error) {
    res.status(400).json({
        mensaje: "Error eliminando producto"
    });
    }
});

module.exports = router;