import { Routes, Route } from "react-router-dom";
import Login from "./pages/user/login";
import Product from "./pages/user/product";
import Register from "./pages/user/register";
import Home from "./pages/user/home";

function App() {
  return (
    <Routes>
      <Route path="/product" element={<Product />} />
      <Route path="/login/user" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/register/user" element={<Register />} />
    </Routes>
  );
}

export default App;
