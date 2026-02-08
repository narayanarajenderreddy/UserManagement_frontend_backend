import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login"
import Dashboard from "../pages/dashboard"
import ProtectedRoute from "./ProctedRoute"
import Profile from "../pages/profile";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }/>       
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
