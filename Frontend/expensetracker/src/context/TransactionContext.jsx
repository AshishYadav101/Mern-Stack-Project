import { createContext, useContext, useEffect, useReducer } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const TransactionContext = createContext();

const initialState = {
  transactions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t._id !== action.payload),
      };

    default:
      return state;
  }
}

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    // whenever logged-in user changes, load that user's transactions
    const fetchTx = async () => {
      try {
        const res = await api.get("/transactions");
        dispatch({ type: "SET_TRANSACTIONS", payload: res.data });
      } catch (err) {
        console.warn(
          "Could not fetch transactions",
          err?.response?.data || err.message
        );
        dispatch({ type: "SET_TRANSACTIONS", payload: [] });
      }
    };

    if (user && user.token) {
      fetchTx();
    } else {
      // no user logged in -> clear transactions
      dispatch({ type: "SET_TRANSACTIONS", payload: [] });
    }
  }, [user && user.token]);

  const addTransaction = async (transaction) => {
    try {
      const res = await api.post('/transactions', transaction);
      dispatch({ type: 'ADD_TRANSACTION', payload: res.data });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) {
      throw err;
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () =>
  useContext(TransactionContext);
