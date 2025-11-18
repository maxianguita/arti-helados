import Logo from "../assets/arti.png";

const Navbar = ({ toggleMenu }) => {
    return (
        <>
            <style jsx="true">{`
                .nav-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 10;
                    width: auto;
                    background-color: #ffffff;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                    border-bottom: 1px solid #f0f0f0;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.5rem 1.5rem; /* ← MÁS ESPACIO A LOS COSTADOS */
                }

                .arti-logo {
                    width: 60px;
                    cursor: pointer;
                }

                .menu-btn {
                    font-size: 2rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #333;
                    padding: 0.2rem 0.5rem; /* ← evita que quede pegado */
                }

                @media (min-width: 640px) {
                    .nav-container {
                        padding: 0.7rem 2rem; /* ← más margen en desktop */
                    }

                    .arti-logo {
                        width: 90px;
                    }
                }
            `}</style>

            <nav className="nav-container">
                <img src={Logo} className="arti-logo" alt="Arti" />

                <button className="menu-btn" onClick={toggleMenu}>
                    ☰
                </button>
            </nav>
        </>
    );
};

export default Navbar;
