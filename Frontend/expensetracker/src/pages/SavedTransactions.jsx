
import Sidebar from "../components/Sidebar";
import { useState, useEffect, useMemo } from "react";
import { useTransactions } from "../context/TransactionContext";
import useAuth from "../hooks/useAuth";
import { CATEGORIES, DUE_TYPES } from "../constants/categories";

const SavedTransactions = () => {
  const { addTransaction } = useTransactions();
  const { user } = useAuth();
  const storageKey = user?.id
    ? `savedTransactions_${user.id}`
    : "savedTransactions_guest";

  const [saved, setSaved] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    category: CATEGORIES[0],
    description: "",
    amount: "",
    due: DUE_TYPES[0],
  });

  // load saved transactions for the current user
  useEffect(() => {
    const data = localStorage.getItem(storageKey);
    setSaved(data ? JSON.parse(data) : []);
  }, [storageKey]);

  // persist saved transactions per-user
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(saved));
  }, [saved, storageKey]);

  const totalSaved = useMemo(() => saved.length, [saved]);

  const handleConfirm = (item) => {
    const newTransaction = {
      id: Date.now(),
      type: "expense",
      category: item.category,
      description: item.description,
      amount: Number(item.amount),
      date: new Date().toISOString().split("T")[0],
    };

    addTransaction(newTransaction);
    alert("Transaction added to dashboard");
  };

  const handleAddNew = () => {
    setEditingId("new");
    setEditData({
      category: CATEGORIES[0],
      description: "",
      amount: "",
      due: DUE_TYPES[0],
    });
  };

  const handleSaveNew = () => {
    if (!editData.description?.trim()) {
      alert("Please enter a description");
      return;
    }
    const amount = Number(editData.amount);
    if (!editData.amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    const newItem = {
      id: Date.now(),
      category: editData.category,
      description: editData.description.trim(),
      amount,

      due: editData.due,
    };
    const updated = [...saved, newItem];
    setSaved(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setEditingId(null);
    setEditData({ category: CATEGORIES[0], description: "", amount: "", due: DUE_TYPES[0] });
  };

  const handleCancelNew = () => {
    setEditingId(null);
    setEditData({ category: CATEGORIES[0], description: "", amount: "", due: DUE_TYPES[0] });
  };

  // open edit form
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditData({
      category: item.category || CATEGORIES[0],
      description: item.description ?? "",
      amount: item.amount ?? "",
      due: item.due || DUE_TYPES[0],
    });
  };


  // save edited data
  const saveEdit = () => {
    const updated = saved.map((item) =>
      item.id === editingId ? { ...editData, id: editingId } : item
    );
    setSaved(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setEditingId(null);
  };

  const renderForm = (isNew = false) => (
    <>
      <label style={{ display: "block", marginBottom: "4px", color: "#aaa" }}>Category</label>
      <select
        value={editData.category}
        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
        style={inputStyle}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <label style={{ display: "block", marginBottom: "4px", color: "#aaa" }}>Description</label>
      <input
        value={editData.description}
        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
        style={inputStyle}
        placeholder="Description"
      />
      <label style={{ display: "block", marginBottom: "4px", color: "#aaa" }}>Amount</label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={editData.amount}
        onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
        style={inputStyle}
        placeholder="Amount"
      />
      <label style={{ display: "block", marginBottom: "4px", color: "#aaa" }}>Due type</label>
      <select
        value={editData.due}
        onChange={(e) => setEditData({ ...editData, due: e.target.value })}
        style={inputStyle}
      >
        {DUE_TYPES.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <div style={{ marginTop: "12px" }}>
        <button type="button" style={confirmBtn} onClick={isNew ? handleSaveNew : saveEdit}>
          Save
        </button>
        {isNew && (
          <button type="button" style={cancelBtn} onClick={handleCancelNew}>
            Cancel
          </button>
        )}
      </div>
    </>
  );

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Saved Transactions</h1>
          <button onClick={handleAddNew} style={addBtn}>
            + Add new
          </button>
        </div>

        <p style={{ marginTop: "10px", color: "#bbb" }}>
          Save your recurring transactions to quick access!
        </p>

        <div style={{ marginTop: "30px" }}>
          {editingId === "new" && (
            <div key="new-form" style={cardStyle}>
              <h3 style={{ marginTop: 0, marginBottom: "12px" }}>New saved transaction</h3>
              {renderForm(true)}
            </div>
          )}
          {saved.map((item) => (
            <div key={item.id} style={cardStyle}>
              {editingId === item.id ? (
                renderForm(false)
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3>{item.category}</h3>
                    <h3>- ₹ {item.amount}</h3>
                  </div>

                  <p style={{ color: "#bbb" }}>
                    {item.description}
                  </p>

                  <p style={{ color: "#4a78c2" }}>
                    Due: {item.due}
                  </p>

                  <div style={{ marginTop: "10px" }}>
                    <button
                      style={confirmBtn}
                      onClick={() => handleConfirm(item)}
                    >
                      Confirm
                    </button>

                    <button
                      style={editBtn}
                      onClick={() => startEdit(item)}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <p style={{ marginTop: "20px", color: "#aaa" }}>
          Total saved: {totalSaved}
        </p>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "#1b263b",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "12px",
  borderRadius: "5px",
  border: "none",
  background: "#0d1b2a",
  color: "white",
};

const addBtn = {
  padding: "8px 15px",
  background: "#4a78c2",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const confirmBtn = {
  padding: "6px 12px",
  marginRight: "8px",
  background: "#4a78c2",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const cancelBtn = {
  padding: "6px 12px",
  background: "transparent",
  color: "white",
  border: "1px solid #6b7280",
  borderRadius: "5px",
  cursor: "pointer",
};

const editBtn = {
  padding: "6px 12px",
  background: "orange",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default SavedTransactions;
