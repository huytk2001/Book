import Logo from "../../../assets/images/Logo.png";
import { Search, ShoppingCart, User } from "react-feather";
import { Link } from "react-router-dom";

import { useState } from "react";
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
      <div className="center-header w-auto h-full m-auto bg-them-gray py-[35px]">
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
                <Search name="search" size={24} className="text-theme-color" />
              </button>
            </form>
          </div>
          <div className="relative flex justify-center">
            <ShoppingCart name="cart" size={24} color="black" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
