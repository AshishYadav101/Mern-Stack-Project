


import Sidebar from "../components/Sidebar";
import { useState, useRef, useEffect, useMemo } from "react";

const Settings = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  // profile states
  const [username, setUsername] = useState(storedUser.username || "");
  const [email] = useState(storedUser.email || "");
  const [image, setImage] = useState(storedUser.image || "");

  // password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const currentRef = useRef(null);

  // auto focus
  useEffect(() => {
    currentRef.current.focus();
  }, []);

  // password validation
  const isValid = useMemo(() => {
    return (
      newPassword.length >= 4 &&
      newPassword === confirmPassword
    );
  }, [newPassword, confirmPassword]);

  // profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!isValid && newPassword) {
      alert("Passwords do not match or too short");
      return;
    }

    const updatedUser = {
      username,
      email,
      password: newPassword || storedUser.password,
      image,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated successfully");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "40px",
          background: "#0d1b2a",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <h1>Settings</h1>

        {/* Profile section */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
            }
            alt="profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #4a78c2",
            }}
          />

          <div style={{ marginTop: "10px" }}>
            <label style={{ cursor: "pointer", color: "#4a78c2" }}>
              Change image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <h3 style={{ marginTop: "10px" }}>{username}</h3>
          <p style={{ color: "#bbb" }}>{email}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleUpdate}
          style={{
            maxWidth: "400px",
            margin: "40px auto",
          }}
        >
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />

          <label>Current Password</label>
          <input
            ref={currentRef}
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            style={inputStyle}
          />

          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            style={inputStyle}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "none",
  background: "#1b263b",
  color: "white",
};

const buttonStyle = {
  marginTop: "15px",
  padding: "10px 20px",
  background: "#4a78c2",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Settings;
