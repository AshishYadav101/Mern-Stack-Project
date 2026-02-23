import { NavLink, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

const Sidebar = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 20px",
    color: "white",
    textDecoration: "none",
    background: isActive ? "#4a78c2" : "transparent",
    borderRadius: "6px",
    marginBottom: "10px",
  });

  return (
    <aside className="sidebar">
      <h2>MyWallet</h2>

      <NavLink to="/dashboard" style={linkStyle} className={({isActive})=> isActive? 'active':''}>
        Dashboard
      </NavLink>

      <NavLink to="/transactions" style={linkStyle} className={({isActive})=> isActive? 'active':''}>
        Transactions History
      </NavLink>

      <NavLink to="/new-transaction" style={linkStyle} className={({isActive})=> isActive? 'active':''}>
        New Transaction
      </NavLink>

      <NavLink to="/saved" style={linkStyle} className={({isActive})=> isActive? 'active':''}>
        Saved Transactions
      </NavLink>

      <NavLink to="/statistics" style={linkStyle} className={({isActive})=> isActive? 'active':''}>
        Statistics
      </NavLink>

      <NavLink to="/settings" style={linkStyle} className={({isActive})=> isActive? 'active':''}>
        Settings
      </NavLink>

      <button onClick={() => navigate("/login")} className="logout">
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;
