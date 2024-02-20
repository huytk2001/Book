const db = require("../config/database");
const util = require("node:util");

const Account = require("../models/account.model");
exports.index = function (req, res) {
  Account.getAll(function (err, data) {
    res.send({
      result: data ? data : [data],
      message: "",
      code: 200,
    });
  });
};
exports.store = function (req, res) {
  Account.store(req.body, function (err, data) {
    if (err) {
      res.send({
        result: "",
        message: "",
        code: 500,
      });
    } else {
      res.send({
        result: req.body,
        message: "Thêm mới tài khoản thành công",
        code: 200,
      });
    }
  });
};
exports.getOne = function (req, res) {
  Account.getOne(req.params.id, function (err, data) {
    if (err) {
      res.send({
        result: "",
        message: "Id tài khoản không tồn tại",
        code: 500,
      });
    } else {
      res.send({
        result: data,
        message: "Id tài khoản không tồn tại",
        code: 500,
      });
    }
  });
};
exports.update = function (req, res) {
  req.body.id = req.params.id;
  Account.update(req.body, function (err, data) {
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
exports.delete = function (req, res) {
  let id = req.params.id;
  Account.delete(req, function (err, message, data) {
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
