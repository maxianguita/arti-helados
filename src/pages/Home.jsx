// src/pages/Home.jsx
import { useState, useEffect } from "react";

// Components
import CustomerForm from "../components/CustomerForm";
import SizeSelector from "../components/SizeSelector.jsx";
import FlavorSelector from "../components/FlavorSelector.jsx";
import ConfirmOrder from "../components/ConfirmOrder.jsx";
import Navbar from "../components/Navbar.jsx";
import MapModal from "../components/MapModal.jsx";
import SideMenu from "../components/SideMenu.jsx";
import PanelControl from "../components/PanelControl.jsx";

// Assets
import Logo from "../assets/arti.png";

// ---- Estilos Minimalistas ---- 
const styles = {
  primaryColor: "#333",
  backgroundLight: "#fefefe",
  borderColor: "#ddd",

  appContainer: {
    backgroundColor: "#fefefe",
    minHeight: "100vh",
    color: "#333",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },

  mainContentContainer: {
    maxWidth: "450px",
    margin: "0 auto",
    padding: "20px 15px 50px 15px",
    paddingTop: "100px",
  },

  logoWrapper: {
    textAlign: "center",
    marginBottom: "30px",
  },

  logoImg: {
    width: "140px",
    height: "auto",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  },

  orderSection: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },

  sizeButton: {
    backgroundColor: "transparent",
    color: "#333",
    border: "1px solid #ddd",
    padding: "10px 15px",
    margin: "5px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.2s, border-color 0.2s",
    minWidth: "100px",
  },

  sizeButtonSelected: {
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #333",
  },
};

function Home() {
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [size, setSize] = useState(null);
  const [maxFlavors, setMaxFlavors] = useState(0);
  const [flavors, setFlavors] = useState([]);
  const [showMapModal, setShowMapModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState("Order");
  const [availableFlavors, setAvailableFlavors] = useState([]);

  // CAMBIE A PRODUCCION
 async function loadFlavors() {
  try {
    const res = await fetch("https://arti-helados-backend.vercel.app/api/flavors");
    const data = await res.json();

    setAvailableFlavors(data);
  } catch (err) {
    console.error("Error cargando sabores:", err);
  }
}


  useEffect(() => {
    loadFlavors();
  }, []);

  const handleSelectSize = (val) => {
    setSize(val);
    if (val === "1/4 kg") setMaxFlavors(2);
    else if (val === "1/2 kg") setMaxFlavors(3);
    else if (val === "1 kg") setMaxFlavors(4);
    else setMaxFlavors(0);
    setFlavors([]);
  };

  const toggleFlavor = (flavor) => {
    if (flavors.includes(flavor)) {
      setFlavors(flavors.filter((f) => f !== flavor));
    } else if (flavors.length < maxFlavors) {
      setFlavors([...flavors, flavor]);
    }
  };

  const handleNavigate = (page) => {
    if (page === "Contact") {
      setShowMapModal(true);
    } else {
      setCurrentPage(page);
    }
  };

  const getSizeButtonStyle = (currentSize) => ({
    ...styles.sizeButton,
    ...(size === currentSize ? styles.sizeButtonSelected : {}),
  });

  return (
    <div style={styles.appContainer}>
      <Navbar
        navigate={handleNavigate}
        currentPage={currentPage}
        toggleMenu={() => setMenuOpen(true)}
        openPanel={() => setShowPanel(true)}
      />

      <main style={styles.mainContentContainer}>
        <div style={styles.logoWrapper}>
          <img src={Logo} alt="Arti Helados" style={styles.logoImg} />
        </div>

        <section style={styles.orderSection}>
          <CustomerForm customer={customer} setCustomer={setCustomer} />

          {/* Tamaños */}
          <div style={{ padding: "0 10px" }}>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "800",
                marginBottom: "15px",
                borderBottom: "1px solid #eee",
                paddingBottom: "8px",
                textAlign: "center"
              }}
            >
               Selecciona el Tamaño
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "15px 0",
              }}
            >
              <button
                onClick={() => handleSelectSize("1/4 kg")}
                style={getSizeButtonStyle("1/4 kg")}
              >
                1/4 kg
              </button>
              <button
                onClick={() => handleSelectSize("1/2 kg")}
                style={getSizeButtonStyle("1/2 kg")}
              >
                1/2 kg
              </button>
              <button
                onClick={() => handleSelectSize("1 kg")}
                style={getSizeButtonStyle("1 kg")}
              >
                1 kg
              </button>
            </div>
          </div>

          {/* Sabores */}
          {size && (
            <FlavorSelector
              selected={flavors}
              toggle={toggleFlavor}
              max={maxFlavors}
              flavorsList={availableFlavors} 
            />
          )}

          {/* Confirmación */}
          {size && flavors.length === maxFlavors && (
            <ConfirmOrder customer={customer} size={size} flavors={flavors} />
          )}
        </section>
      </main>

      <MapModal
        isVisible={showMapModal}
        onClose={() => setShowMapModal(false)}
      />

      <SideMenu
        open={menuOpen}
        closeMenu={() => setMenuOpen(false)}
        openPanel={() => setShowPanel(true)}
        navigate={handleNavigate}
      />

      {showPanel && (
        <PanelControl
          onClose={() => setShowPanel(false)}
          onUpdate={loadFlavors}  
        />
      )}
    </div>
  );
}

export default Home;
