import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/landing.css";

const LandingNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="landing-nav">
      <div className="landing-nav-inner">
        <Link to="/" className="landing-logo">
          <span className="landing-logo-text">Tracky</span>
        </Link>
        <div className="landing-nav-links">
          <button type="button" onClick={() => navigate("/")} className="landing-nav-link">
            Home
          </button>
          <button type="button" onClick={() => scrollTo("features")} className="landing-nav-link">
            Features
          </button>
          <button type="button" onClick={() => scrollTo("about")} className="landing-nav-link">
            About
          </button>
          {user ? (
            <div className="landing-nav-user">
              <button
                type="button"
                className="landing-avatar-btn"
                onClick={() => setDropdownOpen((o) => !o)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span className="landing-avatar">
                  {user.username?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </button>
              {dropdownOpen && (
                <>
                  <div
                    className="landing-dropdown-backdrop"
                    onClick={() => setDropdownOpen(false)}
                    aria-hidden="true"
                  />
                  <div className="landing-dropdown">
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/dashboard");
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/settings");
                      }}
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                        navigate("/");
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="landing-nav-actions">
              <Link to="/login" className="landing-btn landing-btn-ghost">
                Login
              </Link>
              <Link to="/register" className="landing-btn landing-btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
