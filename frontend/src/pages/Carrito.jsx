import { useState } from "react";
import api from "../services/api";

function Carrito({ carrito, setCarrito }) {
    const [mensaje, setMensaje] = useState("");

    const idCliente = import.meta.env.VITE_CLIENTE_ID;

    function cambiarCantidad(id, cambio) {
    setCarrito(actual =>
        actual
        .map(item =>
            item.producto._id === id
            ? { ...item, cantidad: item.cantidad + cambio }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
    }

    function eliminar(id) {
    setCarrito(actual =>
        actual.filter(item => item.producto._id !== id)
    );
    }

    const total = carrito.reduce(
    (suma, item) =>
      suma + item.producto.precio * item.cantidad,
    0
    );

    async function realizarPedido() {
    setMensaje("");

    if (!idCliente) {
        setMensaje("Falta VITE_CLIENTE_ID en frontend/.env");
        return;
    }

    if (carrito.length === 0) {
        setMensaje("El carrito está vacío");
        return;
    }

    const datosPedido = {
        cliente: idCliente,

        productos: carrito.map(item => ({
        producto: item.producto._id,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precio
        })),

        total
    };

    try {
        const res = await api.post("/pedidos", datosPedido);

        setMensaje(`Pedido creado: ${res.data._id}`);

        setCarrito([]);

    } catch (error) {
        setMensaje(
        error.response?.data?.detalle ||
        "No se pudo crear el pedido"
        );
    }
    }

    return (
    <main>
        <h2>Carrito</h2>

        {carrito.length === 0 && (
        <p>No hay productos en el carrito.</p>
        )}

        {carrito.map(item => (
        <div
            className="fila"
            key={item.producto._id}
        >
            <span>
            {item.producto.nombre}
            </span>

            <button
            onClick={() =>
                cambiarCantidad(item.producto._id, -1)
            }
            >
            -
            </button>

            <strong>
            {item.cantidad}
            </strong>

            <button
            onClick={() =>
                cambiarCantidad(item.producto._id, 1)
            }
            >
            +
            </button>

            <span>
            $
            {(
              item.producto.precio *
                item.cantidad
            ).toLocaleString("es-CO")}
            </span>

            <button
            onClick={() =>
                eliminar(item.producto._id)
            }
            >
            Eliminar
            </button>
        </div>
        ))}

        <h3>
        Total: ${total.toLocaleString("es-CO")}
        </h3>

        <button
        className="principal"
        onClick={realizarPedido}
        >
        Realizar pedido
        </button>

        {mensaje && <p>{mensaje}</p>}
    </main>
    );
}

export default Carrito;