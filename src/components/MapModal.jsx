// src/components/MapModal.jsx
import React, { useEffect } from 'react'; // <-- Importamos useEffect

const BUSINESS_ADDRESS =
  "Club 13 de Julio\nAnémona 6445, B1843 San Francisco Solano, Buenos Aires";

const GMAPS_URL =
  "https://www.google.com/maps?q=Anémona+6445,+San+Francisco+Solano,+Buenos+Aires";

// Definición de Estilos Minimalistas Inline - Inspiración ARTI HELADOS 🍦
const styles = {
  // 1. Fondo Oscuro (Overlay)
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)', // Un poco más oscuro
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  // 2. Caja del Modal
  modal: {
    backgroundColor: '#ffffff',
    padding: '15px', 
    borderRadius: '15px', 
    width: 'auto',
    maxWidth: '350px', 
    boxShadow: '0 8px 25px rgba(0,0,0,0.2)', 
    textAlign: 'center',
    position: 'relative',
    animation: 'popIn 0.25s ease-out',
  },
  // 3. Título
  title: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#4c5b6b', 
    marginBottom: '15px',
  },
  // 4. Botón de Cerrar (X)
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    border: 'none',
    background: 'none',
    fontSize: '1.8rem', // Más grande
    color: '#999',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  // Nota: `:hover` no se aplica, pero en CSS sería `color: #000`

  // 5. Dirección
  address: {
    whiteSpace: 'pre-line',
    fontSize: '1rem',
    color: '#030303ff',
    marginBottom: '25px',
    lineHeight: 1.5,
    backgroundColor: '#f9f9f9', // Fondo sutil
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  // 6. Botón Principal (Google Maps)
  mapButton: {
    display: 'block',
    width: 'auto',
    padding: '14px',
    marginBottom: '10px',
    backgroundColor: '#00b4d8', // AZUL CELESTE ARTI HELADOS
    color: '#fff',
    border: 'none',
    borderRadius: '10px', // Suave
    cursor: 'pointer',
    fontWeight: '700',
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(0, 180, 216, 0.4)', // Sombra colorida
    transition: 'background-color 0.2s',
  },
  // Nota: `:hover` no se aplica, pero en CSS sería `backgroundColor: #009bbd`

  // 7. Botón de Cerrar Secundario
  closeButton: {
    backgroundColor: '#f0f0f0',
    color: '#555',
    border: '1px solid #ccc',
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  // Nota: `:hover` no se aplica, pero en CSS sería `backgroundColor: #e5e5e5`
};

export default function MapModal({ isVisible, onClose }) {
  if (!isVisible) return null;

  // Cerrar con tecla ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.modal}
        // Detiene la propagación para que el clic dentro no cierre el modal
        onClick={(e) => e.stopPropagation()} 
      >
        <button style={styles.closeBtn} onClick={onClose}>×</button>

        <h3 style={styles.title}>📍 Encuéntranos</h3>

        <p style={styles.address}>
            {BUSINESS_ADDRESS}
            <br/>
            ¡Visítanos!
        </p>

        <a
          href={GMAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.mapButton}
        >
          Ver en Google Maps
        </a>

        <button style={styles.closeButton} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}