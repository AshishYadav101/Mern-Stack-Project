




import Sidebar from "../components/Sidebar";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import { CATEGORIES } from "../constants/categories";

const NewTransaction = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const amountRef = useRef(null);

  useEffect(() => {
    amountRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      alert("Enter amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      category,
      description,
      amount: Number(amount),
      date,
    };

    addTransaction(newTransaction);
    navigate("/dashboard");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#0d1b2a",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <h1>New Transaction</h1>

        {/* Type Switch */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setType("expense")}
            style={typeBtn(type === "expense")}
          >
            Expense
          </button>
          <button
            onClick={() => setType("income")}
            style={typeBtn(type === "income")}
          >
            Income
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px", marginTop: "30px" }}
        >
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />

          <label>Amount</label>
          <input
            ref={amountRef}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />

          <div style={{ marginTop: "15px" }}>
            <button type="submit" style={saveBtn}>
              Save transaction
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              style={cancelBtn}
            >
              Cancel
            </button>
          </div>
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

const typeBtn = (active) => ({
  padding: "8px 20px",
  marginRight: "10px",
  background: active ? "#4a78c2" : "#1b263b",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
});

const saveBtn = {
  padding: "10px 20px",
  background: "#4a78c2",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

const cancelBtn = {
  padding: "10px 20px",
  background: "transparent",
  color: "white",
  border: "1px solid #4a78c2",
  borderRadius: "5px",
  cursor: "pointer",
};

export default NewTransaction;
