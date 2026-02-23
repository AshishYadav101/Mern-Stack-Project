// const Categories = () => {
//   return (
//     <div>
//       <h1>Categories</h1>
//       <p>All categories list.</p>
//     </div>
//   );
// };

// export default Categories;





















import { useState } from "react";

const Categories = () => {
  const [form, setForm] = useState({
    name: "Salary",
    type: "income",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Category saved (demo)");
  };

  // styles
  const container = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const title = {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#3b82f6",
  };

  const formBox = {
    maxWidth: "400px",
  };

  const label = {
    display: "block",
    margin: "15px 0 5px",
    fontSize: "14px",
  };

  const input = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const radioGroup = {
    marginTop: "10px",
  };

  const buttonRow = {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
  };

  const saveBtn = {
    padding: "10px 20px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  };

  const cancelBtn = {
    padding: "10px 20px",
    background: "white",
    color: "#3b82f6",
    border: "2px solid #3b82f6",
    borderRadius: "20px",
    cursor: "pointer",
  };

  return (
    <div style={container}>
      <h2 style={title}>Edit category</h2>

      <form style={formBox} onSubmit={handleSubmit}>
        <label style={label}>Category name</label>
        <input
          style={input}
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <label style={label}>Transaction type</label>
        <div style={radioGroup}>
          <label>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={form.type === "expense"}
              onChange={handleChange}
            />
            Expense
          </label>

          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              name="type"
              value="income"
              checked={form.type === "income"}
              onChange={handleChange}
            />
            Income
          </label>
        </div>

        <div style={buttonRow}>
          <button style={saveBtn} type="submit">
            Save category
          </button>

          <button
            style={cancelBtn}
            type="button"
            onClick={() => alert("Cancelled")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Categories;
