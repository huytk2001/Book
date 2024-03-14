import { Link } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";

// import IconDiscount from "../../../assets/images/discount.svg";
// import IconMarket from "../../../assets/images/market.svg";
// import PayIcon from "../../../assets/images/pay.png";
// import ConnectIcon from "../../../assets/images/connect.png";

export default function Footer() {
  return (
    <>
      <div className="footer w-full h-auto ">
        <div className="footer-container max-w-7xl h-auto m-auto mx-auto  px-4 sm:px-6 lg:px-8">
          {/* Footer Top */}
          <div className="footer-top grid grid-cols-1  md:grid-cols-4 gap-4 mb-8 py-[45px] border-b border-b-black border-dashed"></div>

          {/* Footer Center */}
          <div className="footer-center grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 py-[45px] border-b border-b-black border-dashed">
            <div className="item flex flex-col justify-start items-start gap-6">
              <img src={Logo} className=" w-48 md:w-64 mx-auto mb-4" alt="" />
              <div className="flex flex-col justify-start items-start gap-3">
                <h5 className="text-[16px] text-textBlack font-medium">
                  BookHavens – cùng bạn truy tìm tri thức!
                </h5>
                <p className="text-textBlack font-normal text-[16px]">
                  Chúng tôi miễn phí giao hàng cho đơn sách từ 299.000đ
                </p>

                <div className="flex justify-start items-center  text-[16px] text-textBlack">
                  <i className="fa-solid fa-house mr-1"></i>
                  <p className="text-textBlack font-normal">
                    <b className="pr-[6px]">Địa Chỉ:</b>
                    <a>Xuân Khánh, Ninh Kiều, Cần Thơ</a>
                  </p>
                </div>
                <div className="flex justify-start items-center  text-[16px] text-textBlack">
                  <p className="text-textBlack font-normal">
                    <b className="pr-[6px]">Hotline:</b>
                    <a>0939 417 417</a>
                  </p>
                </div>
                <div className="flex justify-start items-center gap-2 text-[16px] text-textBlack">
                  <p className="text-textBlack font-normal">
                    <b className="pr-[6px]">Hotline:</b>
                    <a>support@bookhavens.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="item flex flex-col  gap-2">
              <h3 className=" text-[20px] text-textBlack font-[600]">
                Tất cả trang
              </h3>
              <div className="flex flex-col  gap-3">
                <Link
                  to="/seller-detail/:id"
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Trang chủ
                </Link>
                <Link
                  to="/intro"
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Giới thiệu
                </Link>
                <Link
                  to=""
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Tin tức
                </Link>
                <Link
                  to="/contact"
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Liên hệ
                </Link>
              </div>
            </div>

            <div className="item flex flex-col justify-start items-start gap-6">
              <h3 className="text-[20px] text-textBlack font-[600] ">
                Danh mục
              </h3>
              <div className="flex flex-col justify-start items-start gap-3">
                <Link
                  to="/category/novels"
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Tiểu thuyết
                </Link>
                <Link
                  to="/category/science-fiction"
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Khoa học viễn tưởng
                </Link>
                <Link
                  to="/category/history"
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Lịch sử
                </Link>
                <Link
                  to="/category/self-help"
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Phát triển bản thân
                </Link>
                <Link
                  to="/category/cookbooks"
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Sách nấu ăn
                </Link>
              </div>
            </div>

            <div className="item flex flex-col justify-start items-start gap-6">
              <h3 className="text-[20px] text-textBlack font-[600]">
                Trung tâm hỗ trợ
              </h3>
              <div className="flex flex-col justify-start items-start gap-3">
                <Link
                  to=""
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Đơn hàng của bạn
                </Link>
                <Link
                  to=""
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Tài khoản của bạn
                </Link>
                <Link
                  to=""
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Theo dõi đơn hàng
                </Link>
                <Link
                  to=""
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  Sản phẩm yêu thích
                </Link>
                <Link
                  to="/faq"
                  className="text-[16px] text-textBlack font-normal hover:text-blue-500"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="footer-center grid grid-cols-3 py-[45px]">
            <div className="item flex flex-col justify-start items-start gap-6">
              <h5 className="text-[16px] text-textBlack font-medium">
                ©2024 Book Havens All rights reserved
              </h5>
            </div>

            <div className="item flex flex-col justify-start items-center gap-6">
              <div className="flex flex-col justify-start items-start gap-3"></div>
            </div>

            <div className="item flex flex-col justify-start items-end gap-6">
              <div className="flex flex-col justify-start items-start gap-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
