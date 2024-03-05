import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import BgI from "../../../../assets/images/dragon.jpg";
import {
  addMultipleToCart,
  updateQuantity,
} from "../../../../redux/actions/cartActions";

export default function ProductInformation() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quantityErrors, setQuantityErrors] = useState({});
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { id } = useParams();
  const [maxQuantity, setMaxQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/product/${id}`
        );
        const fetchedProduct = response.data.result[0];
        setProduct(fetchedProduct);
        setMaxQuantity(fetchedProduct.quantity); // Assuming the API response includes quantity information
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      const selectedQuantity = Math.min(quantity, maxQuantity);
      if (selectedQuantity <= 0) {
        console.error("Invalid quantity selected!");
        return;
      }

      try {
        // Dispatch the action to add the product to the cart
        await dispatch(
          addMultipleToCart([
            {
              ...product,
              quantity: selectedQuantity,
            },
          ])
        );

        // Update the product quantity in the front-end
        setProduct((prevProduct) => ({
          ...prevProduct,
          quantity: prevProduct.quantity - selectedQuantity,
        }));

        // Update the maximum quantity to the newly calculated value
        setMaxQuantity((prevMaxQuantity) => prevMaxQuantity - selectedQuantity);

        // Reset the quantity input
        setQuantity(1);

        // Show success toast
        toast.success(
          `Thêm ${selectedQuantity} sản phẩm vào giỏ hàng thành công!`
        );
      } catch (error) {
        // Handle errors
        console.error("Error adding product to cart:", error);
        toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      }
    }
  };

  const handleAddToCartAndProceed = () => {
    handleAddToCart();
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      navigate("/login/user");
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <section className="product-info w-[1280px] h-auto bg-textbg m-auto">
        {product && (
          <div
            className="flex w-full h-auto bg-white px-4 pt-4 pb-6"
            key={product.id}
          >
            <div className="w-[484px] h-auto flex flex-col">
              <div className="flex">
                <div>
                  <img
                    src={BgI}
                    className="max-w-[76px] max-h-[76px] mt-1.5"
                    alt="Product thumbnail"
                  />
                  <img
                    src={BgI}
                    className="max-w-[76px] max-h-[76px] mt-1.5"
                    alt="Product thumbnail"
                  />
                  <img
                    src={BgI}
                    className="max-w-[76px] max-h-[76px] mt-1.5"
                    alt="Product thumbnail"
                  />
                  <img
                    src={BgI}
                    className="max-w-[76px] max-h-[76px] mt-1.5"
                    alt="Product thumbnail"
                  />
                </div>
                <div className="px-1.5 py-1.5">
                  <img
                    src={`http://localhost:4000/uploads/${product.image}`}
                    className="max-w-[392px] w-[400px] max-h-[100%] h-auto"
                    alt="Product"
                  />
                </div>
              </div>
              <div className="flex mt-6 px-4">
                <div className="flex h-11 w-[220px] bg-white justify-center border-[2px] border-textred rounded-[8px] cursor-pointer">
                  <button
                    className="flex justify-center items-center"
                    onClick={handleAddToCart}
                  >
                    <i className="fa-solid fa-cart-shopping pl-[10px] text-textred text-[1.1em] font-[700] "></i>
                    <span className="pl-[10px] text-textred text-[1.1em] font-[700]">
                      Thêm vào giỏ hàng
                    </span>
                  </button>
                </div>
                <div className="flex h-11 w-[220px] bg-textred ml-2.5 items-center justify-center border-[2px] border-none rounded-[8px] cursor-pointer">
                  <button
                    className="pl-[10px] text-white text-[1.1em] font-[700] "
                    onClick={handleAddToCartAndProceed}
                  >
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[calc(100%-484px)] pl-9">
              <div className="flex flex-col">
                <h1 className="text-[1.7em] font-[600] text-textBlack leading-6 pb-4 break-words">
                  {product.name}
                </h1>
                <div className="max-w-[100px] w-full h-[3px] bg-textGray"></div>
                <div className="flex items-center mt-4 pt-2 pb-4">
                  <span className="text-textred text-[32px] leading-[32px] font-[700]">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="font-[400] text-[1em] pb-2">
                  {product.description}
                </p>
                <div className="flex h-[32px]">
                  <label
                    htmlFor="qty"
                    className="max-w-[200px] min-w-[150px] font-[650] text-[1.2em] pr-2 text-left"
                  >
                    Số lượng
                  </label>
                  <div className="flex max-w-[140px]">
                    <div className="flex items-center">
                      <div className="relative flex items-center bg-them-gray px-1 h-[60px] py-1 w-[150px] rounded-xl">
                        <label className="w-full text-center px-3 py-2 text-[14px]">
                          {quantity}
                        </label>
                        <div className="absolute top-1/2 left-[10px] transform -translate-y-1/2 text-[14px] bg-white  rounded">
                          <button
                            className={`relative w-full rounded-[50px] p-[12px] flex justify-center items-center gap-2 text-[16px] font-[400] hover:text-text2222 transition ${
                              product.status === "Hết hàng"
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={handleDecreaseQuantity}
                            disabled={product.status === "Hết hàng"}
                          >
                            <i className="fa-solid fa-minus text-theme-color"></i>
                          </button>
                        </div>
                        <div className="absolute right-[10px] top-1/2 transform -translate-y-1/2 text-[14px] bg-white  rounded ">
                          <button
                            className={`relative w-full rounded-[50px] p-[12px] flex justify-center items-center gap-2 text-[16px] font-[400] hover:text-text2222 transition ${
                              product.status === "Hết hàng"
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={handleIncreaseQuantity}
                            disabled={product.status === "Hết hàng"}
                          >
                            <i className="fa-solid fa-plus text-theme-color"></i>
                          </button>
                        </div>
                        {quantityErrors[product.id] && (
                          <p className="text-red-500 text-sm mt-1">
                            {quantityErrors[product.id]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
