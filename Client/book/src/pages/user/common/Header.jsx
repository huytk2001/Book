import Logo from "../../../assets/images/Logo.png";
import { Search, ShoppingCart, User, ChevronDown } from "react-feather";
import { Link } from "react-router-dom";
import BgBook5 from "../../../assets/images/damnghi.jpg";
import { useSelector, useDispatch } from "react-redux";
import { PhoneCall } from "react-feather";
import { Heart } from "react-feather";
import { useEffect, useState } from "react";
import ButtonAllCategory from "../Component/ButtonAllCategory";
import { useNavigate } from "react-router-dom";
import {
  getCartItemCount,
  getCartItems,
  getCartTotal,
  getUserId,
} from "../../../redux/selectors";
import { logout } from "../../../redux/actions/userActions";
export default function Header() {
  const [isHover, SetIsHover] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    SetIsHover(true);
  };

  const userId = useSelector(getUserId);
  const handleMouseLeave = () => {
    SetIsHover(false);
  };
  useEffect(() => {
    return () => {
      SetIsHover(false);
    };
  }, []);
  const handleLogout = () => {
    // xoa accessToken,userId va refreshtoken khoi localstorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    navigate("/");
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
    <div className="header w-full h-auto ">
      <div className="w-full bg-theme-color">
        <div className="top-header w-[1280px] h-full m-auto  grid grid-cols-2 gap-4 py-3 px-0.5 items-center">
          {/* Left section */}
          <div className="">
            <div>
              <ul className="flex">
                <li className="text-[14px] text-white pr-[25px]">
                  Welcome to Our store
                </li>
                <li className="text-[14px] text-white">
                  <i className="fa fa-phone pr-1"></i>
                  Call Us: 1906-4990
                </li>
              </ul>
            </div>
          </div>

          <div className="account flex justify-end items-center">
            <div className="relative group">
              <Link>
                <User name="cart" size={24} color="black" />
              </Link>

              {isAuthenticated ? (
                <div className="user-options absolute top-full right-0 bg-white p-3 rounded-[5px] shadow-lg hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col gap-3 w-[120px]">
                    <Link
                      className="text-[14px] text-textGray hover:text-primaryGreen"
                      to={`/profile/user/${userId}`}
                    >
                      Hồ sơ cá nhân
                    </Link>
                    <Link
                      className="text-[14px] text-textGray hover:text-primaryGreen"
                      to="/order/user"
                    >
                      Đơn hàng
                    </Link>
                    <Link
                      className="text-[14px] text-textGray hover:text-primaryGreen"
                      to=""
                    >
                      <button onClick={handleLogout}>Đăng xuất</button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="user-options absolute top-full right-0 bg-white p-3 rounded-[5px] shadow-lg hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col gap-3 w-[120px]">
                    <Link
                      className="text-[14px] text-textGray hover:text-primaryGreen"
                      to="/login/user"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      className="text-[14px] text-textGray hover:text-primaryGreen"
                      to="/register/user"
                    >
                      Đăng ký
                    </Link>
                    <Link
                      className="text-[14px] text-textGray hover:text-primaryGreen"
                      to="/forgot-password"
                    >
                      Quên mật khẩu
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white">
        <div className="center-header w-auto h-full m-auto  py-[35px]">
          <div className="w-[1280px] h-full m-auto flex    justify-between  items-center">
            <div className="flex ">
              <img
                src={Logo}
                alt="logo"
                className="w-[170px] h-auto object-contain"
              />
            </div>

            <div className="relative flex justify-center items-center h-full">
              <form className="flex items-center ">
                <input
                  type="search"
                  placeholder="Tìm kiếm sách ở đây...."
                  className="p-4 border border-gray-300 rounded-l-md focus:outline-none w-[600px]"
                />
                <button
                  type="submit"
                  className="p-4  rounded-r-md relative right-0 border"
                >
                  <Search
                    name="search"
                    size={24}
                    className="text-theme-color"
                  />
                </button>
              </form>
            </div>
            <div className="header-center-right flex justify-center item-center gap-[15px]">
              <Link>
                <PhoneCall name="phone" size={24} color="black" />
              </Link>
              |
              <Link>
                <Heart name="heart" size={24} color="black" />
              </Link>
              |
              <div
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ShoppingCart name="cart" size={24} color="black" />{" "}
                <div className=" absolute top-[-12px] left-[14px] w-[22px] h-[22px] flex justify-center items-center rounded-[4px] bg-secondaryRed  ">
                  <span className="text-[12px] text-white font-semibold">
                    2
                  </span>
                </div>
                {isHover && (
                  <div className="bg-white rounded-md shadow-md z-30 absolute top-[26px] right-[-70px] p-4 w-[300px] pointer-events-auto">
                    <div className="flex items-center mb-2 pb-2 ">
                      <img
                        src={BgBook5}
                        className="w-16 h-16 object-contain mr-2 border "
                      />
                      <div className="flex items-center ">
                        <p className="text-[16px] font-bold text-theme-color">
                          Sach
                        </p>
                        <p className="text-[14px] text-textGray font-[500]">
                          222
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-t border-b">
                      <p className="text-[16px] text-textGray font-medium">
                        Tổng tiền
                      </p>
                      <p className="text-[18px] text-theme-color font-bold">
                        1
                      </p>
                    </div>
                    <div className="flex justify-between pb-2 pt-2">
                      <Link
                        to="/viewcard"
                        className="text-theme-color text-[16px] border-[2px] border-theme-color px-[12px] py-[6px] hover:bg-theme-color hover:text-white transition"
                      >
                        Giỏ hàng
                      </Link>
                      <Link
                        to="/cart"
                        className="text-white text-[16px] border-[2px] border-theme-color  bg-theme-color  px-[12px] py-[6px]  transition  hover:bg-white hover:text-theme-color"
                      >
                        Thanh toán
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* header bottom */}
        <div className="header-bottom w-full h-[52px] border-t">
          <div className="header-bottom-container w-[1280px] h-full m-auto flex pt-2  items-center ">
            <ButtonAllCategory />
            <div className="header-bottom-main w-3/4 px-3">
              <ul className="flex  items-center gap-5">
                <li className="text-[16px] text-[text2222] flex justify-center items-center font-medium">
                  <Link className="pr-[45px] py-5">Trang chủ</Link>
                </li>
                <li className=" relative text-[16px] text-[text2222] flex justify-center items-center font-medium">
                  <Link to="/seller/manage-product" className="pr-[45px] py-5">
                    Cửa hàng
                  </Link>
                  <ChevronDown
                    className=" absolute  right-[20px]"
                    size={20}
                    color="#222222"
                  />
                </li>

                <li className=" relative text-[16px] text-[text2222] flex justify-center items-center font-medium">
                  <Link to="/seller/manage-product" className="pr-[45px] py-5">
                    Sách
                  </Link>
                  <ChevronDown
                    className=" absolute  right-[20px]"
                    size={20}
                    color="#222222"
                  />
                </li>

                <li className=" relative text-[16px] text-[text2222] flex justify-center items-center font-medium">
                  <Link to="/filter-product/100" className="pr-[45px] py-5">
                    Bộ lọc
                  </Link>
                  <ChevronDown
                    className=" absolute  right-[20px]"
                    size={20}
                    color="#222222"
                  />{" "}
                </li>

                <li className="relative text-[16px] text-[text2222] flex justify-center items-center font-medium">
                  <Link to="/contact" className="pr-[45px] py-5">
                    Liên hệ
                  </Link>
                  <ChevronDown
                    className=" absolute  right-[20px]"
                    size={20}
                    color="#222222"
                  />{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
