import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // styles
  const layout = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#f5f7fb",
  };

  const sidebar = {
    width: "230px",
    background: "#f2f4f8",
    padding: "20px",
    borderRight: "1px solid #ddd",
  };

  const logo = {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: "30px",
  };

  const menuItem = (active) => ({
    display: "block",
    padding: "12px 15px",
    marginBottom: "10px",
    borderRadius: "6px",
    textDecoration: "none",
    color: active ? "white" : "#333",
    background: active ? "#3b82f6" : "transparent",
    fontSize: "15px",
  });

  const profile = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const avatar = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#3b82f6",
  };

  return (
    <div style={layout}>
      {/* Sidebar */}
      <aside style={sidebar}>
        <div style={logo}>MyWallet</div>

        <Link to="/admin/transactions" style={menuItem(isActive("/admin/transactions"))}>
          Transactions
        </Link>

        <Link to="/admin/users" style={menuItem(isActive("/admin/users"))}>
          Users
        </Link>

        <Link to="/admin/categories" style={menuItem(isActive("/admin/categories"))}>
          Categories
        </Link>

        <Link to="/admin/new-category" style={menuItem(isActive("/admin/new-category"))}>
          New Category
        </Link>

        <Link to="/admin/settings" style={menuItem(isActive("/admin/settings"))}>
          Settings
        </Link>

        <button
          onClick={() => {
            logout();                 // clear context
            localStorage.clear();     // clear storage
            navigate("/login");
          }}
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            border: "none",
            background: "#ef4444",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Log out
        </button>
      </aside>

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div
          style={{
            height: "70px",
            background: "white",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <div style={profile}>
            <div style={avatar}></div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                {user?.username || "Admin"}
              </div>
              <div style={{ fontSize: "12px", color: "gray" }}>
                {user?.email || "admin@email.com"}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "25px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;