// const NewCategory = () => {
//   return (
//     <div>
//       <h1>New Category</h1>
//       <p>Add new category here.</p>
//     </div>
//   );
// };

// export default NewCategory;





























import { useState } from "react";

const NewCategory = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("New category added (demo)");
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

  const button = {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={container}>
      <h2 style={title}>New Category</h2>

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
              onChange={handleChange}
            />
            Expense
          </label>

          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              name="type"
              value="income"
              onChange={handleChange}
            />
            Income
          </label>
        </div>

        <button style={button} type="submit">
          Save category
        </button>
      </form>
    </div>
  );
};

export default NewCategory;
