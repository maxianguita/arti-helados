// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      // Guardar token y rol
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ⭐ Guardar SIEMPRE un nombre válido
      const name =
        res.data?.user?.name ||
        res.data?.user?.username ||
        res.data?.name ||
        res.data?.username ||
        email.split("@")[0];

      localStorage.setItem("userName", name);

      navigate("/");
    } catch (err) {
      setError("Email o contraseña incorrectos. Intenta de nuevo.");
    }
  }

  return (
    <>
      <style jsx="true">{`
        .login-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: linear-gradient(180deg, #004987 0%, #0057a7 55%, #053969ff 100%);
        }

        .login-box {
          width: 100%;
          max-width: 380px;
          background: #ffffff;
          border-radius: 16px;
          padding: 30px 20px;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        .login-title {
          margin-bottom: 25px;
          font-size: 1.8rem;
          font-weight: 800;
          color: #4c5b6b;
        }

        .login-input {
          width: 95%;
          padding: 14px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 1.1rem;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
          outline: none;
          transition: 0.3s;
        }

        .login-input:focus {
          border-color: #00b4d8;
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.3);
        }

        .login-btn {
          width: 95%;
          padding: 14px;
          margin-top: 10px;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 700;
          background: #00b4d8;
          color: white;
          cursor: pointer;
          box-shadow: 0 6px 15px rgba(0, 180, 216, 0.5);
          transition: 0.2s;
        }

        .login-btn:hover {
          transform: translateY(-1px);
          background: #009bbd;
        }

        .error-msg {
          margin-top: 20px;
          padding: 10px 15px;
          font-size: 0.95rem;
          background: #fff3f3;
          color: #d00000;
          border: 1px solid #ffc8c8;
          border-radius: 8px;
        }
      `}</style>

      <div className="login-page">
        <div className="login-box">
          <h2 className="login-title">Acceso Administrador</h2>

          <form onSubmit={handleLogin}>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="login-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="login-btn" type="submit">
              Ingresar
            </button>
          </form>

          {error && <p className="error-msg">{error}</p>}
        </div>
      </div>
    </>
  );
}
