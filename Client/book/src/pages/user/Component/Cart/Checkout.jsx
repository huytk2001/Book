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

import isEqual from "lodash/isEqual";

const Checkout = () => {
  const items = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userId = useSelector((state) => state.user.userId);
  const userIdSellers = items.map((item) => item.user?.id);

  // userIdSellers sẽ là một mảng chứa các user.id
  console.log(userIdSellers);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);

  const [userInfo, setUserInfo] = useState({});

  const [sellerCoordinates, setSellerCoordinates] = useState([]);
  const [sellerIds, setSellerIds] = useState([]);

  const [shippingFee, setShippingFee] = useState(0);

  // Tính tổng phí vận chuyển dựa trên mảng distances
  const calculateTotalShippingFee = (distances) => {
    try {
      // Kiểm tra xem distances có hợp lệ không
      if (distances && Array.isArray(distances)) {
        // Tổng phí vận chuyển
        let totalShippingFee = 0;

        // Duyệt qua mảng distances và tính phí vận chuyển cho mỗi khoảng cách
        distances.forEach((distance) => {
          // Kiểm tra xem distance có phải là số không
          if (typeof distance === "number" && !isNaN(distance)) {
            // 3,000 VND cho mỗi kilometer
            const feePerKm = 2000;
            totalShippingFee += distance * feePerKm;
          }
          // Nếu distance không phải là số, bỏ qua
        });

        return totalShippingFee;
      } else {
        // Nếu distances không hợp lệ, trả về 0 hoặc giá trị mặc định của bạn
        return 0; // Hoặc giá trị mặc định của bạn
      }
    } catch (error) {
      console.error("Error calculating total shipping fee:", error);
      return 0; // Trả về 0 nếu có lỗi
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
          `http://localhost:4000/user/${userId}`
        );
        const data = response.data;

        // Set state với dữ liệu người dùng
        setUserInfo(data);
        console.log("Data user:", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Gọi hàm fetchUserData khi component được render
    fetchUserInfo();
  }, [userId, isAuthenticated]);

  useEffect(() => {
    const fetchSellerCoordinates = async () => {
      try {
        const ids = items.map((item) => item.user?.id).filter(Boolean);
        setSellerIds(ids);

        // Gọi API hoặc thực hiện bất kỳ logic nào để lấy thông tin coordinates từ user_id
        const coordinatesPromises = ids.map((sellerId) => {
          return axios
            .get(`http://localhost:4000/user/${sellerId}`)
            .then((response) => response.data.coordinates)
            .catch((error) => {
              console.error(
                `Error fetching coordinates for seller with id ${sellerId}:`,
                error
              );
              return null;
            });
        });

        // Chờ tất cả các promises hoàn thành và xử lý chuỗi coordinates
        const resolvedCoordinates = await Promise.all(coordinatesPromises);

        // Chuyển đổi chuỗi JSON thành đối tượng JSON
        const jsonCoordinates = resolvedCoordinates.map((coordinate) => {
          try {
            const parsedCoordinate = JSON.parse(coordinate);
            return parsedCoordinate;
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
          }
        });

        setSellerCoordinates(jsonCoordinates);

        console.log("JSON coordinates array:", jsonCoordinates);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin coordinates:", error);
      }
    };

    fetchSellerCoordinates();
  }, [items]);

  // const calculateDistance = (fromLocation, toLocation) => {
  //   try {
  //     if (fromLocation && toLocation) {
  //       const { google } = window;

  //       if (google) {
  //         const point1 = new google.maps.LatLng(
  //           fromLocation.latitude,
  //           fromLocation.longitude
  //         );
  //         const point2 = new google.maps.LatLng(
  //           toLocation.latitude,
  //           toLocation.longitude
  //         );

  //         const distance =
  //           google.maps.geometry.spherical.computeDistanceBetween(
  //             point1,
  //             point2
  //           );

  //         // Convert distance to kilometers and round to one decimal place
  //         const distanceInKm = (distance / 1000).toFixed(2);
  //         return parseFloat(distanceInKm);
  //       } else {
  //         return null;
  //       }
  //     } else {
  //       return null;
  //     }
  //   } catch (e) {
  //     console.error("Error calculating distance: ", e);
  //     return null;
  //   }
  // };

  const formatPrice = (price) => {
    const formattedPrice = Number(price).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedPrice;
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
      // Gửi thông tin đặt hàng lên server
      const response = await axios.post("http://localhost:4000/orders", {
        userId: userInfo.id,
        customerName: userInfo.name,
        shippingAddress: userInfo.shipping_address,
        paymentMethod: "Thanh toán khi nhận hàng", // Có thể thay đổi theo cách bạn xử lý phương thức thanh toán
        totalPrice: totalPrice + calculateTotalShippingFee(userInfo.distances),
        status: "Đang xử lý",
        orderCode: generateRandomOrderId(),
        items: items.map((item) => ({
          productId: item.id,
          userIdSellers: String(item.user?.id),
          nameItem: item.name,
          quantity: item.quantityInCart,
          price: item.price * item.quantityInCart,
          unit: item.unit,
        })),
      });

      console.log(userIdSellers);

      console.log(items.map((item) => String(item.user?.id)));

      console.log(items);
      console.log(response);

      // Kiểm tra xem đặt hàng thành công hay không
      if (response.status === 200) {
        const orderId = response.data.orderId;
        dispatch(clearCart());
        navigate(`/order-success/${orderId}`);
      } else {
        console.error("Error placing order:", response.data);
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
                    Mua sắm nông sản trực tuyến tại trang web của chúng tôi, bạn
                    sẽ được đảm bảo chất lượng và thông tin chi tiết về từng sản
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
