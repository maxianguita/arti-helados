// src/components/SideMenu.jsx
import { useNavigate } from "react-router-dom";

export default function SideMenu({ open, closeMenu, openPanel, navigate }) {
    const nav = useNavigate();
    const logged = localStorage.getItem("token");

    // ⭐ CORREGIDO: ahora lee el nombre correcto
    const username = localStorage.getItem("userName");

    if (!open) return null;

    return (
        <>
            <style jsx="true">{`
                .overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 50;
                }

                .menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 75%;
                    max-width: 300px;
                    background: white;
                    padding: 20px;
                    box-shadow: 4px 0 10px rgba(0,0,0,0.2);
                    z-index: 60;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .header-user {
                    background: #eef3ff;
                    padding: 15px;
                    border-radius: 10px;
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #305080;
                    border: 1px solid #d8e0f0;
                }

                .item {
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                }

                .item:hover {
                    background: #f4f4f4;
                }

                .logout {
                    color: white;
                    background: #e53935;
                    text-align: center;
                }
            `}</style>

            <div className="overlay" onClick={closeMenu} />

            <div className="menu">

                {/* 👤 SALUDO CON NOMBRE */}
                {username && (
                    <div className="header-user">
                        👋 Hola otra vez,<br />
                        <strong>{username}</strong>
                    </div>
                )}

                <div className="item" onClick={() => { navigate("Home"); closeMenu(); }}>
                    🏠 Inicio
                </div>

                <div className="item" onClick={() => { navigate("Order"); closeMenu(); }}>
                    🛒 Hacer pedido
                </div>

                <div className="item" onClick={() => { navigate("Contact"); closeMenu(); }}>
                    📍 Contacto
                </div>

                {logged && (
                    <div className="item" onClick={() => { openPanel(); closeMenu(); }}>
                        ⚙️ Panel de control
                    </div>
                )}

                {logged && (
                    <div
                        className="item logout"
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("role");
                            localStorage.removeItem("userName");
                            nav("/login");
                            closeMenu();
                        }}
                    >
                        Cerrar sesión
                    </div>
                )}

            </div>
        </>
    );
}
