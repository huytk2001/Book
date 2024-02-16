// User.models.js

const db = require("../../public/config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = function (users) {
  this.id = users.id;
  this.name = users.name;
  this.email = users.email;
  this.password = users.password;
  this.role = users.role;
  this.dateJoin = users.dateJoin;
  this.status = users.status;
};

User.create = async function (data, result) {
  try {
    const [existingUser] = await db
      .promise()
      .execute("SELECT * FROM users WHERE email = ?", [data.email]);
    if (existingUser.length > 0) {
      return result({ message: "Email đã được sử dụng" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Tạo mã token

    // Lưu thông tin người dùng vào cơ sở dữ liệu
    db.query("INSERT INTO users SET ?", data, function (err, users) {
      if (err) {
        result(err);
      } else {
        result(null, { id: users.insertId, ...data });
      }
    });
  } catch (err) {
    console.error("Error in create", err);
    result(err);
  }
};
User.findByEmail = async function (email, callback) {
  try {
    if (typeof callback !== "function") {
      throw new TypeError("Callback is not a function");
    }

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], function (err, result) {
      if (err) {
        console.error("Error in findByEmail:", err);
        return callback(err, null);
      }
      return callback(null, result);
    });
  } catch (error) {
    console.error("Error in findByEmail:", error);
    throw error;
  }
};
User.check_login = async function (data, result) {
  try {
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [data.email, data.password],
      async function (err, users) {
        if (err) {
          console.error("Error in check_login:", err);
          return result(null); // Trả về null nếu có lỗi xảy ra
        } else if (users.length === 0) {
          return result(null); // Trả về null nếu không tìm thấy người dùng
        } else {
          const user = users[0];
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          return result({ user, token }); // Trả về thông tin người dùng và mã token nếu tìm thấy
        }
      }
    );
  } catch (err) {
    console.error("Error in check_login:", err);
    result(null);
  }
};
User.get_all = async function () {
  try {
    const [rows] = await db.promise().query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Error in get_all:", error);
    throw error;
  }
};

User.getById = async function (id) {
  try {
    const [rows] = await db
      .promise()
      .execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Error in getById:", error);
    throw error;
  }
};

module.exports = User;
