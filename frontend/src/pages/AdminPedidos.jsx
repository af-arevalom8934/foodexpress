import { useEffect, useState } from "react";
import api from "../services/api";

const estados = [
    "Pendiente",
    "En preparación",
    "En camino",
    "Entregado",
    "Cancelado"
];

function AdminPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState("");

    async function cargar() {
    try {
        const res = await api.get("/pedidos");

        setPedidos(res.data);
        setError("");

    } catch (error) {
        setError("No se pudieron cargar los pedidos");
    }
    }

    useEffect(() => {
    cargar();
    }, []);

    async function cambiarEstado(id, estado) {
    try {
        await api.put(`/pedidos/${id}/estado`, {
        estado
        });

        cargar();

    } catch (error) {
        setError("No se pudo actualizar el estado");
    }
    }

    return (
    <main>
        <h2>Administración de pedidos</h2>

        {error && (
        <p className="error">{error}</p>
        )}

        {pedidos.length === 0 && !error && (
        <p>No hay pedidos registrados.</p>
        )}

        {pedidos.map(p => (
        <div
            className="pedido"
            key={p._id}
        >
            <p>
            <strong>Pedido:</strong> {p._id}
            </p>

            <p>
            <strong>Cliente:</strong>{" "}
            {p.cliente?.nombre}{" "}
            {p.cliente?.apellidos}
            </p>

            <p>
            <strong>Total:</strong>{" "}
            ${Number(p.total).toLocaleString("es-CO")}
            </p>

            <label>
            <strong>Estado:</strong>{" "}
            </label>

            <select
            value={p.estado}
            onChange={e =>
                cambiarEstado(
                p._id,
                e.target.value
                )
            }
            >
            {estados.map(estado => (
                <option
                key={estado}
                value={estado}
                >
                {estado}
                </option>
            ))}
            </select>
        </div>
        ))}
    </main>
    );
}

export default AdminPedidos;