// import Sidebar from "../components/Sidebar";

// const Statistics = () => {
//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <div style={{ padding: "30px", flex: 1 }}>
//         <h1>Statistics</h1>
//       </div>
//     </div>
//   );
// };

// export default Statistics;















import Sidebar from "../components/Sidebar";
import { useTransactions } from "../context/TransactionContext";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const Statistics = () => {
  const { transactions } = useTransactions();

  // group by month
  const chartData = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec",
    ];

    const data = months.map((m) => ({
      month: m,
      income: 0,
      expense: 0,
    }));

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthIndex = date.getMonth();

      if (t.type === "income") {
        data[monthIndex].income += Number(t.amount);
      } else {
        data[monthIndex].expense += Number(t.amount);
      }
    });

    return data;
  }, [transactions]);

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
        <h1>Statistics</h1>

        <div
          style={{
            marginTop: "40px",
            background: "#1b263b",
            padding: "20px",
            borderRadius: "10px",
            height: "450px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#444" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ff4d4d"
                strokeWidth={3}
                name="Expense"
              />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#00e676"
                strokeWidth={3}
                name="Income"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
