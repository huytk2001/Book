import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";

import Header from "../../common/Header";
import Footer from "../../common/Footer";

import Success from "../../../../assets/images/success.svg";

import axios from "axios";

import { useParams } from "react-router-dom";

const OrderSuccess = () => {
  const userId = useSelector((state) => state.user.userId);
  const { orderId } = useParams();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [totalPrice, setTotalPrice] = useState(0);

  const [orderInfo, setOrderInfo] = useState();

  const fetchOrderInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/${userId}/order/${orderId}`
      );
      const data = response.data;
      setOrderInfo(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    console.log("====================================");
    console.log(orderId);
    console.log("====================================");

    fetchOrderInfo();
  }, [orderId, userId]);

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

  return (
    <>
      <Header />
      <div className="cart w-full h-auto">
        <div className="cart-title w-full bg-backgroundLightGray py-[38px] flex justify-between items-center">
          <div className="w-[1280px] m-auto flex justify-between items-center">
            {/* Đặt hàng thành công */}
            <div className="w-full h-[300px] bg-backgroundLightGray flex justify-center items-center">
              <div className="flex flex-col gap-2">
                <div className="relative flex justify-center items-center">
                  <img src={Success} alt="" />
                  <i className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[58px] text-white fa-solid fa-check"></i>
                </div>
                <div className="text-center">
                  <h3 className="text-[24px] text-primaryGreen font-bold">
                    Đặt hàng thành công
                  </h3>
                  <h5 className="text-[16px] text-textGray font-normal">
                    Thanh toán thành công và đơn hàng của bạn đang được xử lý
                  </h5>
                  <p className="text-[14px] text-textGray font-normal">
                    Mã giao dịch: #{orderInfo && orderInfo.order.order_code}{" "}
                  </p>
                </div>
                <div className="mt-6 return-to-shopping bg-lineGray hover:bg-[#c5c5c5] transition px-[18px] py-[11px] rounded-[5px]">
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

        <div className="cart-info w-full h-auto">
          <div className="cart-info-container w-[1280px] h-auto m-auto py-[48px] grid grid-cols-4 gap-x-6">
            <div className="cart-item col-span-4 bg-backgroundLightGray h-auto rounded-[5px]">
              <div className="items h-auto p-3">
                {orderInfo && (
                  <h1 className="my-2 ml-2 text-[18px] text-textBalck font-medium">
                    Tổng giá trị đơn hàng:{" "}
                    <span className="font-bold text-primaryGreen">
                      {formatPrice(orderInfo.order.total_price)}
                    </span>
                  </h1>
                )}

                <table className="table-auto w-full h-auto">
                  <tbody>
                    {orderInfo &&
                      orderInfo.orderItems.map((orderItem, index) => (
                        <tr key={orderItem.id} className="item-detail border-b">
                          <td className="p-2">
                            <div className="image w-[70px] h-[70px]">
                              <img
                                className="w-full h-full object-cover border"
                                src={`http://localhost:4000/uploads/${orderItem.product_image}`}
                                alt={orderItem.name}
                              />
                            </div>
                          </td>

                          <td className="p-2">
                            <div className="name flex flex-col gap-1 text-[16px] text-textBlack font-medium">
                              <Link to="">{orderItem.name}</Link>
                              <p className="text-[14px] text-textGray font-medium">
                                Đơn vị tính: {orderItem.unit}
                              </p>
                            </div>
                          </td>

                          <td className="p-2">
                            <div className="price flex flex-col gap-1">
                              <h4 className="text-[14px] text-textGray font-medium">
                                Giá
                              </h4>
                              <h6 className="text-[16px] text-primaryGreen font-medium">
                                {formatPrice(orderItem.price)}
                              </h6>
                            </div>
                          </td>

                          <td className="p-2">
                            <div className="quantity flex flex-col gap-1">
                              <h4 className="text-[14px] text-textGray font-medium">
                                Số lượng
                              </h4>
                              <p>{orderItem.quantity}</p>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderSuccess;
