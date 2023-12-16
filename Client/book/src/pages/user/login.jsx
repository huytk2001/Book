import React, { useState } from "react";
import Header from "./common/Header";
import axios from "axios";

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
      <section className="bg-them-gray mt-40">
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
      </section>
    </>
  );
}
