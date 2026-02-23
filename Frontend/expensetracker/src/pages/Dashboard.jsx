






import Sidebar from "../components/Sidebar";
import { useTransactions } from "../context/TransactionContext";
import { CATEGORIES } from "../constants/categories";
import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#ff6b6b", "#f6b26b", "#f1c40f", "#2ecc71", "#3498db", "#9b59b6", "#1abc9c", "#95a5a6"];

const Dashboard = () => {
  const { transactions } = useTransactions();
  const [budget, setBudget] = useState(10000);

  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;

    const categories = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else {
        expense += t.amount;
        if (categories[t.category] !== undefined) {
          categories[t.category] += t.amount;
        }
      }
    });

    const chartData = Object.keys(categories).map((key) => ({
      name: key,
      value: categories[key],
    }));

    return {
      income,
      expense,
      balance: income - expense,
      total: transactions.length,
      chartData,
    };
  }, [transactions]);

  const remaining = budget - summary.expense;
  const spentPercent = Math.min(
    (summary.expense / budget) * 100,
    100
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#0b1d33",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <h1>Dashboard</h1>

        {/* Top cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Card
            title="Income"
            value={summary.income}
            color="#3ecf8e"
          />
          <Card
            title="Expense"
            value={summary.expense}
            color="#ff6b6b"
          />
          <Card
            title="Cash in hand"
            value={summary.balance}
            color="#5a7dff"
          />
          <Card
            title="No of transactions"
            value={summary.total}
            color="#ff4db8"
          />
        </div>

        {/* Charts section */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {/* Donut chart */}
          <div
            style={{
              flex: 1,
              background: "#102842",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={summary.chartData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={100}
                >
                  {summary.chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "10px",
              }}
            >
              {summary.chartData.map((item, i) => (
                <span key={i} style={{ color: COLORS[i] }}>
                  ■ {item.name}
                </span>
              ))}
            </div>
          </div>

          {/* Budget panel */}
          <div
            style={{
              flex: 1,
              background: "#102842",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>
              Budget: {budget}{" "}
              <button
                onClick={() => {
                  const val = prompt("Enter new budget:");
                  if (val) setBudget(Number(val));
                }}
                style={{
                  marginLeft: "10px",
                  padding: "3px 8px",
                  background: "#4a78c2",
                  border: "none",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Edit
              </button>
            </h3>

            {/* progress bar */}
            <div
              style={{
                marginTop: "20px",
                height: "20px",
                background: "#1e3a5f",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  width: `${spentPercent}%`,
                  height: "100%",
                  background: "#ff6b6b",
                  borderRadius: "10px",
                }}
              />
            </div>

            <p style={{ marginTop: "15px" }}>
              Remaining: ₹ {remaining}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div
    style={{
      flex: 1,
      padding: "20px",
      background: color,
      borderRadius: "10px",
      color: "white",
    }}
  >
    <h4>{title}</h4>
    <h2>₹ {value}</h2>
  </div>
);

export default Dashboard;
