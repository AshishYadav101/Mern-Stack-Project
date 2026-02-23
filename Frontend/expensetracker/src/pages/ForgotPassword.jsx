import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setMessage("Please enter your email");
      setIsError(true);
      return;
    }
    setMessage(null);
    setLoading(true);
    setIsError(false);
    try {
      const { data } = await api.post("/auth/forgot-password", { email: trimmed });
      setMessage(data.message || `Password sent successfully to ${data.email || trimmed}`);
      setIsError(false);
      setEmail("");
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong.";
      setMessage(msg);
      setIsError(true);
    } finally {
      setLoading(false);
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
          <form onSubmit={handleSubmit} className="auth-card" style={{ textAlign: "center" }}>
            <h2>Forgot password</h2>
            <p className="auth-subtitle">Recover your account</p>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
              Enter the email address registered with us. We will send a temporary password to this email.
            </p>

            {message && (
              <p
                style={{
                  padding: "10px 12px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  fontSize: "14px",
                  background: isError ? "#fef2f2" : "#f0fdf4",
                  color: isError ? "#b91c1c" : "#166534",
                }}
              >
                {message}
              </p>
            )}

            <label htmlFor="forgot-email">Email</label>
            <input
              id="forgot-email"
              ref={emailRef}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              disabled={loading}
            />

            <div className="auth-button-wrap">
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Sending…" : "Send password"}
              </button>
            </div>

            <p className="auth-meta">
              <Link to="/login">Back to Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
