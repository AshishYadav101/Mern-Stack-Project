import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LandingNavbar from "../components/LandingNavbar";
import "../styles/landing.css";

const Landing = () => {
  const { user } = useAuth();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = "1";
      containerRef.current.style.transform = "translateY(0)";
    }
  }, []);

  const keyFeatures = [
    {
      title: "Expense & Income Tracking",
      desc: "Add, edit, and remove transactions easily.",
    },
    {
      title: "Budget Planner",
      desc: "Plan your finances and stay within limits.",
    },
    {
      title: "Visual Reports",
      desc: "Graphs and charts to understand your spending habits.",
    },
    {
      title: "Secure & Personal",
      desc: "Keep your financial data safe with secure authentication.",
    },
    {
      title: "Responsive Design",
      desc: "Use Tracky on any device — desktop, tablet, or mobile.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="landing-page"
      style={{
        opacity: 0,
        transform: "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <LandingNavbar />

      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1 className="landing-hero-title">Spend your money charily!</h1>
          <p className="landing-hero-desc">
            Keep track of your daily spendings with Tracky; visualize your expenses
            and make budgeting plans to achieve your money-saving goals.
          </p>
          {user ? (
            <Link to="/dashboard" className="landing-hero-cta">
              Dashboard
            </Link>
          ) : (
            <Link to="/register" className="landing-hero-cta">
              Get started
            </Link>
          )}
          <div className="landing-deco">
            <svg className="landing-deco-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span>Track expenses · Save smarter</span>
          </div>
        </div>
        <div className="landing-hero-visual">
          <div className="landing-hero-card-illus">
            <div className="chip" aria-hidden />
          </div>
        </div>
      </section>

      <section id="features" className="landing-section">
        <h2 className="landing-section-title">Key Features</h2>
        <div className="landing-features-grid">
          {keyFeatures.map((f) => (
            <div key={f.title} className="landing-feature-card">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="landing-section landing-about">
        <h2 className="landing-section-title">About Tracky</h2>
        <div className="landing-about-content">
          <p>
            Tracky is an intuitive expense tracker designed to help you take control of your finances. Whether you want to monitor daily spending, plan a budget, or understand where your money goes, Tracky provides the tools to manage your finances smartly and effortlessly.
          </p>
          <p>
            With Tracky, you can spend mindfully, save confidently, and make informed financial decisions — all from a clean and easy-to-use interface.
          </p>
        </div>
        <h3 className="landing-mission-title">Our Mission</h3>
        <p className="landing-mission-text">
          Tracky is built to help you spend wisely, save more, and plan for the future. By making financial management simple and visually clear, Tracky empowers you to take control of your money and achieve your financial goals.
        </p>
      </section>
    </div>
  );
};

export default Landing;
