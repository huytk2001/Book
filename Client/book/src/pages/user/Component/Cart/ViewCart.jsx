import Header from "../../common/Header";
import Footer from "../../common/Footer";
import BgIconCoupon from "../../../../assets/images/ico_coupon.png";
import BgI from "../../../../assets/images/dragon.jpg";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import { useNavigate } from "react-router-dom";

export default function ViewCart() {
  const maxQuantities = useSelector((state) => state.cart.maxQuantities);

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const items = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const [quantityErrors, setQuantityErrors] = useState({});
  useEffect(() => {
    const calculateTotalPrice = () => {
      return items.reduce(
        (total, item) => total + item.price * item.quantityInCart,
        0
      );
    };
    setTotalPrice(calculateTotalPrice());
  }, [items]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      items.forEach((item) => {
        total += item.price * item.quantityInCart;
      });
      return total;
    };
    setTotalPrice(calculateTotalPrice());
  }, [items]);

  const handleUpdateQuantity = (productId, quantityInCart) => {
    const selectedItem = items.find((item) => item.id === productId);

    if (selectedItem) {
      if (quantityInCart > selectedItem.quantity) {
        setQuantityErrors((prevErrors) => ({
          ...prevErrors,
          [productId]: `* Số lượng yêu cầu cho ${quantityInCart} không có sẵn`,
        }));
      } else {
        dispatch(updateQuantity(productId, quantityInCart));
        setQuantityErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[productId];
          return newErrors;
        });
      }
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    const selectedItem = items.find((item) => item.id === productId);
    if (selectedItem) {
      const updatedQuantity = selectedItem.quantityInCart + 1;
      handleUpdateQuantity(productId, updatedQuantity);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const selectedItem = items.find((item) => item.id === productId);
    if (selectedItem) {
      const updatedQuantity = selectedItem.quantityInCart - 1;
      if (updatedQuantity > 0) {
        handleUpdateQuantity(productId, updatedQuantity);
      }
    }
  };

  const formatPrice = (price) => {
    const formattedPrice = Number(price).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedPrice;
  };

  const handleProceedToCheckout = () => {
    if (isAuthenticated === true) {
      navigate("/checkout");
    } else {
      navigate("/login/user");
    }
  };

  return (
    <>
      <Header />
      <div className="cart w-full h-auto bg-slate-400 mt-5 ">
        <div className="cart-title w-full bg-backgroundLightGray">
          <div className="w-[1280px] m-auto  flex items-center ">
            <h1 className="text-[20px] font-[600] text-text3333">Giỏ hàng</h1>
            <span className="ml-1 font-[600] text-[16px]">(sản phẩm)</span>
          </div>
        </div>
        <div className="card-main w-full h-auto ">
          <div className="w-[1280px] m-auto flex pb-3">
            <div className="main-left w-[65%]">
              <div className="checkbox-all-product flex items-center flex-row py-[10px] my-3 bg-white rounded-md">
                <div className="flex basis-[8%] justify-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 appearance-none border border-gray-400 rounded-[4px] outline-none cursor-pointer transition"
                  />
                </div>
                <div className="flex justify-start basis-[68%]">
                  <span className="text-[15px] font-[600] text-text3333">
                    Chọn tất cả
                  </span>
                  <span className="text-[15px] font-[600] text-text3333 ml-2">
                    (sản phẩm)
                  </span>
                </div>
                <div className="text-[15px] font-[600] text-text3333 flex justify-center basis-[13%]">
                  Số lượng
                </div>
                <div className="text-[15px] font-[600] text-text3333 flex justify-center basis-[21%]">
                  Thành tiền
                </div>
                <div className="flex basis-[8%]"></div>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="product-cart flex justify-around py-[10px] bg-white rounded-sm"
                >
                  <div className="flex basis-[8%] justify-center items-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 appearance-none border border-gray-400 rounded-[4px] outline-none cursor-pointer transition"
                    />
                  </div>
                  <div className="flex justify-between basis-[16%]">
                    <img
                      src={`http://localhost:4000/uploads/${item.image}`}
                      className="w-auto max-h-[119px] object-contain"
                    />
                  </div>
                  <div className="flex basis-[60%] justify-between flex-col px-[10px]">
                    <div>
                      <h2 className="text-[14px] text-text3333">{item.name}</h2>
                    </div>
                    <div>
                      <span className="text-[1.2em] font-bold text-text3333 ">
                        {item.price} đ
                      </span>
                    </div>
                    {quantityErrors[item.id] && (
                      <p className="text-red-500 text-sm mt-1">
                        {quantityErrors[item.id]}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center basis-[40%] m-auto">
                    <div className="quantity flex flex-2 items-center border border-solid border-gray-300 h-[30px] px-[10px]">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="flex-1"
                      >
                        <i className="fa-solid fa-minus text-center"></i>
                      </button>

                      <span className="text-[15px] font-[600] text-text3333 text-center w-full">
                        {item.quantityInCart}
                      </span>

                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="flex-1"
                      >
                        <i className="fa-solid fa-plus text-center"></i>
                      </button>
                    </div>

                    <div className="flex-3 flex text-15 font-semibold text-textred justify-center">
                      {item.totalPrice} đ
                    </div>
                  </div>
                  <div className="flex basis-[8%] items-center justify-center">
                    <button onClick={() => handleRemoveFromCart(item.id)}>
                      <i className="fa-solid fa-trash text-current"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="main-right w-[35%]  pl-4 my-3  ">
              <div className="bg-gray-100 rounded-md px-4 mb-[10px]">
                <div className="flex items-center justify-between pt-4 ">
                  <div className="flex">
                    <img
                      src={BgIconCoupon}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-[15px] font-[600] ml-1.5 text-theme-color">
                      Khuyến Mãi
                    </span>
                  </div>
                  <div>
                    <span className="text-[15px] font-[600] ml-1.5 text-theme-color">
                      Xem thêm
                    </span>
                    <i className="fa-solid fa-angle-right text-[15px] font-[600] ml-1.5 text-theme-color"></i>
                  </div>
                </div>
                <div className="pt-[15px]  border-t mt-[15px] pb-3">
                  <div className="flex justify-between items-center pb-2">
                    <div className="text-[1.1em] font-[650] uppercase text-gray-700 ">
                      Ma giam gia 10-20
                    </div>
                    <div className="text-theme-color font-[500] underline text-[16px]">
                      Chi tiết
                    </div>
                  </div>
                  <div className="flex min-h-10 justify-between  border-b pb-1 mt-2  ">
                    <div className="flex   relative    ">
                      <div className="flex items-center  ">
                        <span className="text-text3333 font-[500] text-[0.8em]">
                          Mua thêm 150.000 đ để nhận mã
                        </span>
                        <span className="text-text3333 font-[500] text-[0.8em] pl-4">
                          150.000đ
                        </span>
                      </div>
                    </div>

                    <div className="flex pl-4   ">
                      <button
                        className="ml-1 text-white font-[500] text-[1em] bg-theme-color px-[6px] rounded-[6px]"
                        title="Mua thêm"
                      >
                        Mua Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="bg-white rounded-md flex flex-col w-full">
                <div className="flex items-center px-4 py-[10px] w-full border-b">
                  <div className="text-[1.2rem] font-[300] text-text3333 flex basis-[65%]">
                    Thành tiền
                  </div>
                  <div className="text-[1.2rem] font-[300] text-text3333 flex basis-[35%]">
                    Thành tiền
                  </div>
                </div>
                <div className="flex items-center px-4 py-[10px] w-full">
                  <div className="text-[1.2rem] font-[650] text-text3333 flex basis-[65%]">
                    Tổng Số Tiền (gồm VAT)
                  </div>
                  <div className="text-[1.2rem] font-[650] text-text3333 flex basis-[35%]">
                    Thành tiền
                  </div>
                </div>
                <div
                  className="flex w-full justify-center items-center px-4 pb-3"
                  onClick={handleProceedToCheckout}
                >
                  <Link to={isAuthenticated ? "/checkout" : "/login/user"}>
                    <button className="text-white bg-textred w-full text-[18px] px-5 py-[10px] rounded-lg">
                      Thanh Toán
                    </button>
                  </Link>
                </div>
              </div> */}
              <div className="bg-white rounded-md  flex flex-col  ">
                <div className="flex items-center px-4 py-[10px] w-full border-b">
                  <div className="text-[1.2rem] font-[300] text-text3333 flex  basis-[65%]">
                    Thành tiền
                  </div>
                  <div className="text-[1.2rem] font-[300] text-text3333 flex basis-[35%]">
                    {formatPrice(totalPrice)}
                  </div>
                </div>
                <div className="flex items-center px-4 py-[10px] w-full ">
                  <div className="text-[1.2rem] font-[650] text-text3333 flex  basis-[65%]">
                    Tổng Số Tiền (gồm VAT)
                  </div>
                  <div className="text-[1.2rem] font-[650] text-text3333 flex basis-[35%]">
                    {formatPrice(totalPrice)}
                  </div>
                </div>
                <Link to={isAuthenticated ? "/checkout" : "/login/user"}>
                  <div className="flex w-full justify-center items-center px-4 pb-3">
                    <button
                      className="text-white bg-textred w-full text-[18px] px-5 py-[10px] rounded-lg"
                      onClick={handleProceedToCheckout}
                    >
                      Thanh Toán
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
