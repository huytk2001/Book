import React, { useState } from "react";

const LoginForm = () => {
  const [loginFormVisible, setLoginFormVisible] = useState(true);

  const switchToLogin = () => {
    setLoginFormVisible(true);
  };

  const switchToRegister = () => {
    setLoginFormVisible(false);
  };

  const loginBtnStyle = {
    backgroundColor: loginFormVisible ? "#21264D" : "rgba(255, 255, 255, 0.3)",
  };

  const registerBtnStyle = {
    backgroundColor: !loginFormVisible ? "#21264D" : "rgba(255, 255, 255, 0.3)",
  };

  const loginFormStyle = {
    left: loginFormVisible ? "50%" : "150%",
    opacity: loginFormVisible ? "1" : "0",
  };

  const registerFormStyle = {
    left: loginFormVisible ? "-50%" : "50%",
    opacity: loginFormVisible ? "0" : "1",
  };

  const col1Style = {
    borderRadius: loginFormVisible ? "0 30% 20% 0" : "0 20% 30% 0",
  };

  return (
    <div className="form-container">
      <div className="col col-1" style={col1Style}>
        {/* Image Layer */}
      </div>
      <div className="col col-2">
        <div className="btn-box">
          <button
            className="btn btn-1"
            style={loginBtnStyle}
            onClick={switchToLogin}
          >
            Sign in
          </button>
          <button
            className="btn btn-1"
            style={registerBtnStyle}
            onClick={switchToRegister}
          >
            Sign up
          </button>
        </div>
        {/* Login Form */}
        <div className="login-form" style={loginFormStyle}>
          {/* Login Form Content */}
        </div>
        {/* Register Form */}
        <div className="register-form" style={registerFormStyle}>
          {/* Register Form Content */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
