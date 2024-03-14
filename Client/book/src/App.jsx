import { Routes, Route } from "react-router-dom";
import Login from "./pages/user/login";
import Product from "./pages/user/product";
import Register from "./pages/user/sign-up";
import Home from "./pages/user/home";
import Cart from "./pages/user/Component/Cart/Cart";
import ViewCart from "./pages/user/Component/Cart/ViewCart";
import ProductInfomation from "./pages/user/Component/Product/ProductInfomation";
import UserInfo from "./pages/user/ProfileUser";
import ProductCategory from "./pages/user/Component/Category/ProductCategory";
import SellerDetail from "./pages/user/SellerDetail";
import Checkout from "./pages/user/Component/Cart/Checkout";
import OrderSuccess from "./pages/user/Component/Cart/OrderSuccess";

function App() {
  return (
    <Routes>
      <Route path="/product" element={<Product />} />
      <Route path="/login/user" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/register/user" element={<Register />} />
      <Route path="/cart/" element={<Cart />} />
      <Route path="/viewcard/" element={<ViewCart />} />
      <Route path="/product-detail/:id" element={<ProductInfomation />} />
      <Route path="/profile/user/:userId" element={<UserInfo />} />
      <Route path="/category" element={<ProductCategory />} />
      <Route path="/filter-product/:id" element={<SellerDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success/:orderId" element={<OrderSuccess />} />{" "}
    </Routes>
  );
}

export default App;
