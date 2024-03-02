import React, { useState } from "react";
import Header from "./common/Header";
import axios from "axios";
import Bglogin from "../../assets/images/log-in.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "../../redux/actions/userActions";
import { Link } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    email: yup.string().required("Vui lòng nhập email"),
    password: yup
      .string()
      .min(8, "Password phải từ 8 kí tự trở trên")
      .required("Vui lòng nhập password"),
  })
  .required();

export default function Register() {
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
      <section className="login-section py-10  flex relative items-center z-0 justify-center ">
        <div className="container-fluid-lg mx-auto md:px-0">
          <div className="row w-[100%]   md:mx-[-12px]  ">
            <div className="  relative m-auto flex w-full px-3 ">
              <div className="right bg-them-gray md:ml-3 md:ml-[72px]  md:mr-[72px] md:px-3 flex-grow flex flex-col justify-center">
                <div className="log-in-box  px-10 py-10">
                  <div className="log-in-title mb-2">
                    <h3 className="font-medium leading-tight m-0 text-[20px]">
                      Chào mừng bạn đến với FamersMarket
                    </h3>
                    <h4 className="leading-6 m-0 font-normal text-[18px] mt-2">
                      Đăng nhập vào tài khoản của bạn
                    </h4>
                  </div>
                  <div className="input-box ">
                    <form
                      className="flex flex-col"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="from-floating relative mt-4">
                        <input
                          className="w-full h-[50px] px-3 border"
                          {...register("email")}
                        />
                      </div>
                      <div className="from-floating relative mt-4">
                        <input
                          type="password"
                          className="w-full h-[50px] px-3 border required:"
                          {...register("password")}
                        />
                      </div>
                      <div className="forgot-box mt-4 flex items-center justify-between">
                        <div className="rm flex items-center ">
                          <input
                            className="checkbox"
                            type="checkbox"
                            id="CheckDefault"
                          />
                          <label
                            className="form-check-label ml-2"
                            htmlFor="CheckDefault"
                          >
                            Ghi nhớ
                          </label>
                        </div>
                        <div className=" ">
                          <Link
                            to=""
                            className="forgot-password ml-2 text-[16px] text-theme-color"
                          >
                            Quên mật khẩu?
                          </Link>
                        </div>
                      </div>
                      <div className=" mt-4 log-in flex justify-center items-center w-100 h-[50px] overflow-hidden transition-all duration-300 ease-in-out text-white rounded-lg font-semibold bg-red-600">
                        <button className="btn-login " disabled={loading}>
                          Đăng nhập
                        </button>
                      </div>
                      {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
                    </form>
                  </div>
                  <div className="other-log-in mt-4 relative text-center">
                    <div className="relative">
                      <h6 className="bg-them-gray uppercase px-14 py-2 inline-block relative z-10">
                        Hoặc
                      </h6>
                      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-full h-[0.5px] bg-textddd"></div>
                    </div>
                  </div>
                  <div className="other-sign-up mt-10 text-center">
                    <h4 className="text-text7777  leading-6 m-0 font-normal  mb-2 text-[18px]">
                      Bạn chưa có tài khoản?
                    </h4>
                    <Link
                      to="/register/user"
                      className="text-theme-color text-[16px] font-[500]"
                    >
                      Đăng ký
                    </Link>
                  </div>
                </div>
              </div>
              <div className="left flex hidden md:flex">
                <div className="flex items-center justify-center h-full px-3 md:ml-[72px]">
                  <img src={Bglogin} alt="Background" />{" "}
                  {/* Add alt text for accessibility */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
