const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Cliente = require("../models/Cliente");
const Usuario = require("../models/Usuario");

router.post("/cliente/login", async (req, res) => {
    try {
    const { correo, password } = req.body;

    const cliente = await Cliente.findOne({ correo });

    if (!cliente) {
        return res.status(401).json({
        mensaje: "Credenciales inválidas"
        });
    }

    const coincide = await bcrypt.compare(
        password,
        cliente.password
    );

    if (!coincide) {
        return res.status(401).json({
        mensaje: "Credenciales inválidas"
        });
    }

    const token = jwt.sign(
        {
        id: cliente._id,
        tipo: "cliente"
        },
        process.env.JWT_SECRET,
        {
        expiresIn: "8h"
        }
    );

    res.json({
        token,
        cliente: {
        id: cliente._id,
        nombre: cliente.nombre,
        correo: cliente.correo
        }
    });

    } catch (error) {
    res.status(500).json({
        mensaje: "Error en login"
    });
    }
});

router.post("/admin/login", async (req, res) => {
    try {
    const { usuario, password } = req.body;

    const admin = await Usuario.findOne({
        usuario,
        estado: true
    });

    if (!admin) {
        return res.status(401).json({
        mensaje: "Credenciales inválidas"
        });
    }

    const coincide = await bcrypt.compare(
        password,
        admin.password
    );

    if (!coincide) {
        return res.status(401).json({
        mensaje: "Credenciales inválidas"
        });
    }

    const token = jwt.sign(
        {
        id: admin._id,
        tipo: "admin",
        rol: admin.rol
        },
        process.env.JWT_SECRET,
        {
        expiresIn: "8h"
        }
    );

    res.json({
        token,
        usuario: {
        id: admin._id,
        usuario: admin.usuario,
        rol: admin.rol
        }
    });

    } catch (error) {
    res.status(500).json({
        mensaje: "Error en login"
    });
    }
});

module.exports = router;