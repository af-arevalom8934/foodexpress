require("dotenv").config();

const mongoose = require("mongoose");

const Categoria = require("../models/Categoria");
const Producto = require("../models/Producto");
const Cliente = require("../models/Cliente");
const Usuario = require("../models/Usuario");
const Pedido = require("../models/Pedido");

async function cargarDatos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado");

    await Pedido.deleteMany({});
    await Producto.deleteMany({});
    await Categoria.deleteMany({});
    await Cliente.deleteMany({});
    await Usuario.deleteMany({});

    const categoria = await Categoria.create({
      nombre: "Platos fuertes",
      descripcion: "Platos principales del restaurante",
      estado: true
    });

    const hamburguesa = await Producto.create({
      codigo: "P001",
      nombre: "Hamburguesa clásica",
      descripcion: "Hamburguesa con carne y queso",
      categoria: categoria._id,
      precio: 25000,
      imagen: "hamburguesa.jpg",
      disponibilidad: true,
      estado: true
    });

    const limonada = await Producto.create({
      codigo: "P002",
      nombre: "Limonada",
      descripcion: "Limonada natural",
      categoria: categoria._id,
      precio: 7000,
      imagen: "limonada.jpg",
      disponibilidad: true,
      estado: true
    });

    const cliente = await Cliente.create({
      documento: "100001",
      tipoDocumento: "CC",
      nombre: "Ana",
      apellidos: "Gómez",
      correo: "ana@email.com",
      telefono: "3000000000",
      direccion: "Bogotá",
      password: "123456"
    });

    await Usuario.create({
      usuario: "admin",
      password: "admin123",
      rol: "administrador",
      estado: true
    });

    await Pedido.create({
      cliente: cliente._id,
      productos: [
        {
          producto: hamburguesa._id,
          cantidad: 2,
          precioUnitario: 25000
        },
        {
          producto: limonada._id,
          cantidad: 1,
          precioUnitario: 7000
        }
      ],
      total: 57000,
      estado: "En preparación"
    });

    console.log("Datos de prueba creados correctamente");
    console.log("ID cliente para VITE_CLIENTE_ID:");
    console.log(cliente._id.toString());

  } catch (error) {
    console.error("Error cargando datos:", error.message);

  } finally {
    await mongoose.disconnect();
  }
}

cargarDatos();