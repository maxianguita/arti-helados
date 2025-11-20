// src/components/FlavorSelector.jsx
import React from 'react';
import { FaIceCream, FaCheck, FaExclamationCircle } from 'react-icons/fa';

// ----------------------------------------------------
// 1. Estilos
// ----------------------------------------------------
const styles = {
    section: {
        padding: '2.5rem',
        marginBottom: '25px',
        borderRadius: '16px',
        backgroundColor: '#1a1a1a',
        border: '1px solid #333333',
        boxShadow: '0 10px 35px rgba(0, 0, 0, 0.45)',
    },

    sectionTitle: {
        fontSize: '1.5rem',
        color: '#ffffff',
        fontWeight: '700',
        marginTop: 0,
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid #FFD700',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
    },

    flavorCount: (remaining) => ({
        textAlign: 'center',
        marginBottom: '20px',
        padding: '12px 15px',
        backgroundColor: remaining > 0 ? '#333333' : '#a50000',
        borderRadius: '10px',
        color: '#ffffff',
        fontWeight: '600',
        border: remaining > 0 ? '1px solid #555555' : '1px solid #e53935',
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),

    flavorGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        marginTop: '15px',
        justifyContent: 'center',
        maxHeight: '350px',
        overflowY: 'auto',
        paddingRight: '10px',
    },

    flavorBtn: {
        padding: '14px 10px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#555555',
        borderRadius: '10px',
        backgroundColor: '#2c2c2c',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '300',
        textTransform: 'uppercase',
        textAlign: 'center',
        transition: 'all 0.25s ease',

        width: '120px',
        minWidth: '100px',
        lineHeight: '1.2',

        whiteSpace: 'normal',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        textOverflow: 'ellipsis'
    },

    flavorBtnHover: {
        backgroundColor: '#FFD700',
        color: '#111111',
        borderColor: '#FFD700',
        boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)',
    },

    flavorBtnSelected: {
        backgroundColor: '#FFD700',
        color: '#111111',
        borderColor: '#FFD700',
        fontWeight: '800',
        boxShadow: '0 5px 15px rgba(255, 215, 0, 0.5)',
    },

   flavorBtnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    backgroundColor: '#111111',
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: '#999999',
    color: '#999999',
    boxShadow: 'none',
},


    iconSpacing: {
        marginRight: '10px',
    }
};

// ----------------------------------------------------
// 2. Componente Funcional CORREGIDO
// ----------------------------------------------------
export default function FlavorSelector({
    selected,
    toggle,
    max,
    flavorsList,
    sectionStyle,
}) {

    if (!Array.isArray(flavorsList)) return null;

    const remaining = max - selected.length;
    const [hoveredFlavor, setHoveredFlavor] = React.useState(null);

    return (
        <div style={{ ...styles.section, ...sectionStyle }}>

            {/* Título */}
            <h3 style={styles.sectionTitle}>
                <FaIceCream style={styles.iconSpacing} />
                Selecciona tus Sabores
            </h3>

            {/* Contador */}
            <p style={styles.flavorCount(remaining)}>
                {remaining === 0 ? (
                    <>
                        <FaExclamationCircle style={styles.iconSpacing} />
                        ¡Máximo de {max} sabores alcanzado!
                    </>
                ) : (
                    <>
                        <FaCheck style={styles.iconSpacing} />
                        Elegí hasta {max} sabores. ({remaining} restantes).
                    </>
                )}
            </p>

            {/* Cuadrícula */}
            <div style={styles.flavorGrid}>
                {flavorsList.map((flavorObj, index) => {
                    const flavor = flavorObj.name;

                    const isSelected = selected.includes(flavor);
                    const isDisabled = !isSelected && selected.length >= max;

                    let buttonStyle = { ...styles.flavorBtn };

                    if (isSelected) {
                        buttonStyle = { ...buttonStyle, ...styles.flavorBtnSelected };
                    } else if (isDisabled) {
                        buttonStyle = { ...buttonStyle, ...styles.flavorBtnDisabled };
                    } else if (hoveredFlavor === flavor) {
                        buttonStyle = { ...buttonStyle, ...styles.flavorBtnHover };
                    }

                    return (
                        <button
                            key={flavorObj.id ?? `${flavor}-${index}`}  // ← 🔥 key único
                            onClick={() => toggle(flavor)}
                            disabled={isDisabled}
                            style={buttonStyle}
                            onMouseEnter={() => setHoveredFlavor(flavor)}
                            onMouseLeave={() => setHoveredFlavor(null)}
                        >
                            {flavor.toUpperCase()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
