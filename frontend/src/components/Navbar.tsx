import "../styles/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleBetaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const element = document.getElementById("destination-form");
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/#destination-form");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo-link">
          <h1 className="navbar-logo">Anxious Traveler</h1>
        </Link>
        <nav className="navbar-nav">
          <a href="#beta" className="navbar-link" onClick={handleBetaClick}>
            Beta
          </a>
          <Link to="/about" className="navbar-link">
            About the team
          </Link>
          <Link to="/account" className="navbar-link">
            Account
          </Link>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <HiMoon className="theme-icon" />
            ) : (
              <HiSun className="theme-icon" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
