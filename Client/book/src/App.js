import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/user/login"; // Assuming the correct path to your Login component
import Product from "./pages/user/product";
import Register from "./pages/user/register";
import Home from "./pages/user/common/home";
function App() {
  return (
    <Routes>
      {" "}
      {/* Admin login route */} <Route path="/product" element={<Product />} />
      <Route path="/login/admin" element={<Login />} />{" "}
      <Route path="/" element={<Home />} />{" "}
      <Route path="/register/admin" element={<Register />} />{" "}
    </Routes>
  );
}

export default App;
