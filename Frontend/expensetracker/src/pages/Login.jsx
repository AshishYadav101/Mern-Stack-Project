import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res?.isAdmin) {
        navigate("/admin/transactions");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth-page-wrap">
      <div className="auth-back">
        <Link to="/">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
      </div>

      <div className="auth-page">
        <div className="auth-left">
          <img
            src="https://images.unsplash.com/photo-1559526324-593bc073d938"
            alt="Finance"
          />
        </div>

        <div className="auth-right">
          <form onSubmit={handleLogin} className="auth-card">
            <h2>Login</h2>
            <p className="auth-subtitle">Welcome back to Tracky</p>

            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="auth-input"
              ref={emailRef}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <p className="auth-forgot">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>

            <div className="auth-button-wrap">
              <button type="submit" className="auth-button">
                Login
              </button>
            </div>

            <p className="auth-meta">
              New member? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
