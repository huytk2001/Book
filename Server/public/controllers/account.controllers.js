const db = require("../config/database");
const util = require("node:util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Account = require("../models/account.model");
exports.index = function(req, res) {
    Account.getAll(function(err, data) {
        res.send({
            result: data ? data : [data],
            message: "",
            code: 200,
        });
    });
};
exports.store = async function(req, res) {
    const data = req.body;
    try {
        if (!data || !data.email || !data.password) {
            return res
                .status(400)
                .send({ error: "Email và mật khẩu là bắt buộc phải nhập" });
        }

        const result = function(err, response) {
            if (err) {
                res.status(500).send({ error: err.message });
            } else {
                res.status(200).send({ result: response });
            }
        };

        Account.store(data, result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
exports.getOne = function(req, res) {
    Account.getOne(req.params.id, function(err, data) {
        if (err) {
            res.send({
                result: "",
                message: "Id tài khoản không tồn tại",
                code: 500,
            });
        } else {
            res.send({
                result: data,
                message: "Id tài khoản người dùng",
                code: 200,
            });
        }
    });
};
exports.update = function(req, res) {
    req.body.id = req.params.id;
    Account.update(req.body, function(err, data) {
        if (err) {
            res.send({
                result: "",
                message: "Id tài khoản không tồn tại",
                code: 500,
            });
        } else {
            res.send({
                result: data ? data : [],
                message: "Id tài khoản không tồn tại",
                code: 200,
            });
        }
    });
};
// exports.delete = async function (req, res) {
//   let id = req.params.id;
//   let role = req.user.role; // Giả sử vai trò của người dùng được lưu trong req.user.role

//   try {
//     // Gọi hàm xóa tài khoản từ model, truyền vào cả id và role của người dùng
//     await Account.delete(id, role);

//     // Trả về thông báo xóa thành công nếu không có lỗi
//     res.status(200).send({
//       message: "Xóa tài khoản thành công",
//       deletedAccountId: id,
//     });
//   } catch (error) {
//     // Xử lý lỗi và trả về thông báo lỗi tương ứng
//     res.status(error.code || 500).send({
//       message: error.message || "Lỗi trong quá trình xóa tài khoản",
//       error: error,
//     });
//   }
// };
exports.delete = function(req, res) {
    let id = req.params.id;
    Account.delete(req, function(err, message, data) {
        if (err) {
            res.send({
                message: err.msg,
                code: err.errno,
            });
        } else {
            res.send({
                message: "Xóa thành công",
                code: 200,
            });
        }
    });
};
exports.checklogin = async function(req, res) {
    const { email, password } = req.body;

    try {
        const existingUser = await Account.findByEmail(email);
        if (!existingUser) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }

        // So sánh mật khẩu sử dụng bcrypt.compare
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mật khẩu không đúng" });
        }

        // Thời hạn token là 1 ngày
        const expiresIn = 60 * 60 * 24;

        // Tạo access token và refresh token
        const accessToken = jwt.sign({
                id: existingUser.id,
                email: existingUser.email,
                role: existingUser.role,
            },
            process.env.JWT_SECRET, { expiresIn }
        );

        const refreshToken = jwt.sign({ id: existingUser.id },
            process.env.JWT_SECRET, { expiresIn: "7d" }
        );

        console.log("Generated Access Token:", accessToken);
        console.log("Generated Refresh Token:", refreshToken);

        // Lưu trữ Refresh Token ở đây

        // Gửi token trong phản hồi
        res.cookie("accessToken", accessToken);
        res.cookie("refreshToken", refreshToken);

        return res.status(200).json({
            message: "Đăng nhập thành công",
            userId: existingUser.id,
            email: existingUser.email,
            role: existingUser.role,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Đã có lỗi xảy ra" });
    }
};