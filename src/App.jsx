import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Products from "./pages/Products";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoutes";
import About from "./pages/About";


function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />

      <Routes>
         <Route
          path="/"
          element={<Products searchTerm={searchTerm} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
      </Routes>

    </>
  );
}

export default App;