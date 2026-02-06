import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login"
import Dashboard from "../pages/dashboard"
import ProtectedRoute from "./ProctedRoute"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
