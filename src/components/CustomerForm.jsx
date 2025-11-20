// src/components/CustomerForm.jsx
import React from 'react';

// ----------------------------------------------------
// 1. Estilos (Objetos JSS - CORREGIDO: Propiedades de Borde Desglosadas)
// ----------------------------------------------------
const styles = {
    formContainer: {
        padding: '2.5rem', 
        borderRadius: '16px', 
        background: '#1a1a1a', 
        // ❌ Antes: border: '1px solid #333333',
        // ✅ AHORA: Desglosar el borde
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#333333', 
        
        boxShadow: '0 10px 35px rgba(0, 0, 0, 0.45)', 
        marginBottom: '2rem',
        transition: 'all 0.3s ease',
    },

    sectionTitle: {
        color: '#ffffff', 
        fontWeight: 700,
        fontSize: '1.5rem', 
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        textTransform: 'uppercase',
        borderBottom: '2px solid #FFD700', 
    },

    formLabel: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 600,
        color: '#ffffff', 
        fontSize: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },

    formInput: {
        width: '100%',
        padding: '1rem',
        // ❌ Antes: border: '1px solid #555555',
        // ✅ AHORA: Desglosar el borde del input para evitar conflictos con borderColor en foco
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#555555', // Propiedad base del color del borde
        
        borderRadius: '8px',
        background: '#2c2c2c', 
        color: '#ffffff', 
        transition: 'all 0.2s ease',
        marginBottom: '1.5rem',
        fontSize: '1.1rem',
    },

    formInputFocus: {
        // ✅ SÓLO CAMBIAR LAS PROPIEDADES INDIVIDUALES NECESARIAS
        borderColor: '#FFD700', // Borde de acento dorado en foco
        boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)',
        outline: 'none',
    },

    error: {
        color: '#ffcdd2', 
        fontSize: '0.95rem',
        marginTop: '-1rem', 
        marginBottom: '1.5rem',
        background: '#a50000', 
        padding: '10px 15px',
        borderRadius: '8px',
        fontWeight: 500,
    }
};

// ----------------------------------------------------
// 2. Componente Funcional (sin cambios necesarios en la lógica)
// ----------------------------------------------------
function CustomerForm({ customer, setCustomer }) {
    const [focusedField, setFocusedField] = React.useState(null); 

    const handlePhoneChange = (value) => {
        const digits = value.replace(/\D/g, "");
        setCustomer({ ...customer, phone: digits });
    };

    const isValidPhone = /^\d{8,15}$/.test(customer.phone || "");

    const getInputStyle = (fieldName) => ({
        ...styles.formInput,
        ...(focusedField === fieldName ? styles.formInputFocus : {}),
    });

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.sectionTitle}>Datos del Cliente</h2>

            {/* NOMBRE */}
            <label style={styles.formLabel}>Nombre</label>
            <input
                style={getInputStyle("name")}
                type="text"
                value={customer.name || ""}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
            />

            {/* TELEFONO */}
            <label style={styles.formLabel}>Teléfono (WhatsApp)</label>
            <input
                style={getInputStyle("phone")}
                type="tel"
                placeholder="5491122334455"
                value={customer.phone || ""}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
            />

            {/* Mensaje de Error */}
            {!isValidPhone && customer.phone?.length > 0 && (
                <p style={styles.error}>Ingresá un teléfono válido (8–15 dígitos).</p>
            )}

            {/* DIRECCIÓN */}
            <label style={styles.formLabel}>Dirección de entrega</label>
            <input
                style={getInputStyle("address")}
                type="text"
                placeholder="Ej: Calle 1234, Solano"
                value={customer.address || ""}
                onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                }
                onFocus={() => setFocusedField("address")}
                onBlur={() => setFocusedField(null)}
            />
        </div>
    );
}

export default CustomerForm;