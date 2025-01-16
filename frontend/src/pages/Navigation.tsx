import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Auth";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
