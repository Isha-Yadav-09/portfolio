import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  ["Home", "/"],
  ["About", "/#about"],
  ["Experience", "/experience"],
  ["Projects", "/projects"],
  ["Technology", "/#skills"],
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="navbar">
        <Link className="brand" to="/" onClick={closeMenu}>
          Isha Yadav
        </Link>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {navLinks.map(([label, href]) => (
            <Link key={label} to={href} onClick={closeMenu}>
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <aside className="social-rail" aria-label="Social links">
        <a href="mailto:ishayadav1012@gmail.com" aria-label="Email">
          <i className="social-icon fa-solid fa-envelope" aria-hidden="true" />
        </a>
        <a
          href="https://github.com/Isha-Yadav-09"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <i className="social-icon fa-brands fa-github" aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <i
            className="social-icon fa-brands fa-linkedin-in"
            aria-hidden="true"
          />
        </a>
      </aside>
    </>
  );
}

export default Navbar;
