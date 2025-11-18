// src/components/PanelControl.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function PanelControl({ onClose }) {
  const [flavors, setFlavors] = useState([]);
  const [newFlavor, setNewFlavor] = useState("");

  // NOTA: Es importante manejar el estado de carga y errores en un entorno real.
  const token = localStorage.getItem("token");

  async function getFlavors() {
    try {
      const res = await axios.get("http://localhost:4000/api/flavors");
      setFlavors(res.data);
    } catch (error) {
      console.error("Error al obtener sabores:", error);
    }
  }

  async function createFlavor(e) {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:4000/api/flavors",
        { name: newFlavor },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewFlavor("");
      getFlavors();
    } catch (error) {
      console.error("Error al crear sabor:", error);
    }
  }

  async function deleteFlavor(id) {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este sabor?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:4000/api/flavors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getFlavors();
    } catch (error) {
      console.error("Error al eliminar sabor:", error);
    }
  }

  useEffect(() => {
    getFlavors();
  }, []);

  return (
    <>
      <style jsx="true">{`
        /* FONDO OSCURO */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7); /* Ligeramente más oscuro */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 10px;
        }

        /* CONTENEDOR DEL MODAL - MÓVIL */
        .modal {
          width: 95%; /* Ocupa más espacio en móvil */
          max-width: 500px; /* Reducimos el max-width para móvil */
          background: #ffffff;
          padding: 20px;
          border-radius: 16px; /* Bordes muy suaves */
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          animation: show 0.2s ease-out;
          position: relative;
        }

        @keyframes show {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        /* BOTÓN CERRAR */
        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 1.8rem;
          font-weight: 300;
          background: none;
          border: none;
          cursor: pointer;
          color: #4c5b6b;
          transition: color 0.2s;
        }
        .close-btn:hover {
          color: #000;
        }

        /* TÍTULOS */
        h1 {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #00b4d8; /* Color de marca principal */
          border-bottom: 2px solid #e0f2f7;
          padding-bottom: 8px;
        }

        h2 {
          margin-top: 1.5rem;
          margin-bottom: 0.8rem;
          font-size: 1.2rem;
          font-weight: 600;
          color: #4c5b6b;
        }

        /* FORMULARIO DE CREACIÓN */
        .flavor-form {
          display: flex;
          gap: 8px;
        }

        input[type="text"] {
          flex: 1;
          padding: 0.9rem;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        input[type="text"]:focus {
          border-color: #00b4d8;
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.3);
          outline: none;
        }

        /* BOTÓN DE CREAR */
        .btn-create {
          padding: 0.9rem 1.2rem;
          border: none;
          background: #00b4d8; /* Azul Celeste Arti Helados */
          color: white;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          transition: background-color 0.2s;
        }
        .btn-create:hover {
          background: #009bbd;
        }

        /* LISTA DE SABORES */
        ul {
          list-style: none;
          margin-top: 1rem;
          padding: 0;
          max-height: 300px; /* Limitar altura para scroll en móvil */
          overflow-y: auto;
        }

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem;
          background: #fcfdfe; /* Fondo muy claro */
          border-radius: 10px;
          border: 1px solid #e0f2f7; /* Borde celeste muy sutil */
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }

        /* BOTÓN DE ELIMINAR */
        .btn-delete {
          background: #d00000;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: background-color 0.2s;
          color:white;
        }
        .btn-delete:hover {
          background: #a80000;
        }
      `}</style>

      <div className="overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          
          <button className="close-btn" onClick={onClose}>×</button>

          <h1>Panel de Sabores 🍦</h1>

          <h2>Agregar Nuevo Sabor</h2>
          <form className="flavor-form" onSubmit={createFlavor}>
            <input
              type="text"
              placeholder="Nombre del sabor"
              value={newFlavor}
              onChange={(e) => setNewFlavor(e.target.value)}
              required
            />
            <button type="submit" className="btn-create">Crear</button>
          </form>

          <h2>Sabores Actuales ({flavors.length})</h2>
          <ul>
            {flavors.map((f) => (
              <li key={f.id}>
                {f.name}
                <button
                  className="btn-delete"
                  onClick={() => deleteFlavor(f.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </>
  );
}