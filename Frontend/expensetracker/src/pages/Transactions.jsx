// import Sidebar from "../components/Sidebar";

// const Transactions = () => {
//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <div style={{ padding: "30px", flex: 1 }}>
//         <h1>Transactions History</h1>
//       </div>
//     </div>
//   );
// };

// export default Transactions;






import Sidebar from "../components/Sidebar";
import { useTransactions } from "../context/TransactionContext";

const Transactions = () => {
  const { transactions, deleteTransaction } = useTransactions();

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
        <h1>Transactions</h1>

        {transactions.map((t) => (
          <div
            key={t.id}
            style={{
              background: "#1b263b",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{t.category}</h3>
            <p>{t.description}</p>
            <p>₹ {t.amount}</p>

            <button onClick={() => deleteTransaction(t.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
