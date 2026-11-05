import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import PropTypes from "prop-types";

const navLinks = [
  ["Home", "/"],
  ["About", "/#about"],
  ["Experience", "/experience"],
  ["Projects", "/projects"],
  ["Technology", "/#skills"],
];

function Navbar({ theme, onThemeChange }) {
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
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          onClick={() =>
            onThemeChange((currentTheme) =>
              currentTheme === "dark" ? "light" : "dark",
            )
          }
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>

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

Navbar.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]).isRequired,
  onThemeChange: PropTypes.func.isRequired,
};

export default Navbar;
