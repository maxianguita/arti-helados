// src/components/PanelControl.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { FaIceCream, FaPlus, FaTimes, FaTrashAlt, FaCog } from 'react-icons/fa';

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '10px',
  },

  modal: {
    width: '95%',
    maxWidth: '550px',
    background: '#1a1a1a',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
    position: 'relative',
    animation: 'show 0.2s ease-out',
  },

  mainTitle: {
    fontSize: '1.8rem',
    fontWeight: 800,
    marginBottom: '1.5rem',
    textAlign: 'left',
    color: '#FFD700',
    borderBottom: '3px solid #FFD700',
    paddingBottom: '10px',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  subTitle: {
    marginTop: '2rem',
    marginBottom: '1rem',
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#fff',
  },

  flavorForm: { display: 'flex', gap: '12px', marginBottom: '20px' },

  input: {
    flex: 1,
    padding: '1rem',
    border: '1px solid #555',
    borderRadius: '10px',
    background: '#2c2c2c',
    color: '#fff',
    fontSize: '1.05rem',
  },

  btnCreate: {
    padding: '0.9rem 1.2rem',
    border: 'none',
    background: '#4CAF50',
    color: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  flavorList: {
    listStyle: 'none',
    marginTop: '1rem',
    padding: 0,
    maxHeight: '350px',
    overflowY: 'auto',
    paddingRight: '10px',
  },

  flavorItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#2c2c2c',
    borderRadius: '10px',
    marginBottom: '10px',
    color: '#fff',
    border: '1px solid #333',
  },

  btnDelete: {
    background: '#e53935',
    padding: '0.6rem 0.9rem',
    borderRadius: '8px',
    color: 'white',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  }
};

export default function PanelControl({ onClose, onUpdate }) {
  const [flavors, setFlavors] = useState([]);
  const [newFlavor, setNewFlavor] = useState("");
  const token = localStorage.getItem("token");


  //CAMBIE A PRODUCCION
 async function loadFlavors() {
  const res = await axios.get(
    "https://arti-helados-backend.vercel.app/api/flavors"
  );
  setFlavors(res.data);
}

async function createFlavor(e) {
  e.preventDefault();
  if (!newFlavor.trim()) return;

  await axios.post(
    "https://arti-helados-backend.vercel.app/api/flavors",
    { name: newFlavor.trim() },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setNewFlavor("");

  loadFlavors();
  if (onUpdate) onUpdate(); // 🔥 Actualiza Home.jsx
}


 async function deleteFlavor(id) {
  if (!window.confirm("¿Eliminar sabor?")) return;

  await axios.delete(
    `https://arti-helados-backend.vercel.app/api/flavors/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  loadFlavors();
  if (onUpdate) onUpdate(); // 🔥 Notifica al padre
}

useEffect(() => {
  loadFlavors();
}, []);

  return (
    <>
      <style>{`
        @keyframes show {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button style={{ ...styles.closeBtn }} onClick={onClose}>
            <FaTimes />
          </button>

          <h1 style={styles.mainTitle}>
            <FaCog /> Panel de Administración
          </h1>

          <h2 style={styles.subTitle}>Agregar Nuevo Sabor</h2>
          <form style={styles.flavorForm} onSubmit={createFlavor}>
            <input
              style={styles.input}
              placeholder="Nombre del sabor"
              value={newFlavor}
              onChange={(e) => setNewFlavor(e.target.value)}
            />
            <button type="submit" style={styles.btnCreate}>
              <FaPlus /> Crear
            </button>
          </form>

          <h2 style={styles.subTitle}>Sabores Actuales ({flavors.length})</h2>
          <ul style={styles.flavorList}>
            {flavors.map((f) => (
              <li key={f.id} style={styles.flavorItem}>
                <FaIceCream style={{ color: "#FFD700" }} />
                {f.name}
                <button style={styles.btnDelete} onClick={() => deleteFlavor(f.id)}>
                  <FaTrashAlt /> Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
