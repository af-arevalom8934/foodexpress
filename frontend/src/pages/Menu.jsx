import { useEffect, useState } from "react";
import api from "../services/api";

function Menu({ agregarAlCarrito }) {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
    api.get("/productos")
        .then(res => setProductos(res.data))
        .catch(() => setError("No se pudo cargar el menú"));
    }, []);

    const visibles = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
    <main>
        <h2>Menú del restaurante</h2>

        <input
        className="buscador"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <div className="grid">
        {visibles.map(p => (
            <article className="card" key={p._id}>
            <h3>{p.nombre}</h3>

            <p>{p.descripcion}</p>

            <p>
                <strong>
                ${Number(p.precio).toLocaleString("es-CO")}
                </strong>
            </p>

            <p>
                Categoría: {p.categoria?.nombre || "Sin categoría"}
            </p>

            <button onClick={() => agregarAlCarrito(p)}>
                Agregar al carrito
            </button>
            </article>
        ))}
        </div>
    </main>
    );
}

export default Menu;