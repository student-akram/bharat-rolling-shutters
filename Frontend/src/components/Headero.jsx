import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const mobileRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    // lock body scroll when menu is open
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* LOGO */}
        <Link to="/">
          <img
            src="/logo.png"
            className="logo"
            alt="Bharat Shutters & Engineering Works"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="desktop-menu" aria-label="Main navigation">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/reviewsdetail" className="nav-link">Reviews</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* HAMBURGER */}
        <button
          type="button"
          className={`menu-btn ${open ? "open" : ""}`}
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={mobileRef}
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <Link to="/" className="mobile-link" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/services" className="mobile-link" onClick={() => setOpen(false)}>Services</Link>
        <Link to="/reviewsdetail" className="mobile-link" onClick={() => setOpen(false)}>Reviews</Link>
        <Link to="/contact" className="mobile-link" onClick={() => setOpen(false)}>Contact</Link>
      </div>

      {/* OVERLAY (single outside-click handler) */}
      {open && (
        <div
          className="menu-overlay show"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
