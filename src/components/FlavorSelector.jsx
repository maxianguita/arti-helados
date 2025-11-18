// src/components/FlavorSelector.jsx
import React from 'react';

export default function FlavorSelector({
  selected,
  toggle,
  max,
  flavorsList,
  sectionStyle, // Mantendremos esta prop para el contenedor externo si es necesaria
}) {
  
  // Evita errores si flavorsList es undefined o no es array
  if (!Array.isArray(flavorsList)) return null;

  const remaining = max - selected.length;

  return (
    <div style={sectionStyle} className="flavor-section">
      {/* --- CSS embebido (Arti Helados y Móvil) --- */}
      <style jsx="true">{`
        /* 1. Contenedor de la Sección */
        .flavor-section {
          padding: 20px;
          margin-bottom: 25px;
          border: 1px solid #080808ff;
          border-radius: 12px;
          background-color: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        /* 2. Título de la Sección */
        .flavor-section h3 {
          font-size: 1.4rem;
          color: #4c5b6b; /* Gris azulado profesional */
          margin-top: 0;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e5e5e5;
          font-weight: 600;
        }

        /* 3. Contador de Sabores */
        .flavor-count {
            text-align: center;
            margin-bottom: 20px;
            padding: 10px;
            background-color: #e8f7fb; /* Fondo con tinte celeste */
            border-radius: 8px;
            color: #4c5b6b;
            font-weight: 600;
            border: 1px solid #cce9f2;
            font-size: 1rem;
        }

        /* 4. Estilos de la Cuadrícula de Sabores (Flexible para móvil) */
        .flavor-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px; /* Menor espacio entre botones */
          margin-top: 12px;
        }
        
        /* Aseguramos que los botones ocupen espacio en la cuadrícula */
        .flavor-grid button {
            flex-grow: 1; /* Permite que los botones crezcan si es necesario */
            flex-basis: calc(33.33% - 8px); /* Intenta 3 por fila en móvil */
            min-width: 100px; /* Asegura un tamaño mínimo */
        }
        
        /* 5. Estilo Base del Botón (Sabor) */
        .flavor-btn {
          padding: 12px 8px;
          border: 1px solid #ddd;
          border-radius: 8px; /* Bordes suaves */
          background-color: #f9f9f9;
          color: #333;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          text-align: center;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          line-height: 1.2;
        }

        /* 6. Estilo de Hover y No Seleccionado */
        .flavor-btn:hover:not(.flavor-btn-selected):not(:disabled) {
            background-color: #e8f7fb; /* Fondo celeste suave al pasar */
            border-color: #00b4d8;
        }

        /* 7. Estilo del Sabor Seleccionado (Azul Celeste) */
        .flavor-btn-selected {
          background-color: #00b4d8; /* AZUL CELESTE ARTI HELADOS */
          color: #fff;
          border-color: #00b4d8;
          font-weight: 700;
          box-shadow: 0 3px 8px rgba(0, 180, 216, 0.3);
        }

        /* 8. Estilo de Deshabilitado (Max alcanzado) */
        .flavor-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background-color: #f4f4f4;
            border: 2px dashed #0c0c0cff;
            color: #999;
            box-shadow: none;
        }

      `}</style>
      
      <h3 className="section-title">Selecciona tus Sabores 🍨</h3>
      
      <p className="flavor-count">
        Elegí hasta {max} sabores. Seleccionados: {selected.length} ({remaining} restantes).
      </p>

      <div className="flavor-grid">
        {flavorsList.map((flavor) => {
          const isSelected = selected.includes(flavor);
           const isDisabled = !isSelected && selected.length >= max;

          return (
            <button
              key={flavor}
              onClick={() => toggle(flavor)}
               disabled={isDisabled}
              className={`flavor-btn ${isSelected ? 'flavor-btn-selected' : ''}`}
            >
              {flavor}
            </button>
          );
        })}
      </div>
    </div>
  );
}