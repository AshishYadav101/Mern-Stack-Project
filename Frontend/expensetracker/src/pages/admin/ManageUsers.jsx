// const ManageUsers = () => {
//   return (
//     <div>
//       <h1>Users</h1>
//       <p>Manage users here.</p>
//     </div>
//   );
// };

// export default ManageUsers;









import { useReducer, useEffect } from "react";

const initialState = {
  users: [],
  search: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };

    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "TOGGLE_STATUS":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload
            ? { ...u, status: u.status === "Enabled" ? "Disabled" : "Enabled" }
            : u
        ),
      };

    default:
      return state;
  }
}

const ManageUsers = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const data = [
      {
        id: "U00003",
        name: "John Doe",
        email: "xofaxip603@giratex.com",
        expense: 7000,
        income: 15000,
        transactions: 8,
        status: "Enabled",
      },
      {
        id: "U00005",
        name: "John",
        email: "john@abc.com",
        expense: 0,
        income: 0,
        transactions: 0,
        status: "Enabled",
      },
      {
        id: "U00007",
        name: "mywork",
        email: "workm3410@gmail.com",
        expense: 1456,
        income: 5000,
        transactions: 3,
        status: "Enabled",
      },
    ];

    dispatch({ type: "SET_USERS", payload: data });
  }, []);

  const filtered = state.users.filter((u) =>
    u.email.toLowerCase().includes(state.search.toLowerCase())
  );

  // styles
  const container = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const title = {
    fontSize: "24px",
    color: "#3b82f6",
    marginBottom: "15px",
  };

  const searchBox = {
    padding: "8px",
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "15px",
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const th = {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
  };

  const td = {
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  };

  const statusStyle = {
    color: "green",
    fontWeight: "bold",
  };

  const disableBtn = {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 12px",
    borderRadius: "15px",
    cursor: "pointer",
  };

  return (
    <div style={container}>
      <h2 style={title}>Users</h2>

      <input
        style={searchBox}
        placeholder="Search transactions"
        value={state.search}
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH", payload: e.target.value })
        }
      />

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>User Id</th>
            <th style={th}>Username</th>
            <th style={th}>Email</th>
            <th style={th}>Tot. Expense (Rs.)</th>
            <th style={th}>Tot. Income (Rs.)</th>
            <th style={th}>Tot. No. Transactions</th>
            <th style={th}>Status</th>
            <th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td style={td}>{u.id}</td>
              <td style={td}>{u.name}</td>
              <td style={td}>{u.email}</td>
              <td style={td}>Rs. {u.expense}</td>
              <td style={td}>Rs. {u.income}</td>
              <td style={td}>{u.transactions}</td>
              <td style={{ ...td, ...statusStyle }}>
                {u.status}
              </td>
              <td style={td}>
                <button
                  style={disableBtn}
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_STATUS",
                      payload: u.id,
                    })
                  }
                >
                  {u.status === "Enabled" ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
