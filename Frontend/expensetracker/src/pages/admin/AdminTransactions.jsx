import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTransactions = async () => {
    const res = await api.get("/admin/all-transactions");
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filtered = transactions.filter((t) =>
    t.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transactions</h2>

      <input
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "15px", padding: "8px" }}
      />

      <table width="100%" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t._id}>
              <td>{t._id}</td>
              <td>{t.user?.email}</td>
              <td>{t.description}</td>
              <td style={{ color: t.amount > 0 ? "green" : "red" }}>
                {t.amount > 0 ? "+" : ""}
                {t.amount}
              </td>
              <td>{t.category}</td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransactions;