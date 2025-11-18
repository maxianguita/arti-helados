import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [flavors, setFlavors] = useState([]);
  const [newFlavor, setNewFlavor] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // Traer sabores
  async function loadFlavors() {
    const res = await axios.get(`${API_URL}/flavors`);
    setFlavors(res.data);
  }

  // Crear sabor
  async function createFlavor(e) {
    e.preventDefault();

    await axios.post(
      `${API_URL}/flavors`,
      { name: newFlavor },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNewFlavor("");
    loadFlavors();
  }

  // Eliminar sabor
  async function deleteFlavor(id) {
    await axios.delete(`${API_URL}/flavors/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    loadFlavors();
  }

  useEffect(() => {
    loadFlavors();
  }, []);

  return (
    <div className="admin-panel-container">

      <style jsx="true">{`
        .admin-panel-container {
          max-width: 650px;
          margin: 0 auto;
          padding: 2rem;
          background: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 14px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
        }

        .admin-title {
          font-size: 1.7rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1.6rem;
          border-bottom: 2px solid #bfbfbf;
          padding-bottom: 0.7rem;
          letter-spacing: -0.5px;
        }

        .flavor-form {
          display: flex;
          gap: 10px;
          margin-bottom: 1.5rem;
        }

        .flavor-input {
          flex: 1;
          padding: 0.8rem;
          border: 1px solid #cfcfcf;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .flavor-input:focus {
          border-color: #000;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
          outline: none;
        }

        .btn-add {
          padding: 0.8rem 1.2rem;
          background: #000;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-add:hover {
          background: #333;
        }

        .flavor-item {
          display: flex;
          justify-content: space-between;
          padding: 0.9rem 1rem;
          background: #fafafa;
          border-radius: 10px;
          border: 1px solid #e5e5e5;
          margin-bottom: 0.7rem;
          transition: all 0.25s ease;
        }

        .flavor-item:hover {
          background: #f3f3f3;
        }

        .btn-delete {
          color: #b60000;
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-delete:hover {
          text-decoration: underline;
        }
      `}</style>

      <h1 className="admin-title">Panel del Dueño — Sabores</h1>

      <form className="flavor-form" onSubmit={createFlavor}>
        <input
          className="flavor-input"
          value={newFlavor}
          onChange={(e) => setNewFlavor(e.target.value)}
          placeholder="Nuevo sabor…"
          required
        />
        <button className="btn-add" type="submit">Agregar</button>
      </form>

      <h2 style={{ marginBottom: "1rem", fontWeight: 600 }}>Lista de Sabores</h2>

      {flavors.length === 0 && <p>No hay sabores cargados.</p>}

      {flavors.map((f) => (
        <div className="flavor-item" key={f.id}>
          <span>{f.name} — {f.active ? "Activo" : "Inactivo"}</span>

          <button
            className="btn-delete"
            onClick={() => deleteFlavor(f.id)}
          >
            Eliminar
          </button>
        </div>
      ))}

    </div>
  );
}
