import { Routes, Route } from "react-router-dom";
import Login from "./pages/user/login";
import Product from "./pages/user/product";
import Register from "./pages/user/register";
import Home from "./pages/user/home";
import Cart from "./pages/user/Component/Cart/Cart";
import ViewCart from "./pages/user/Component/Cart/ViewCart";
import ProductInfomation from "./pages/user/Component/Product/ProductInfomation";
function App() {
  return (
    <Routes>
      <Route path="/product" element={<Product />} />
      <Route path="/login/user" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/register/user" element={<Register />} />
      <Route path="/cart/" element={<Cart />} />
      <Route path="/viewcard/" element={<ViewCart />} />
      <Route path="/product-category/" element={<ProductInfomation />} />
    </Routes>
  );
}

export default App;
