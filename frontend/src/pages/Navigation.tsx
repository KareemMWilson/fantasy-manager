import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Auth";
import Home from "@/pages/Home";
import ProtectedRoute from "@/components/H-O-C/ProtectedRoute";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
