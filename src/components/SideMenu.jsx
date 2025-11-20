// src/components/SideMenu.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaMapMarkerAlt, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa'; 

// ----------------------------------------------------
// 1. Estilos (Estilo 'Nike' - Alto Contraste y Dominancia Negra)
// ----------------------------------------------------
const styles = {
    overlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 50,
        transition: 'opacity 0.3s ease-in-out',
    },

    menu: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '80%',
        maxWidth: '350px',
        backgroundColor: '#111111', // Fondo Negro
        padding: '30px 0',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
    },

    headerUser: {
        padding: '20px 25px',
        marginBottom: '20px',
        borderBottom: '1px solid #333333',
        fontSize: '1rem',
        color: '#aaaaaa',
        display: 'flex', // Para alinear el icono con el texto
        alignItems: 'center',
    },

    usernameText: {
        fontSize: '1.6rem',
        fontWeight: 700,
        color: '#ffffff',
        display: 'block',
        marginTop: '4px',
        marginLeft: '5px', // Separación del icono
    },

    item: {
        padding: '18px 25px',
        fontSize: '1.2rem',
        fontWeight: 600,
        cursor: 'pointer',
        color: '#ffffff',
        transition: 'background-color 0.2s',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
    },

    itemHover: {
        backgroundColor: '#333333',
        color: '#FFD700', // Color de acento (Dorado/Amarillo)
    },

    logoutButton: {
        marginTop: '480px',
        backgroundColor: '#e53935',
        color: 'white',
        textAlign: 'center',
        fontWeight: 700,
        padding: '20px 25px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoutButtonHover: {
        backgroundColor: '#c62828',
    },

    iconStyle: {
        marginRight: '15px', // Separación del icono y el texto
        fontSize: '1.4em',   // Icono ligeramente más grande
    }
};

// ----------------------------------------------------
// 2. Componente Funcional (CORREGIDO Y CON ICONOS)
// ----------------------------------------------------
function SideMenu({ open, closeMenu, openPanel, navigate }) {
    // ⭐ ZONA DE HOOKS (DEBEN SER INCONDICIONALES Y AL PRINCIPIO)
    const nav = useNavigate();
    const [hoveredItem, setHoveredItem] = React.useState(null); 
    // -----------------------------------------------------------
    
    const logged = localStorage.getItem("token");
    const username = localStorage.getItem("userName");
    
    // Handlers
    const handleNavigation = (page, action) => {
        if (action) {
            action();
        } else {
            navigate(page);
        }
        closeMenu();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userName");
        nav("/login");
        closeMenu();
    };
    
    // ✅ RETORNO CONDICIONAL DESPUÉS DE LOS HOOKS
    if (!open) {
        return null;
    }

    return (
        <>
            <div style={styles.overlay} onClick={closeMenu} />

            <div style={styles.menu}>

                {/* 👤 SALUDO CON NOMBRE */}
                {username && (
                    <div style={styles.headerUser}>
                        <FaUser style={styles.iconStyle} />
                        <div>
                            BIENVENIDO,
                            <strong style={styles.usernameText}>{username.toUpperCase()}</strong>
                        </div>
                    </div>
                )}

                {/* --- Ítems de Navegación --- */}
                {[
                    { label: 'INICIO', page: 'Home', Icon: FaHome },
                    { label: 'PEDIDOS', page: 'Order', Icon: FaShoppingCart },
                    { label: 'CONTACTO', page: 'Contact', Icon: FaMapMarkerAlt },
                ].map((item, index) => (
                    <div 
                        key={index}
                        style={{
                            ...styles.item, 
                            ...(hoveredItem === index ? styles.itemHover : {})
                        }}
                        onClick={() => handleNavigation(item.page)}
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <item.Icon style={styles.iconStyle} />
                        {item.label}
                    </div>
                ))}
                
                {logged && (
                    <div 
                        style={{
                            ...styles.item,
                            ...(hoveredItem === 'panel' ? styles.itemHover : {})
                        }} 
                        onClick={() => handleNavigation(null, openPanel)}
                        onMouseEnter={() => setHoveredItem('panel')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <FaCog style={styles.iconStyle} />
                        PANEL DE CONTROL
                    </div>
                )}

                {/* --- Cerrar Sesión (al final) --- */}
                {logged && (
                    <div
                        style={{
                            ...styles.logoutButton,
                            ...(hoveredItem === 'logout' ? styles.logoutButtonHover : {})
                        }}
                        onClick={handleLogout}
                        onMouseEnter={() => setHoveredItem('logout')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <FaSignOutAlt style={{ marginRight: '10px' }} />
                        CERRAR SESIÓN
                    </div>
                )}
            </div>
        </>
    );
}

export default SideMenu;