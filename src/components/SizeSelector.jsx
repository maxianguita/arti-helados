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
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)", // Sombra más suave y profunda
  },
  // 2. Estilos del Título
  sectionTitle: {
    textAlign: "center", // <-- Corregido para centrar el texto
    fontSize: "1.4rem", // Un poco más pequeño
    color: "#030303ff", // Gris oscuro suave
    marginTop: "0",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #e5e5e5", // Separador sutil
    fontWeight: "300",
},
  // 3. Contenedor de la Cuadrícula de Tamaños
  sizeSelectorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px", // Espacio reducido
  },
  // 4. Estilo Base del Botón de Tamaño
  sizeBtnBase: {
    padding: "16px 8px", // Mayor padding vertical
    border: "1px solid #b6b1b1ff", // Borde más grueso y claro
    borderRadius: "10px",
    backgroundColor: "#f9f9f9", // Fondo casi blanco
    color: "#333",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "500",
    textAlign: "center",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.03)",
  },
  // 5. Estilo para el Botón Seleccionado (Azul Celeste de Helado)
  sizeBtnSelected: {
    backgroundColor: "#00b4d8", // Azul Celeste Vibrante
    color: "#fff",
    borderColor: "#00b4d8",
    fontWeight: "700",
    boxShadow: "0 5px 12px rgba(0, 180, 216, 0.4)", // Sombra colorida
    transform: "translateY(-2px)", // Pequeño efecto 3D
  },
  // 6. Estilo para Hover
  sizeBtnHover: {
     // Esto solo es para referencia, pero podrías usarlo con librerías CSS-in-JS que soporten :hover
  },
};

 SizeSelector({ size, handleSelectSize }) {
  const sizes = ["1/4 kg", "1/2 kg", "1 kg"];

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Elige el Tamaño ⚖️</h2>

      <div style={styles.sizeSelectorGrid}>
        {sizes.map((s) => {
          const isSelected = size === s;
          
          // Combina el estilo base y el estilo seleccionado si aplica
          const buttonStyle = {
            ...styles.sizeBtnBase,
            ...(isSelected ? styles.sizeBtnSelected : {}),
            // Los :hover y :active no se pueden aplicar con estilos inline puros
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