# FOODEXPRESS

Sistema web para gestión de pedidos de restaurante.

Proyecto desarrollado para la asignatura Ingeniería Web.

## Tecnologías

- React
- Node.js
- Express
- MongoDB
- Docker

# Base de datos FOODEXPRESS

FOODEXPRESS utiliza MongoDB mediante Mongoose.

La estructura de datos se encuentra definida mediante los modelos ubicados en:

- backend/models/Categoria.js
- backend/models/Producto.js
- backend/models/Cliente.js
- backend/models/Pedido.js
- backend/models/Usuario.js

Se incluye el script:

backend/scripts/seed.js

para crear datos de prueba correspondientes a las colecciones principales.

## Ejecución

Configurar primero `backend/.env` con una variable `MONGO_URI` válida.

Desde la carpeta backend ejecutar:

```bash
node scripts/seed.js