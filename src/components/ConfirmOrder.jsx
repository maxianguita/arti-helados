// src/components/ConfirmOrder.jsx
import React, { useMemo, useState } from "react";
// ⭐ Importar iconos de React Icons
import { FaWhatsapp, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

// Sanitizar teléfono
function sanitize(value) {
  return String(value || "").replace(/\D/g, "");
}

// ----------------------------------------------------
// 1. Estilos (Objetos JSS - Oscuro, Contraste 'Nike')
// ----------------------------------------------------
const styles = {
    section: {
        padding: "2.5rem", // Más padding
        marginBottom: "25px",
        borderRadius: "16px",
        backgroundColor: "#1a1a1a", // Fondo oscuro
        border: "1px solid #333333",
        boxShadow: "0 10px 35px rgba(0, 0, 0, 0.45)", // Sombra fuerte
        position: 'relative', // Para asegurar que el popup se muestre correctamente
    },

    sectionTitle: {
        fontSize: "1.5rem", // Título más grande
        color: "#ffffff", // Título blanco
        fontWeight: "700",
        marginBottom: "1.5rem",
        borderBottom: "2px solid #FFD700", 
        paddingBottom: "0.75rem",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
    },

    confirmBtn: {
        width: "100%",
        padding: "10px 25px", 
        fontSize: "1.3rem", 
        fontWeight: "700",
        color: "#111111", 
        backgroundColor: "#4CAF50", 
        border: "none",
        borderRadius: "10px", 
        cursor: "pointer",
        transition: "all 0.25s ease",
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px', 
        textTransform: 'uppercase',
    },

    confirmBtnHover: {
      backgroundColor: "#43A047", // Verde ligeramente más oscuro en hover
    },

    confirmBtnDisabled: {
        opacity: 0.6, // Menos opaco que antes
        cursor: "not-allowed",
        backgroundColor: "#6c757d", // Gris para deshabilitado
        color: '#ffffff', // Texto blanco en deshabilitado
    },

    popupOverlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)", // Overlay más oscuro
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    },

    popupBox: {
        background: "#1a1a1a", // Fondo oscuro para el popup
        padding: "35px", // Más padding
        borderRadius: "16px",
        textAlign: "center",
        width: "90%",
        maxWidth: "400px", // Más ancho para ser más imponente
        boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
        border: "1px solid #333333",
    },

    popupText: {
        fontSize: "1.2rem", // Texto más grande
        marginBottom: "25px", // Más margen
        color: "#ffffff", // Texto blanco
        lineHeight: "1.5",
    },
    
    popupSuccessIcon: {
        fontSize: '3.5rem', // Icono grande
        color: '#4CAF50', // Verde de éxito
        marginBottom: '20px',
    },
    popupErrorIcon: {
        fontSize: '3.5rem', // Icono grande
        color: '#e53935', // Rojo de error
        marginBottom: '20px',
    },

    popupBtn: {
        padding: "14px 25px", // Más padding
        backgroundColor: "#007bff", // Color de acción azul
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "700",
        width: "100%",
        transition: "background 0.2s ease",
        textTransform: 'uppercase',
        fontSize: '1.1rem',
    },

    popupBtnHover: {
      backgroundColor: "#0056b3", // Azul más oscuro en hover
    },

    iconSpacing: {
      marginRight: '10px',
    }
};

// ----------------------------------------------------
// 2. Componente Funcional
// ----------------------------------------------------
function ConfirmOrder({ customer, size, flavors }) { 
  const [popup, setPopup] = useState(false);
  const [sending, setSending] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false); 
  const [popupBtnHovered, setPopupBtnHovered] = useState(false); 

  const businessPhone = sanitize("5491135635555");

  const price = useMemo(() => {
    if (size === "1/4 kg") return 5000;
    if (size === "1/2 kg") return 6000;
    if (size === "1 kg") return 14000;
    return 0;
  }, [size]);

  // Mensaje a enviar con dirección incluida
  const message =
    `🍨 *Nuevo Pedido de Helado*\n\n` +
    `👤 *Cliente:* ${customer.name}\n` +
    `📞 *Teléfono:* ${sanitize(customer.phone)}\n` +
    (customer.address
      ? `🚚 *Llevar pedido a:* ${customer.address}\n`
      : "🚚 *Llevar pedido a:* Dirección no especificada\n") +
    `📦 *Tamaño:* ${size}\n` +
    `🍧 *Sabores:* ${flavors.join(", ")}\n` +
    `💵 *Precio estimado:* $${price}\n\n` +
    `¡Gracias por elegir Arti Helados! 💙🍦`;

  // URL de WhatsApp
  const waUrl = `https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`;

  // Acción al enviar pedido
  const handleConfirm = () => {
    if (sending) return;

    setSending(true);
    window.open(waUrl, "_blank");

    setTimeout(() => {
      setPopup(true);
      setSending(false);
    }, 700);
  };

  return (
    <>
      <div style={styles.section}> 
        <h2 style={styles.sectionTitle}>4. Confirmar Pedido</h2>

        <button
          style={{
            ...styles.confirmBtn,
            ...(btnHovered && !sending ? styles.confirmBtnHover : {}), 
            ...(sending ? styles.confirmBtnDisabled : {}),
          }}
          onClick={handleConfirm}
          disabled={sending}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
        >
          {sending ? (
            <>
              <FaWhatsapp style={styles.iconSpacing} /> Abriendo WhatsApp...
            </>
          ) : (
            <>
              <FaWhatsapp style={styles.iconSpacing} /> Enviar Pedido por WhatsApp
            </>
          )}
        </button>
      </div>

      {popup && (
        <div style={styles.popupOverlay} onClick={() => setPopup(false)}>
          <div style={styles.popupBox} onClick={(e) => e.stopPropagation()}>
            <FaCheckCircle style={styles.popupSuccessIcon} /> {/* Icono de éxito */}
            <p style={styles.popupText}>
              ¡Tu pedido fue generado con éxito! 🎉 
              <br />Confírmalo en WhatsApp para finalizar.
            </p>

            <button
              style={{
                ...styles.popupBtn,
                ...(popupBtnHovered ? styles.popupBtnHover : {})
              }}
              onClick={() => setPopup(false)}
              onMouseEnter={() => setPopupBtnHovered(true)}
              onMouseLeave={() => setPopupBtnHovered(false)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmOrder;