import React from "react";
import Header from "./common/Header";
import BgSignIn from "../../assets/images/sign-up.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import TitleRegister from "../user/common/Title/TitleSignUp";
const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên của bạn"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Data submitted:", data); // Thêm dòng log này để xem dữ liệu được gửi đi
    try {
      const response = await axios.post(
        "http://localhost:4000/api/account/create",
        data
      );
      navigate("/login/user");
    } catch (error) {
      if (error.response) {
        setError("Error", {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        setError("Error", {
          type: "manual",
          message: "Đã xảy ra lỗi xác nhận",
        });
      }
    }
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);

  // const handleLogin = async (event) => {
  //   event.preventDefault();

  //   setLoading(true);

  //   try {
  //     const response = await axios.post("http://localhost:4000/account/add", {
  //       email: email,
  //       password: password,
  //     });

  //     console.log("Login successful:", response.data);

  //     // Sau khi đăng nhập thành công, bạn có thể thực hiện các thao tác khác, chẳng hạn chuyển hướng trang.
  //   } catch (error) {
  //     console.error("Login failed:", error.response.data.message);
  //   }

  //   setLoading(false);
  // };

  return (
    <>
      <Header />
      <TitleRegister />
      <section className="login-section py-10  flex relative items-center z-0 justify-center ">
        <div className="container-fluid-lg  ">
          <div className="row w-[100%]   mx-[-12px]  ">
            <div className=" relative m-auto flex w-full ">
              <div className="right  bg-them-gray   ml-[72px] mr-[72px] px-3">
                <div className="log-in-box  px-10 py-10">
                  <div className="log-in-title mb-2">
                    <h3 className="font-medium leading-tight m-0 text-[20px]">
                      Chào mừng bạn đến với FamersMarket
                    </h3>
                    <h4 className="leading-6 m-0 font-normal text-[18px] mt-2">
                      Đăng ký tài khoản{" "}
                    </h4>
                  </div>
                  <div className="input-box">
                    <form
                      className="flex flex-col"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="from-floating relative mt-4">
                        <input
                          type="text"
                          className="w-full h-[50px] px-3 border"
                          id="name"
                          required
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-500 mt-2">
                            {errors.name.message}
                          </p>
                        )}
                        {/* <label
                          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white px-1 text-text7777 text-[16px] pointer-events-none"
                          htmlFor="fname"
                        >
                          Họ và tên
                        </label> */}
                      </div>
                      <div className="from-floating relative mt-4">
                        <input
                          type="email"
                          className="w-full h-[50px] px-3 border"
                          id="email"
                          required
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-red-500 mt-2">
                            {errors.email.message}
                          </p>
                        )}
                        {/* <label
                          className="absolute top-1/2 left-3 -translate-y-1/2  bg-white px-1 text-text7777 text-[16px] pointer-events-none"
                          htmlFor="email"
                        >
                          Email
                        </label> */}
                      </div>
                      <div className="from-floating relative mt-4">
                        <input
                          type="password"
                          className="w-full h-[50px] px-3 border required:"
                          id="password"
                          required
                          {...register("password")}
                        />
                        {errors.password && (
                          <p className="text-red-500 mt-2">
                            {errors.password.message}
                          </p>
                        )}
                        {/* <label
                          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white px-1 text-text7777 text-[16px] pointer-events-none"
                          htmlFor="password"
                        >
                          Mật khẩu
                        </label> */}
                      </div>
                      <div className="forgot-box mt-4 flex items-center justify-between"></div>
                      <div className=" mt-4 log-in flex justify-center items-center w-100 h-[50px] overflow-hidden transition-all duration-300 ease-in-out text-white rounded-lg font-semibold bg-red-600">
                        <button className="btn-sign " type="submit">
                          Đăng ký
                        </button>
                        {errors.apiError && (
                          <p className="text-red-500 mt-2">
                            {errors.apiError.message}
                          </p>
                        )}{" "}
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

                  {/* <div className="other-log-in mt-6 relative">
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-full h-[0.5px] bg-textddd font-[300]"></div>
                    <h6></h6>
                  </div> */}

                  <div className="other-sign-up mt-10 text-center">
                    <h4 className="text-text7777  leading-6 m-0 font-normal  mb-2 text-[18px]">
                      Đã có tài khoản rồi?
                    </h4>
                    {/* <Link
                      to="/login/user"
                      className="text-theme-color text-[16px] font-[500]"
                    >
                      Đăng nhập
                    </Link> */}
                  </div>
                </div>
              </div>
              <div className="left flex ">
                <div className="flex items-center justify-center h-full px-3 ml-[72px] ">
                  <img src={BgSignIn} alt="Background" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="bg-them-gray mt-40">
        <div className="w-[1280px] h-auto m-auto flex items-center justify-between">
          <div className="w-full flex flex-col justify-center items-center">
            <div>
              <h2>Chào mừng bạn đến với chúng tôi</h2>
            </div>
            <form onSubmit={handleLogin}>
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
    </>
  );
}
