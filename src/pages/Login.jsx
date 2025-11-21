// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  //CAMBIE LINEA A PRODUCCION
  async function handleLogin(e) {
    e.preventDefault();
    try {
  const res = await axios.post(`${API_URL}/auth/login`, {
  email,
  password,
});


      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

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
          height: 100dvh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          background-color: #f0f4f8;
          background: linear-gradient(135deg, #f8fcfd 0%, #eef3f7 100%);
          overflow: hidden;
          box-sizing: border-box;
        }

        .login-box {
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          border-radius: 12px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          max-height: 90vh;
          transition: all 0.3s ease-in-out;
        }

        @media (max-width: 450px) {
          .login-box {
            padding: 30px 20px;
          }
        }

        .login-title {
          margin-bottom: 30px;
          font-family: 'Georgia', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #333333;
          letter-spacing: -0.5px;
        }

        .sesion {
          display: block;
          margin: -10px auto 25px auto;
          font-size: 1rem;
          color: #444;
          font-weight: 500;
          position: relative;
          width: fit-content;
        }

        .sesion::after {
          content: "";
          display: block;
          height: 2px;
          width: 40%;
          background: #0077B6;
          margin: 4px auto 0 auto;
          border-radius: 10px;
        }

        .login-input {
          width: 80%;
          padding: 14px 18px;
          margin-bottom: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          color: #333333;
          background-color: #fcfcfc;
          transition: border-color 0.3s, box-shadow 0.3s;
          outline: none;
        }

        .login-input::placeholder {
          color: #999;
          font-style: italic;
        }

        .login-input:focus {
          border-color: #0077B6;
          box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.2);
        }

        .login-btn {
          width: 100%;
          padding: 15px;
          margin-top: 15px;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          background: #2d2e2fff;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 119, 182, 0.3);
          transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
        }

        .login-btn:hover {
          background: #005a8a;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 119, 182, 0.4);
        }

        .error-msg {
          margin-top: 20px;
          padding: 10px 15px;
          font-size: 0.95rem;
          background: #fff0ec;
          color: #E76F51;
          border: 1px solid #f9d8cf;
          border-radius: 8px;
        }
      `}</style>

      <div className="login-page">
        <div className="login-box">
          <h2 className="login-title">Bienvenido!!</h2>
          <span className="sesion">Inicia Sesión</span>

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

export default Login;
