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

// ---- Estilos ---- 
const styles = {
  appContainer: {
    backgroundColor: "#fcfcfc",
    minHeight: "100vh",
    padding: "1px 0 5rem 0",
    color: "#333",
  },
  container: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "0 15px",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  logoWrapper: {
    textAlign: "center",
    marginBottom: "25px",
    marginTop: "90px",
  },
  logoImg: {
    width: "160px",
    height: "auto",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
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

  useEffect(() => {
    fetch("http://localhost:4000/api/flavors")
      .then((res) => res.json())
      .then((data) => {
        setAvailableFlavors(data.map((f) => f.name));
      })
      .catch((err) => console.error("Error cargando sabores:", err));
  }, []);

  const handleSelectSize = (val) => {
    setSize(val);
    if (val === "1/4 kg") setMaxFlavors(2);
    if (val === "1/2 kg") setMaxFlavors(3);
    if (val === "1 kg") setMaxFlavors(4);
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

  return (
    <div style={styles.appContainer}>
      <Navbar
        navigate={handleNavigate}
        currentPage={currentPage}
        toggleMenu={() => setMenuOpen(true)}
        openPanel={() => setShowPanel(true)}
      />

      <div style={styles.container}>
        <div style={styles.logoWrapper}>
          <img src={Logo} alt="Arti Helados" style={styles.logoImg} />
        </div>

        <CustomerForm customer={customer} setCustomer={setCustomer} />

        <SizeSelector size={size} handleSelectSize={handleSelectSize} />

        {size && (
          <FlavorSelector
            selected={flavors}
            toggle={toggleFlavor}
            max={maxFlavors}
            flavorsList={availableFlavors}
          />
        )}

        {size && flavors.length === maxFlavors && (
          <ConfirmOrder customer={customer} size={size} flavors={flavors} />
        )}
      </div>

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

      {showPanel && <PanelControl onClose={() => setShowPanel(false)} />}
    </div>
  );
}

export default Home;
