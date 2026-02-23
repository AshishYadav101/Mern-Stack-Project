// const AdminSettings = () => {
//   return (
//     <div>
//       <h1>Admin Settings</h1>
//       <p>Admin settings page.</p>
//     </div>
//   );
// };

// export default AdminSettings;



















import { useState } from "react";

const AdminSettings = () => {
  const [form, setForm] = useState({
    current: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password updated (demo)");
  };

  // styles
  const container = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const profileSection = {
    textAlign: "center",
    marginBottom: "30px",
  };

  const profileImage = {
    width: "120px",
    height: "120px",
    background: "#5b6c8f",
    borderRadius: "50%",
    margin: "0 auto",
    border: "4px solid #3b82f6",
  };

  const changeImg = {
    color: "#3b82f6",
    cursor: "pointer",
    marginTop: "8px",
  };

  const email = {
    color: "gray",
    fontSize: "14px",
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    margin: "10px 0 5px",
    fontSize: "14px",
  };

  const inputStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const buttonStyle = {
    marginTop: "15px",
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={container}>
      <h2>Settings</h2>

      <div style={profileSection}>
        <div style={profileImage}></div>
        <p style={changeImg}>Change image</p>
        <h3>Admin</h3>
        <p style={email}>admin123@gmail.com</p>
      </div>

      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>Current Password</label>
        <input
          style={inputStyle}
          type="password"
          name="current"
          value={form.current}
          onChange={handleChange}
        />

        <label style={labelStyle}>Password</label>
        <input
          style={inputStyle}
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <label style={labelStyle}>Confirm Password</label>
        <input
          style={inputStyle}
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
        />

        <button style={buttonStyle} type="submit">
          Update password
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
