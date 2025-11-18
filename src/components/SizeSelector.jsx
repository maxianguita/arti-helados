// src/components/SizeSelector.jsx

// Definición de Estilos Minimalistas Inline - Inspiración ARTI HELADOS 🍦
const styles = {
  // 1. Estilos del Contenedor Principal (Tarjeta)
  section: {
    padding: "20px",
    marginBottom: "25px",
    border: "1px solid #f0f0f0", // Borde muy suave
    borderRadius: "12px", // Esquinas más redondeadas
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)", // Sombra suave
  },

  // 2. Estilos del Título
  sectionTitle: {
    textAlign: "center",
    fontSize: "1.4rem",
    color: "#030303ff",
    marginTop: "0",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #e5e5e5",
    fontWeight: "300",
  },

  // 3. Contenedor de la Cuadrícula de Tamaños
  sizeSelectorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },

  // 4. Estilo Base del Botón
  sizeBtnBase: {
    padding: "16px 8px",
    border: "1px solid #b6b1b1ff",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    color: "#333",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "500",
    textAlign: "center",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.03)",
  },

  // 5. Estilo para el Botón Seleccionado
  sizeBtnSelected: {
    backgroundColor: "#00b4d8",
    color: "#fff",
    borderColor: "#00b4d8",
    fontWeight: "700",
    boxShadow: "0 5px 12px rgba(0, 180, 216, 0.4)",
    transform: "translateY(-2px)",
  },
};

// ⭐⭐⭐ ESTE ERA EL ERROR (FALTABA "function")
function SizeSelector({ size, handleSelectSize }) {
  const sizes = ["1/4 kg", "1/2 kg", "1 kg"];

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Elige el Tamaño ⚖️</h2>

      <div style={styles.sizeSelectorGrid}>
        {sizes.map((s) => {
          const isSelected = size === s;

          const buttonStyle = {
            ...styles.sizeBtnBase,
            ...(isSelected ? styles.sizeBtnSelected : {}),
          };

          return (
            <button
              key={s}
              style={buttonStyle}
              onClick={() => handleSelectSize(s)}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SizeSelector;
