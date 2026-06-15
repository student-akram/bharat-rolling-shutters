import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">

        {/* LOGO — brand signal */}
        <Link
          to="/"
          className="logo"
          aria-label="Bharat Shutters & Engineering Works Home"
        >
          <img
            src="/logo.png"
            className="logo"
            alt="Bharat Shutters & Engineering Works Logo"
            width="160"
            height="48"
          />
        </Link>

        {/* DESKTOP NAV — primary crawlable links */}
        <nav className="desktop-menu" aria-label="Primary navigation">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/services" className="nav-link">
            Services
          </Link>

          <Link to="/reviewsdetail" className="nav-link">
            Projects
          </Link>

          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className={`menu-btn ${open ? "open" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE NAV — same links, never replacing desktop nav */}
      <nav
        id="mobile-navigation"
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <Link to="/" className="mobile-link" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link to="/services" className="mobile-link" onClick={() => setOpen(false)}>
          Services
        </Link>
        <Link to="/reviewsdetail" className="mobile-link" onClick={() => setOpen(false)}>
          Projects
        </Link>
        <Link to="/contact" className="mobile-link" onClick={() => setOpen(false)}>
          Contact
        </Link>
      </nav>

      {/* OVERLAY */}
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
