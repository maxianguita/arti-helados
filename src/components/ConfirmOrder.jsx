// src/components/ConfirmOrder.jsx
import React, { useMemo, useState } from "react";

// Sanitizar teléfono
function sanitize(value) {
  return String(value || "").replace(/\D/g, "");
}

// 🎨 Estilos Minimalistas Premium
const styles = {
  section: {
    padding: "20px",
    marginBottom: "25px",
    border: "1px solid #f1f1f1",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },

  sectionTitle: {
    fontSize: "1.15rem",
    color: "#2f3a4a",
    fontWeight: "600",
    marginBottom: "18px",
    borderBottom: "1px solid #e4e4e4",
    paddingBottom: "6px",
    letterSpacing: "0.2px",
  },

  confirmBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#1fb45c",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  confirmBtnDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },

  popupOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  popupBox: {
    background: "white",
    padding: "28px",
    borderRadius: "14px",
    textAlign: "center",
    width: "85%",
    maxWidth: "320px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
  },

  popupText: {
    fontSize: "1rem",
    marginBottom: "18px",
    color: "#333",
    lineHeight: "1.45",
  },

  popupBtn: {
    padding: "12px 20px",
    backgroundColor: "#00b4d8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%",
    transition: "background 0.2s ease",
  },
};

export default function ConfirmOrder({ customer, size, flavors, sectionStyle }) {
  const [popup, setPopup] = useState(false);
  const [sending, setSending] = useState(false);

  const businessPhone = sanitize("5491135635555");

  // Precio según tamaño
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
      <div style={sectionStyle || styles.section}>
        <h2 style={styles.sectionTitle}>4. Confirmar Pedido</h2>

        <button
          style={{
            ...styles.confirmBtn,
            ...(sending ? styles.confirmBtnDisabled : {}),
          }}
          onClick={handleConfirm}
          disabled={sending}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#19994e")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#1fb45c")}
        >
          {sending ? "Abriendo WhatsApp..." : "Enviar Pedido por WhatsApp"}
        </button>
      </div>

      {popup && (
        <div style={styles.popupOverlay} onClick={() => setPopup(false)}>
          <div style={styles.popupBox} onClick={(e) => e.stopPropagation()}>
            <p style={styles.popupText}>
              ¡Tu pedido fue generado con éxito! 🎉🍦  
              <br />Confirmalo en WhatsApp para finalizar.
            </p>

            <button
              style={styles.popupBtn}
              onClick={() => setPopup(false)}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0091b0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#00b4d8")}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}
