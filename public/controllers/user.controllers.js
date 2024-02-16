const User = require("../models/User.models");
const jwt = require("jsonwebtoken");

exports.add_user = async function (req, res) {
  const data = req.body;
  try {
    if (!data || !data.email || !data.password) {
      return res
        .status(400)
        .send({ error: "Email và mật khẩu là bắt buộc phải nhập" });
    }

    const result = function (err, response) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.status(200).send({ result: response });
      }
    };

    User.create(data, result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.login = async function (req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (!existingUser) {
      req.flash("error", "Email không tồn tại");
      return res.redirect("back");
    }
    if (password !== existingUser.password) {
      req.flash("error", "Mật khẩu không đúng");
      return res.redirect("back");
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token);

    if (existingUser.role === "user") {
      req.flash("success", "Đăng nhập thành công");
      return res.redirect("/");
    } else if (existingUser.role === "admin") {
      req.flash(
        "error",
        "Bạn là Admin, hãy truy cập trang đăng nhập dành cho Admin"
      );
      return res.redirect("back");
    }
  } catch (error) {
    console.error("Error in login:", error);
    req.flash("error", "Đăng nhập thất bại");
    return res.redirect("back");
  }
};
exports.list = async function (req, res) {
  console.log("Handling /book/list request");

  try {
    const data = await User.get_all();
    res.send({ result: data });
  } catch (error) {
    console.error("Error in list:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
