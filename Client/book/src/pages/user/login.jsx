import React, { useState } from "react";
import Header from "./common/Header";
import axios from "axios";
import BgAi from "../../assets/images/ai-removebg-preview.png";
import BgClound from "../../assets/images/cloud-removebg-preview.png";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "../../redux/actions/userActions";
import { Link } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TitleLogin from "./common/Title/TitleLogin";
import Footer from "../../pages/user/common/Footer";
const schema = yup
  .object({
    email: yup.string().required("Vui lòng nhập email"),
    password: yup
      .string()
      .min(8, "Password phải từ 8 kí tự trở trên")
      .required("Vui lòng nhập password"),
  })
  .required();

export default function SignUp() {
  const { accessToken } = useSelector((state) => state.user); // Correct typo in 'accessToken'
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook properly
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/account/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log("Response data:", response.data); // Log response data
      if (response.status === 200) {
        const { user, userId, email, role, accessToken, refreshToken } =
          response.data;
        console.log("User:", user);
        console.log("UserID:", userId);
        console.log("Email:", email);
        console.log("Role:", role);
        console.log("AccessToken:", accessToken);
        console.log("RefreshToken:", refreshToken);

        if (role === "user") {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          dispatch(login(user, userId, email, role, accessToken, refreshToken));
          reset(); // Clear the form fields
          navigate("/"); // Navigate to the home page
        } else if (role === "Admin") {
          setError(
            "Bạn là người quản lý. Hãy truy cập vào trang đăng nhập dành riêng cho Người quản lý."
          );
        }
      }
    } catch (err) {
      if (err.response.status === 400) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong!");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <TitleLogin />
      <section className="login-section  ">
        <div className="form-container">
          <div className="col col-1  ">
            <div className="image-layer  relative flex   ">
              <img src={BgAi} className="form-image-main w-[350px] fi-2  " />
              <div className="flex flex-col">
                <img
                  src={BgClound}
                  className="from-image-1  w-[200px] absolute  fi-1 "
                />
                <img
                  src={BgClound}
                  className="from-image-2 w-[90px] object-contain ml-[40px]  mt-[220px]   fi-1 "
                />
                <img
                  src={BgClound}
                  className="from-image-3 fi-1  absolute left-[0] w-[90px] "
                />
              </div>
            </div>
          </div>
          <div className="col col-2 relative w-[45%] p-5 overflow-hidden">
            <div className="btn-box flex items-center justify-center gap-2">
              <button
                className="btn font-[500 ] px-[30px] py-[5px]  bg-custom rounded-[30px]  text-textwhite bg-opacity-20 shadow-md btn-1 hover:opacity-[0.85s]"
                id="login"
              >
                <NavLink to="/login/user">Sign in</NavLink>
              </button>

              <button
                className=" btn font-[500 ] px-[30px] py-[5px]  bg-teal-200  rounded-[30px]  text-textwhite bg-opacity-20 shadow-md btn-1 hover:opacity-[0.85s]"
                id="register"
              >
                <NavLink to="/register/user">Sign up</NavLink>
              </button>
            </div>

            <div className="login-form absolute left-[50%] transform -translate-x-1/2 flex items-center justify-center w-full flex-col px-[4vw] transition-[0.3s]">
              <div className="form-title mt-10 mb-5 my-10 text-textwhite text-[28px] font-[600]">
                <span>Sign In</span>
              </div>
              <div className="form-inputs w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-box relative">
                    <input
                      type="text"
                      className="input-field w-full h-[55px] px-[15px] text-textBlack outline-none bg-input border-none rounded-[10px] my-[10px] font-[15px] "
                      placeholder="Email"
                      {...register("email")}
                      required
                    />
                    <i className=" bx bx-envelope  absolute top-1/2 right-[15px] transform -translate-y-1/2 "></i>
                  </div>
                  <div className="input-box relative">
                    <input
                      type="password"
                      className="input-field w-full h-[55px] px-[15px] text-textBlack outline-none bg-input border-none rounded-[10px] my-[10px] font-[15px] "
                      placeholder="Password"
                      {...register("password")}
                      required
                    />
                    <i className="bx bx-lock-alt icon absolute top-1/2 transform -translate-y-1/2 right-[15px]"></i>
                  </div>
                  <div className="forget-pass flex justify-end gap-[14px]">
                    <a
                      className=" text-textwhite  no-underline text-[14px] hover:underline"
                      href="#"
                    >
                      Forgot Password
                    </a>
                  </div>
                  <div className="input-box relative ">
                    <button className="input-submit flex items-center justify-center gap-[10] w-full h-[55px] px-[15px] text-textwhite bg-background my-[10px] border-none shadow-lg rounded-[4px] cursor-pointer transition-[0.3s] ">
                      <span>Sign In</span>
                      <i className="bx bx-right-arrow-alt"></i>
                    </button>
                  </div>

                  <div className="social-login flex items-center justify-center gap-2 mt-2">
                    <i className="bx bxl-google flex items-center justify-center h-10 w-10 text-textwhite bg-white bg-opacity-30 border-none shadow-lg cursor-pointer transition-[0.2] rounded-[50%] transform "></i>
                    <i className="bx bxl-facebook flex items-center justify-center h-10 w-10 text-textwhite bg-white bg-opacity-30 border-none shadow-lg cursor-pointer transition-[0.2] rounded-[50%]"></i>
                    <i className="bx bxl-twitter flex items-center justify-center h-10 w-10 text-textwhite bg-white bg-opacity-30 border-none shadow-lg cursor-pointer transition-[0.2] rounded-[50%]"></i>
                    <i className="bx bxl-github flex items-center justify-center h-10 w-10 text-textwhite bg-white bg-opacity-30 border-none shadow-lg cursor-pointer transition-[0.2] rounded-[50%]"></i>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
