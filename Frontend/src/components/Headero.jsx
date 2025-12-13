import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Headero() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "#0B2A55",
        padding: "15px 25px",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          style={{
            color: "white",
            fontSize: "22px",
            fontWeight: "700",
            textDecoration: "none"
          }}
        >
          Bharat Shutters & Engineering Works
        </Link>

        {/* DESKTOP MENU */}
        <nav className="desktop-menu" style={{ display: "flex", gap: "25px" }}>
          <Link to="/" className="nav-link" style={linkStyle}>
            Home
          </Link>
          <Link to="/services" className="nav-link" style={linkStyle}>
            Services
          </Link>
          <Link to="/reviewsdetail" className="nav-link" style={linkStyle}>
            Reviews
          </Link>
          <Link to="/contact" className="nav-link">Contact</Link>

        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: "28px",
            color: "white",
            cursor: "pointer"
          }}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div
          className="mobile-menu"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0B2A55",
            padding: "15px 20px"
          }}
        >
          <Link to="/" className="mobile-link" style={mobileLinkStyle}>
            Home
          </Link>
          <Link to="/services" className="mobile-link" style={mobileLinkStyle}>
            Services
          </Link>
          <Link to="/reviewsdetail" className="mobile-link" style={mobileLinkStyle}>
            Reviews
          </Link>
          <Link to="/contact" className="mobile-link" style={mobileLinkStyle}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}

/* LINK STYLES */
const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500"
};

const mobileLinkStyle = {
  padding: "12px 0",
  color: "white",
  borderBottom: "1px solid #1F4C8F",
  textDecoration: "none",
  fontSize: "18px"
};
