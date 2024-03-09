import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "../../common/Header";
import Footer from "../../common/Footer";

import { ShoppingCart } from "react-feather";

import { CreditCard } from "react-feather";

import discount from "../../../../../src/assets/images/discount.svg";

import { clearCart } from "../../../../redux/actions/cartActions";

import axios from "axios";

const Checkout = () => {
  const items = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userId = useSelector((state) => state.user.userId);

  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  // userIdSellers sẽ là một mảng chứa các user.id

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);

  const [userInfo, setUserInfo] = useState({});

  const [shippingFee, setShippingFee] = useState(0);

  // Tính tổng phí vận chuyển dựa trên mảng distances
  const calculateTotalShippingFee = () => {
    if (totalPrice >= 15) {
      return 20; // Phí vận chuyển là 20.000 nếu giá trị đơn hàng từ 150.000 đ trở lên
    } else if (totalPrice >= 300000) {
      return 0; // Không tính phí vận chuyển nếu giá trị đơn hàng từ 300.000 đ trở lên
    } else {
      return 30; // Phí vận chuyển là 30.000 cho các giá trị đơn hàng dưới 150.000 đ
    }
  };

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

    setShippingFee(calculateTotalShippingFee());
  }, [items, userInfo.distances]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (isAuthenticated === false) {
          navigate("/login/user");
          return;
        }
        // Gọi API với userId từ Redux state
        const response = await axios.get(
          `http://localhost:4000/api/account/${userId}`
        );
        const data = response.data.result.result;

        // Set state với dữ liệu người dùng
        setUserInfo(data);
        setLoadingUserInfo(false); // Đánh dấu rằng đã hoàn thành tải thông tin người dùng
        console.log("Data user:", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Gọi hàm fetchUserData khi component được render
    fetchUserInfo();
  }, [userId, isAuthenticated]);

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

  const generateRandomOrderId = () => {
    const orderIdLength = 6;
    const characters = "0123456789";
    let orderId = "";

    for (let i = 0; i < orderIdLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderId += characters.charAt(randomIndex);
    }

    return orderId;
  };
  const handleProceedToCheckout = async () => {
    try {
      if (!userInfo || Object.keys(userInfo).length === 0) {
        console.log("Không có dữ liệu người dùng. Vui lòng kiểm tra lại.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/order/place-order",
        {
          userId: userInfo.id,
          customerName: userInfo.name,
          shippingAddress: userInfo.shipping_address,
          paymentMethod: "Thanh toán khi nhận hàng",
          totalPrice: totalPrice + calculateTotalShippingFee(),
          status: "Đang xử lý",
          orderCode: generateRandomOrderId(),
          items: items.map((item) => ({
            productId: item.id,
            nameItem: item.name,
            price: item.price,
            quantity: item.quantityInCart,
            unit: item.unit,
          })),
        }
      );

      if (response.data.success) {
        const orderId = response.data.orderId.orderId; // Accessing the orderId property
        console.log("Đơn hàng đã được đặt thành công. ID đơn hàng:", orderId);
        // Navigate to the order success page with the orderId
        dispatch(clearCart());
        navigate(`/order-success/${orderId}`);
      } else {
        console.error("Error placing order:", response.data.error);
        // Display error message to the user
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="checkout w-full h-auto border">
        <div className="checkout-title w-full bg-backgroundLightGray py-[38px] flex justify-between items-center">
          <div className="w-[1280px] m-auto flex justify-between items-center">
            <h2 className="text-[20px] text-textBlack font-bold">Thanh toán</h2>
            <div className="flex justify-center items-center gap-2 text-[14px] text-textBlack">
              <i className="fa-solid fa-house"></i>
              <i className="fa-solid fa-angle-right"></i>
              <p>Thanh toán</p>
            </div>
          </div>
        </div>

        <div className="checkout-info w-full h-auto">
          <div className="checkout-info-container w-[1280px] h-auto m-auto py-[48px] grid grid-cols-5 gap-x-6">
            {/*  */}
            <div className="checkout-item col-span-3 h-auto rounded-[5px]">
              <div className="flex flex-col gap-12">
                {/* Địa chỉ giao hàng */}
                <div className="address h-auto flex justify-start items-start gap-4">
                  <div className="w-[48px] h-[44px] flex justify-center items-center bg-backgroundLightGray rounded-[50%]">
                    <ShoppingCart size={22} color="#0DA487" />
                  </div>
                  <div className="flex flex-col gap-2 w-full px-6 py-3 bg-backgroundLightGray rounded-[5px]">
                    <h3 className="text-[17px] text-textBlack font-semibold">
                      Địa chỉ giao hàng
                    </h3>
                    <div className="relative w-[520px] flex justify-start items-start gap-4 shadow bg-white rounded-lg p-4">
                      <div className="">
                        <input checked type="checkbox" name="" id="" />
                      </div>
                      <div className="">
                        <h1 className="text-[16px] text-textBlack font-semibold">
                          {userInfo.name}
                        </h1>
                        <p className="text-[16px] text-textGray font-normal">
                          {userInfo.shipping_address}
                        </p>
                        <p className="text-[16px] text-textGray font-normal">
                          {userInfo.phone}
                        </p>
                      </div>
                      <span className="absolute top-4 right-4 bg-primaryGreen text-white text-[12px] font-semibold px-[6px] py-[3px] rounded">
                        Mặc định
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className="payment h-auto flex justify-start items-start gap-4">
                  <div className="w-[48px] h-[44px] flex justify-center items-center bg-backgroundLightGray rounded-[50%]">
                    <CreditCard size={22} color="#0DA487" />
                  </div>
                  <div className="flex flex-col gap-2 w-full px-6 py-3 bg-backgroundLightGray rounded-[5px]">
                    <h3 className="text-[17px] text-textBlack font-semibold">
                      Phương thức thanh toán
                    </h3>
                    <div className="relative w-[520px] flex justify-start items-start gap-4 shadow bg-white rounded-lg p-4">
                      <div className="">
                        <input checked type="checkbox" name="" id="" />
                      </div>
                      <div className="">
                        <h1 className="text-[16px] text-textBlack font-semibold">
                          Thanh toán khi nhận hàng
                        </h1>
                        <p className="text-[12px] text-textGray font-normal">
                          Thanh toán an toàn và thuận lợi khi nhận hàng tại địa
                          chỉ <br /> mong muốn. Chỉ thanh toán khi bạn hài lòng
                          với sản phẩm.
                        </p>
                      </div>
                      <span className="absolute top-4 right-4 bg-primaryGreen text-white text-[12px] font-semibold px-[6px] py-[3px] rounded">
                        Mặc định
                      </span>
                    </div>

                    <div className="relative w-[520px] flex justify-start items-start gap-4 shadow bg-white rounded-lg p-4">
                      <div className="">
                        <input disabled type="checkbox" name="" id="" />
                      </div>
                      <div className="">
                        <h1 className="text-[16px] text-textBlack font-semibold">
                          Thanh toán qua ví điện tử
                        </h1>
                        <p className="text-[12px] text-textGray font-normal">
                          Thanh toán nhanh chóng và tiện lợi với ví điện tử. Sử
                          dụng <br /> ứng dụng ví để thanh toán mà không cần
                          mang theo tiền mặt.{" "}
                        </p>
                      </div>
                    </div>

                    <div className="relative w-[520px] flex justify-start items-start gap-4 shadow bg-white rounded-lg p-4">
                      <div className="">
                        <input disabled type="checkbox" name="" id="" />
                      </div>
                      <div className="">
                        <h1 className="text-[16px] text-textBlack font-semibold">
                          Thanh toán qua ngân hàng
                        </h1>
                        <p className="text-[12px] text-textGray font-normal">
                          Thanh toán an toàn và minh bạch thông qua chuyển khoản
                          ngân <br /> hàng. Nhận thông tin tài khoản ngân hàng
                          để chuyển khoản sau khi đặt hàng.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="cart-total col-span-2 flex flex-col gap-6 bg-backgroundLightGray h-auto px-[20px] py-[15px] rounded-[5px]">
              <div className="">
                <h3 className="text-[19px] text-textBlack font-medium">
                  Chi tiết đơn hàng
                </h3>
              </div>

              <div className="All-product flex flex-col gap-3">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="img w-[70px] h-[70px] border rounded">
                        <img
                          className="w-full h-full object-cover rounded"
                          src={`http://localhost:4000/uploads/${item.image}`}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <p className="text-[15px] text-textGray font-[500]">
                            {item.name}
                          </p>
                          <p className="text-[15px] text-textGray font-normal">
                            X {item.quantityInCart} {item.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <p className="text-[15px] text-textGray font-[600]">
                        {formatPrice(item.quantityInCart * item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="subtotal flex justify-between items-center">
                <h4 className="text-[17px] text-textGray font-medium">
                  Tổng thanh toán
                </h4>
                <h4 className="text-[17px] text-textGray font-medium">
                  {formatPrice(totalPrice)}
                </h4>
              </div>

              {/* <div className="discount flex justify-between items-center">
                <h4 className="text-[17px] text-textGray font-medium">
                  Giảm giá
                </h4>
                <h4 className="text-[17px] text-textGray font-medium">
                  (-) 0đ
                </h4>
              </div> */}

              <div className="shipping flex justify-between items-center">
                <h4 className="text-[17px] text-textGray font-medium">
                  Phí vận chuyển
                </h4>
                <h4 className="text-[17px] text-textGray font-medium">
                  {formatPrice(calculateTotalShippingFee(userInfo.distances))}
                </h4>
              </div>

              <div className="total flex justify-between items-center">
                <h4 className="text-[18px] text-textGray font-semibold">
                  Tổng thanh toán
                </h4>
                <h4 className="text-[16px] text-primaryGreen font-semibold">
                  {formatPrice(
                    totalPrice + calculateTotalShippingFee(userInfo.distances)
                  )}{" "}
                </h4>
              </div>

              {/* Cam kết chất lượng */}
              <div className="bg-backgroundLightGray flex flex-col gap-2">
                <div className="flex justify-start items-center gap-2">
                  <img className="w-[25px] h-[25px]" src={discount} alt="" />
                  <h4 className="text-textGray font-semibold">
                    Cam kết chất lượng
                  </h4>
                </div>
                <div className="px-3 flex flex-col gap-1">
                  <li className="text-[13px] text-textGray font-normal">
                    Mua sắm sách trực tuyến tại trang web của chúng tôi, bạn sẽ
                    được đảm bảo chất lượng và thông tin chi tiết về từng sản
                    phẩm.{" "}
                  </li>
                  <li className="text-[13px] text-textGray font-normal">
                    Trải nghiệm thanh toán của chúng tôi được thiết kế để đơn
                    giản và an toàn, mang lại sự thuận tiện cho khách hàng.{" "}
                  </li>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div
                  className="process-to-checkout bg-primaryGreen hover:bg-[#099579] transition px-[18px] py-[11px] rounded-[5px]"
                  onClick={handleProceedToCheckout}
                >
                  <Link
                    // to={isAuthenticated ? "/order-success" : "/login/user"}
                    className="w-full h-full text-[14px] text-white font-semibold flex justify-center items-center"
                  >
                    Đặt hàng ngay
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
};

export default Checkout;
