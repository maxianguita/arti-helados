// src/components/MapModal.jsx
import React, { useEffect } from 'react'; 
import { FaTimes } from 'react-icons/fa'; // Mantendremos el icono 'X' para cerrar

const BUSINESS_ADDRESS =
  "Club 13 de Julio\nAnémona 6445, B1843 San Francisco Solano, Buenos Aires";

const GMAPS_URL =
  "https://www.google.com/maps?q=Anémona+6445,+San+Francisco+Solano,+Buenos+Aires";

// ----------------------------------------------------
// Definición de Estilos JSS - Inspiración NIKE (Oscuro/Dorado)
// ----------------------------------------------------
const styles = {
  // 1. Fondo Oscuro (Overlay)
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Muy oscuro
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  // 2. Caja del Modal (Fondo Oscuro)
  modal: {
    backgroundColor: '#1a1a1a', // Fondo Dark Gray/Black
    padding: '30px', // Más padding
    borderRadius: '16px', 
    width: '90%',
    maxWidth: '400px', 
    boxShadow: '0 15px 40px rgba(0,0,0,0.6)', 
    textAlign: 'center',
    position: 'relative',
    animation: 'popIn 0.25s ease-out',
    border: '1px solid #333333',
  },
  // 3. Título
  title: {
    fontSize: '1.8rem', 
    fontWeight: '800',
    color: '#ffffff', // Título blanco
    marginBottom: '20px',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  // 4. Botón de Cerrar (X)
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    border: 'none',
    background: 'none',
    fontSize: '1.8rem',
    color: '#ffffff', // Blanco para alto contraste
    cursor: 'pointer',
    transition: 'color 0.2s',
    padding: '5px',
  },
  closeBtnHover: {
    color: '#e53935', // Rojo sutil en hover
  },

  // 5. Dirección
  address: {
    whiteSpace: 'pre-line',
    fontSize: '1.1rem',
    color: '#ffffff', // Texto blanco
    marginBottom: '30px',
    lineHeight: 1.6,
    backgroundColor: '#2c2c2c', // Fondo de dirección oscuro
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #555555',
    fontWeight: 500,
  },
  // 6. Botón Principal (Google Maps) - Acento Dorado/Amarillo
  mapButton: {
    display: 'block',
    width: '90%',
    padding: '16px',
    marginBottom: '15px',
    backgroundColor: '#FFD700', // Dorado de acento
    color: '#111111', // Texto oscuro para contrastar
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '800', // Extra audaz
    textDecoration: 'none',
    boxShadow: '0 6px 15px rgba(255, 215, 0, 0.5)',
    transition: 'background-color 0.2s',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  mapButtonHover: {
    backgroundColor: '#e6c200',
    boxShadow: '0 4px 10px rgba(255, 215, 0, 0.7)',
  },

  // 7. Botón de Cerrar Secundario
  closeButton: {
    backgroundColor: '#2c2c2c', // Gris oscuro
    color: '#ffffff',
    border: '1px solid #555',
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s',
    textTransform: 'uppercase',
  },
  closeButtonHover: {
    backgroundColor: '#3c3c3c',
    borderColor: '#777',
  },
};

// ----------------------------------------------------
// 2. Componente Funcional (Mantiene la estructura original)
// ----------------------------------------------------
 function MapModal({ isVisible, onClose }) {
  if (!isVisible) return null; // Retorno condicional mantenido

  // Cerrar con tecla ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <>
        {/* Agregamos el CSS para la animación keyframe */}
        <style>{`
            @keyframes popIn {
                from { opacity: 0; transform: scale(0.85); }
                to { opacity: 1; transform: scale(1); }
            }
        `}</style>
        
      <div style={styles.overlay} onClick={onClose}>
        <div
          style={styles.modal}
          onClick={(e) => e.stopPropagation()} 
        >
          <button 
                style={styles.closeBtn} 
                onClick={onClose}
                onMouseEnter={(e) => (e.target.style.color = styles.closeBtnHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.closeBtn.color)}
            >
                <FaTimes />
            </button>

          <h3 style={styles.title}>📍 ENCUÉNTRANOS</h3>

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
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = styles.mapButtonHover.backgroundColor;
                e.target.style.boxShadow = styles.mapButtonHover.boxShadow;
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = styles.mapButton.backgroundColor;
                e.target.style.boxShadow = styles.mapButton.boxShadow;
            }}
          >
              VER EN GOOGLE MAPS
          </a>

          <button 
                style={styles.closeButton} 
                onClick={onClose}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = styles.closeButtonHover.backgroundColor;
                    e.target.style.borderColor = styles.closeButtonHover.borderColor;
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = styles.closeButton.backgroundColor;
                    e.target.style.borderColor = styles.closeButton.border;
                }}
            >
              CERRAR
          </button>
        </div>
      </div>
    </>
  );
}

export default MapModal;