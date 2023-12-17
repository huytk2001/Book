import Logo from "../../../assets/images/Logo.png";
import { Search, ShoppingCart, User, ChevronDown } from "react-feather";
import { Link } from "react-router-dom";

import { useState } from "react";
import ButtonAllCategory from "../Component/ButtonAllCategory";
export default function Header() {
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

          {/* Right section (Account) */}
          <div className="account flex justify-end items-center">
            <div className="relative group">
              <Link to="/account" className="flex items-center">
                <User name="cart" size={24} color="white" />
                <h1 className="text-[14px] text-white ml-1">My Account</h1>
              </Link>
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
                </div>
              </div>
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
            <div className="relative flex justify-center">
              <ShoppingCart name="cart" size={24} color="black" />{" "}
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
