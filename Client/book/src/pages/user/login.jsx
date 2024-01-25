import React, { useState } from "react";
import Header from "./common/Header";
import axios from "axios";
import Bglogin from "../../assets/images/log-in.png";
import { Link } from "react-feather";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/account/login", {
        email: email,
        password: password,
      });

      console.log("Registration successful:", response.data);

      // Sau khi đăng ký thành công, bạn có thể thực hiện các thao tác khác, chẳng hạn chuyển hướng trang.
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      {/* <section className="login-section py-10  flex relative items-center z-0 justify-center ">
        <div className="w-[1280px] h-auto m-auto flex items-center justify-between">
          <div className="w-full flex flex-col justify-center items-center">
            <div>
              <h2>Chào mừng bạn đến với chúng tôi</h2>
            </div>
            <form onSubmit={handleRegister}>
              <div className="relative">
                <input
                  type="text"
                  className="w-[400px] h-[50px] px-3 border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <label
                  className="absolute top-1/2 left-3 text-[14px] -translate-y-1/2 bg-white px-1 text-text7777 pointer-events-none"
                  htmlFor="email"
                ></label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  className="w-[400px] h-[50px] px-3 border"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <label
                  className="absolute top-1/2 left-3 text-[14px] -translate-y-1/2 bg-white px-1 text-text7777 pointer-events-none"
                  htmlFor="password"
                ></label>
              </div>

              <div className="flex justify-center bg-theme-color">
                <button type="submit" className="btn btn-primary">
                  {loading ? "Đang đăng ký..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section> */}
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
                    <form className="flex flex-col">
                      <div className="from-floating relative mt-4">
                        <input className="w-full h-[50px] px-3 border" />
                        <label
                          className="absolute top-1/2 left-3 text-[14px] -translate-y-1/2 bg-white px-1 text-text7777 pointer-events-none"
                          htmlFor="email"
                        >
                          Email
                        </label>
                      </div>
                      <div className="from-floating relative mt-4">
                        <input
                          type="password"
                          className="w-full h-[50px] px-3 border required:"
                        />
                        <label
                          className="absolute top-1/2 left-3 text-[14px] -translate-y-1/2 bg-white px-1 text-text7777 pointer-events-none"
                          htmlFor="password"
                        >
                          Mật khẩu
                        </label>
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

                  <div className="other-log-in mt-6 relative">
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-full h-[0.5px] bg-textddd"></div>
                    <h6></h6>
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
                  <img src={Bglogin} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
