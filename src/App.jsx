// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import PanelControl from "./components/PanelControl";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/panel" element={<PanelControl />} />
      </Routes>
    </BrowserRouter>
  );
}
