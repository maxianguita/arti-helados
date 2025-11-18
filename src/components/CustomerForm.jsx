// src/components/CustomerForm.jsx
import React from "react";

export default function CustomerForm({ customer, setCustomer }) {
  const handlePhoneChange = (value) => {
    const digits = value.replace(/\D/g, "");
    setCustomer({ ...customer, phone: digits });
  };

  const isValidPhone = /^\d{8,15}$/.test(customer.phone || "");

  return (
    <div className="section customer-form">
      <style jsx="true">{`
        .customer-form {
          padding: 1.7rem;
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid #dcdcdc;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
          margin-bottom: 2rem;
        }

        .customer-form:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
          transition: all 0.25s ease;
        }

        .customer-form .section-title {
          color: #000;
          font-weight: 700;
          font-size: 1.35rem;
          margin-bottom: 1.2rem;
          padding-bottom: 0.55rem;
          letter-spacing: -0.3px;
          text-transform: uppercase;
        }

        .customer-form .form-label {
          display: block;
          margin-bottom: 0.35rem;
          font-weight: 600;
          color: #222;
          font-size: 0.95rem;
        }

        .customer-form .form-input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #cfcfcf;
          border-radius: 8px;
          background: #fff;
          transition: all 0.2s ease;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .customer-form .form-input:focus {
          border-color: #000;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
          outline: none;
        }

        .customer-form .error {
          color: #9e1b1b;
          font-size: 0.9rem;
          margin-top: 4px;
          background: #ffe2e2;
          padding: 7px 10px;
          border-radius: 6px;
        }
      `}</style>

      <h2 className="section-title">Datos del Cliente</h2>

      {/* NOMBRE */}
      <label className="form-label">Nombre</label>
      <input
        className="form-input"
        type="text"
        value={customer.name}
        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
      />

      {/* TELEFONO */}
      <label className="form-label">Teléfono (WhatsApp)</label>
      <input
        className="form-input"
        type="tel"
        placeholder="5491122334455"
        value={customer.phone}
        onChange={(e) => handlePhoneChange(e.target.value)}
      />

      {!isValidPhone && customer.phone?.length > 0 && (
        <p className="error">Ingresá un teléfono válido (8–15 dígitos).</p>
      )}

      {/* DIRECCIÓN */}
      <label className="form-label">Dirección de entrega</label>
      <input
        className="form-input"
        type="text"
        placeholder="Ej: Calle 1234, Solano"
        value={customer.address || ""}
        onChange={(e) =>
          setCustomer({ ...customer, address: e.target.value })
        }
      />
    </div>
  );
}
