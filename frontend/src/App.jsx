import { useState } from "react";

import Menu from "./pages/Menu";
import Carrito from "./pages/Carrito";
import AdminPedidos from "./pages/AdminPedidos";

import "./index.css";

function App() {
  const [vista, setVista] = useState("menu");
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto) {
    setCarrito(actual => {
      const existe = actual.find(
        item => item.producto._id === producto._id
      );

      if (existe) {
        return actual.map(item =>
          item.producto._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...actual,
        {
          producto,
          cantidad: 1
        }
      ];
    });
  }

  const unidades = carrito.reduce(
    (suma, item) => suma + item.cantidad,
    0
  );

  return (
    <div className="app">

      <header>
        <h1>FOODEXPRESS</h1>

        <nav>
          <button onClick={() => setVista("menu")}>
            Menú
          </button>

          <button onClick={() => setVista("carrito")}>
            Carrito ({unidades})
          </button>

          <button onClick={() => setVista("admin")}>
            Pedidos Admin
          </button>
        </nav>
      </header>

      {vista === "menu" && (
        <Menu agregarAlCarrito={agregarAlCarrito} />
      )}

      {vista === "carrito" && (
        <Carrito
          carrito={carrito}
          setCarrito={setCarrito}
        />
      )}

      {vista === "admin" && (
        <AdminPedidos />
      )}

    </div>
  );
}

export default App;