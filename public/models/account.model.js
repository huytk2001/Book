const db = require("../config/database");
const util = require("node:util");
const query = util.promisify(db.query).bind(db);
const Account = {};

Account.getAll = function (myFun) {
  let sql = "SELECT * FROM users Order By id DESC";
  db.query(sql, function (err, data) {
    myFun(err, data);
  });
};

Account.getOne = function (id, myFun) {
  let sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], function (err, data) {
    myFun(err, { result: data.length > 0 ? data[0] : "" });
  });
};

Account.store = function (body, myFun) {
  let sql = "INSERT INTO users SET ?";
  db.query(sql, body, function (err, data) {
    body.id = data.insertId;
    myFun(err, { result: body });
  });
};

Account.update = function (body, myFun) {
  let sql = "UPDATE users SET ? WHERE id = ?";
  db.query(sql, [body, body.id], async function (err, data) {
    let account = await query("SELECT * FROM users WHERE id = ? ", [body.id]);
    let dataBody = account.length > 0 ? account[0] : "";
    myFun(err, dataBody);
  });
};

Account.delete = function (req, callback) {
  let id = req.params.id;
  let sql_delete_Account = "DELETE FROM users WHERE id = ?";
  db.query(sql_delete_Account, [id], function (err, data) {
    if (err) {
      let msg = "";
      let errno = err.errno; // Lấy mã lỗi từ đối tượng lỗi
      if (errno == 1541) {
        msg = "Danh mục đang có sản phẩm không thể xóa";
      } else if (errno == 2000) {
        msg = "Tên danh mục này bị trùng";
      } else {
        msg = "Đã có lỗi, vui lòng thử lại";
      }
      callback({ msg, errno }, null); // Trả về đối tượng lỗi
    } else {
      callback(null, "Xóa danh mục thành công", data);
    }
  });
};
// Account.delete = async function (id, role, myFun) {
//   // Kiểm tra nếu role không phải là admin, không thực hiện xóa
//   if (role !== "admin") {
//     let error = new Error("Bạn không có quyền xóa tài khoản");
//     error.code = 403; // Mã lỗi 403 cho "Forbidden"
//     myFun(error, null);
//     return;
//   }

//   let account = await query("SELECT * FROM users WHERE id = ? ", [id]);
//   if (account.length === 0) {
//     let error = new Error("Không tìm thấy tài khoản");
//     error.code = 404; // Mã lỗi 404 cho "Not Found"
//     myFun(error, null);
//     return;
//   }

//   let sql = "DELETE FROM users WHERE id = ?";
//   db.query(sql, [id], function (err, data) {
//     if (err) {
//       myFun(err, null);
//     } else {
//       myFun(null, data);
//     }
//   });
// };
Account.checkLogin = async function (body, myFun) {
  let sql = "SELECT * FROM users WHERE email = ?  AND password = ?";
  db.query(sql, [body.email, body.password], function (err, data) {
    myFun(err, { result: data.length > 0 ? data[0] : "" });
  });
};

module.exports = Account;
