const db = require("../config/database");
const bcrypt = require("bcrypt");

const User = function (users) {
  this.id = users.id;
  this.name = users.name;
  this.email = users.email;
  this.password = users.password;
};

User.create = function (data, result) {
  // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
  bcrypt.hash(data.password, 10, function (err, hashedPassword) {
    if (err) {
      return result(err);
    }

    // Thêm mật khẩu đã băm vào đối tượng người dùng mới
    data.password = hashedPassword;

    // Thực hiện truy vấn SQL để thêm người dùng mới vào cơ sở dữ liệu
    db.query("INSERT INTO users SET ?", data, function (err, users) {
      if (err) {
        return result(err);
      } else {
        // Gọi callback với kết quả, bao gồm ID mới được chèn và dữ liệu người dùng
        result(null, { id: users.insertId, ...data });
      }
    });
  });
};

User.get_all = function (result) {
  db.query("SELECT * FROM users", function (err, users) {
    if (err) {
      return result(err, null);
    } else {
      return result(null, users);
    }
  });
};
User.getById = function (id, result) {
  console.log(id);
  db.query("SELECT *FROM users WHERE id = ? ", id, function (err, users) {
    if (err) {
      return null;
    } else {
      return users;
    }
  });
};
module.exports = User;
