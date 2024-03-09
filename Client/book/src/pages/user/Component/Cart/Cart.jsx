import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);

  const [quantityErrors, setQuantityErrors] = useState("");

  useEffect(() => {
    // Tính tổng giá từ danh sách sản phẩm trong giỏ hàng
    const calculateTotalPrice = () => {
      let total = 0;
      items.forEach((item) => {
        total += item.price * item.quantityInCart;
      });
      return total;
    };

    setTotalPrice(calculateTotalPrice());
  }, [items]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantityInCart) => {
    const selectedItem = items.find((item) => item.id === productId);

    if (selectedItem) {
      // Kiểm tra xem quantityInCart có lớn hơn số lượng có sẵn không
      if (quantityInCart > selectedItem.quantity) {
        // Handle error for invalid quantity
        setQuantityErrors((prevErrors) => ({
          ...prevErrors,
          [productId]: "Bạn đã đặt quá số lượng có sẵn",
        })); // Bạn có thể cập nhật state hoặc thông báo lỗi cho người dùng tùy thuộc vào nhu cầu của bạn
      } else {
        // Dispatch action to update quantity in Redux store
        dispatch(updateQuantity(productId, quantityInCart));

        setQuantityErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[productId];
          return newErrors;
        });
      }
    }
  };

  const formatPrice = (price) => {
    // Chuyển đổi giá trị thành chuỗi và tách phần nguyên và phần thập phân
    const [integerPart, decimalPart] = price.toString().split(".");

    // Định dạng phần nguyên
    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Nếu có phần thập phân, thêm vào định dạng
    if (decimalPart !== undefined) {
      formattedInteger += "." + decimalPart.padEnd(3, "0"); // Sử dụng padEnd để thêm số 0 vào phần thập phân
    } else {
      formattedInteger += ".000"; // Nếu không có phần thập phân, thêm '.000' vào cuối
    }

    // Thêm ký tự 'đ' vào cuối chuỗi định dạng
    return formattedInteger + "đ";
  };

  const handleProceedToCheckout = () => {
    if (isAuthenticated === true) {
      // Nếu đã đăng nhập, chuyển hướng đến trang thanh toán
      navigate("/checkout");
    } else {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate("/login/user");
    }
  };
  return (
    <>
      <Header />
      <div className="cart w-full h-auto border">
        <div className="cart-title w-full bg-backgroundLightGray py-[38px] flex justify-between items-center">
          <div className="w-[1280px] m-auto flex justify-between items-center">
            <h2 className="text-[20px] text-textBlack font-bold">Giỏ hàng</h2>
            <div className="flex justify-center items-center gap-2 text-[14px] text-textBlack">
              <i className="fa-solid fa-house"></i>
              <i className="fa-solid fa-angle-right"></i>
              <p>Giỏ hàng</p>
            </div>
          </div>
        </div>

        <div className="cart-info w-full h-auto border border-red-500">
          <div className="cart-info-container w-[1280px] h-auto m-auto py-[48px] grid grid-cols-4 gap-x-6">
            <div className="cart-item col-span-3 bg-backgroundLightGray h-auto rounded-[5px]">
              <div className="items h-auto">
                <table className="table-auto w-full h-auto">
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="item-detail border-b">
                        <td className="p-2">
                          <div className="image w-[70px] h-[70px]">
                            <img
                              className="w-full h-full object-cover border"
                              src={`http://localhost:4000/uploads/${item.image}`}
                            />
                          </div>
                        </td>

                        <td className="p-2">
                          <div className="name flex flex-col gap-1 text-[16px] text-textBlack font-medium">
                            <Link to="">{item.name}</Link>
                            <p className="text-[14px] text-textGray font-medium">
                              Đơn vị tính: 1{item.unit}
                            </p>
                          </div>
                        </td>

                        <td className="p-2">
                          <div className="price flex flex-col gap-1">
                            <h4 className="text-[14px] text-textGray font-medium">
                              Giá
                            </h4>

                            <h6 className="text-[16px] text-primaryGreen font-medium">
                              {formatPrice(item.price)}
                            </h6>
                          </div>
                        </td>

                        <td className="p-2">
                          <div className="quantity flex flex-col gap-1">
                            <h4 className="text-[14px] text-textGray font-medium">
                              Số lượng
                            </h4>
                            <input
                              className="w-[50px] pl-[15px] pr-20px py-[10px] outline-primaryGreen"
                              type="number"
                              min="1"
                              value={item.quantityInCart}
                              onChange={(e) => {
                                handleUpdateQuantity(
                                  item.id,
                                  parseInt(e.target.value, 10)
                                );
                              }}
                            />
                            {quantityErrors[item.id] && (
                              <p className="text-red-500 text-sm mt-1">
                                {quantityErrors[item.id]}
                              </p>
                            )}
                          </div>
                        </td>

                        <td className="p-2">
                          <div className="total flex flex-col gap-1">
                            <h4 className="text-[14px] text-textGray font-medium">
                              Tổng tiền
                            </h4>
                            <h6 className="text-[18px] text-textBlack font-medium">
                              {formatPrice(item.price * item.quantityInCart)}
                            </h6>
                          </div>
                        </td>

                        <td className="p-2">
                          <div className="actions flex flex-col gap-1">
                            <h4 className="text-[14px] text-textGray font-medium">
                              Thao tác
                            </h4>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-[15px] text-[#bf2020] font-medium underline"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="cart-total col-span-1 flex flex-col gap-6 bg-backgroundLightGray h-auto px-[20px] py-[15px] rounded-[5px]">
              <div className="">
                <h3 className="text-[19px] text-textBlack font-medium">
                  Thông tin giỏ hàng
                </h3>
              </div>
              <div className="voucher relative flex flex-col gap-2">
                <h6 className="text-[14px] text-textGray font-[400]">
                  Sử dụng mã Voucher
                </h6>
                <form action="">
                  <input
                    className="w-full text-[14px] p-[10px] border-[2px] border-primaryGreen outline-primaryGreen rounded-[5px] "
                    type="text"
                    placeholder="Nhập mã giảm giá"
                  />
                  <button
                    className="absolute right-0 text-white px-[15px] py-[10px] bg-primaryGreen hover:bg-[#0b846c] transition rounded-tr-[5px] rounded-br-[5px]"
                    type="submit"
                  >
                    Áp dụng
                  </button>
                </form>
              </div>

              {/* <div className="subtotal flex justify-between items-center">
                <h4 className="text-[14px] text-textGray font-medium">
                  Tổng thanh toán
                </h4>
                <h4 className="text-[14px] text-textGray font-medium">
                  {formatPrice(totalPrice)}
                </h4>
              </div> */}

              {/* <div className="discount flex justify-between items-center">
                <h4 className="text-[14px] text-textGray font-medium">
                  Giảm giá
                </h4>
                <h4 className="text-[14px] text-textGray font-medium">
                  (-) 0đ
                </h4>
              </div>

              <div className="shipping flex justify-between items-center">
                <h4 className="text-[14px] text-textGray font-medium">
                  Phí vận chuyển
                </h4>
                <h4 className="text-[14px] text-textGray font-medium">0đ</h4>
              </div> */}

              <div className="total flex justify-between items-center">
                <h4 className="text-[16px] text-textGray font-semibold">
                  Tổng thanh toán
                </h4>
                <h4 className="text-[16px] text-primaryGreen font-semibold">
                  {formatPrice(totalPrice)}
                </h4>
              </div>

              <div className="flex flex-col gap-3">
                <div
                  className="process-to-checkout bg-secondaryRed hover:bg-[#f45a5a] transition px-[18px] py-[11px] rounded-[5px]"
                  onClick={handleProceedToCheckout}
                >
                  <Link
                    to={isAuthenticated ? "/checkout" : "/login/user"}
                    className="w-full h-full text-[14px] text-white font-semibold flex justify-center items-center"
                  >
                    Tiến đến Thanh toán
                  </Link>
                </div>
                <div className="return-to-shopping bg-lineGray hover:bg-[#c5c5c5] transition px-[18px] py-[11px] rounded-[5px]">
                  <Link
                    to="/"
                    className="w-full h-full text-[14px] text-textBlack font-normal flex justify-center items-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Trở về trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
