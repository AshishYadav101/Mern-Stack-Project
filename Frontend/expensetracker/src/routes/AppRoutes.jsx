import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/Landing";
// import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import NewTransaction from "../pages/NewTransaction";
import SavedTransactions from "../pages/SavedTransactions";
import Statistics from "../pages/Statistics";
import Settings from "../pages/Settings";
import ForgotPassword from "../pages/ForgotPassword";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminRoute from "../components/AdminRoute";
import PrivateRoute from "../components/PrivateRoute";
import AdminTransactions from "../pages/admin/AdminTransactions";
import ManageUsers from "../pages/admin/ManageUsers";
import Categories from "../pages/admin/Categories";
import NewCategory from "../pages/admin/NewCategory";
import AdminSettings from "../pages/admin/AdminSettings";





const AppRoutes = () => {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />

  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
  <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
  <Route path="/new-transaction" element={<PrivateRoute><NewTransaction /></PrivateRoute>} />
  <Route path="/saved" element={<PrivateRoute><SavedTransactions /></PrivateRoute>} />
  <Route path="/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
  <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />



  <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
  <Route path="transactions" element={<AdminTransactions />} />
  <Route path="users" element={<ManageUsers />} />
  <Route path="categories" element={<Categories />} />
  <Route path="new-category" element={<NewCategory />} />
  <Route path="settings" element={<AdminSettings />} />
</Route>

  

</Routes>


    </BrowserRouter>
  );
};

export default AppRoutes;
