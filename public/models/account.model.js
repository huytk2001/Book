const db = require("../config/database");
const util = require("node:util");
const query = util.promisify(db.query).bind(db);
const Account = {};
const bcrypt = require("bcrypt");

Account.getAll = function(myFun) {
    let sql = "SELECT * FROM users Order By id DESC";
    db.query(sql, function(err, data) {
        myFun(err, data);
    });
};

Account.getOne = function(id, myFun) {
    let sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id], function(err, data) {
        myFun(err, { result: data.length > 0 ? data[0] : "" });
    });
};

Account.store = async function(body, myFun) {
    try {
        // Kiểm tra xem email đã được sử dụng chưa
        const [existingUser] = await db
            .promise()
            .execute("SELECT * FROM users WHERE email = ?", [body.email]);

        if (existingUser.length > 0) {
            return myFun({ message: "Email đã được sử dụng" });
        }

        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;

        // Lưu thông tin người dùng vào cơ sở dữ liệu
        db.query("INSERT INTO users SET ?", body, function(err, users) {
            if (err) {
                myFun(err);
            } else {
                myFun(null, { id: users.insertId, ...body });
            }
        });
    } catch (err) {
        console.error("Error in create", err);
        myFun(err);
    }
};
Account.findByEmail = async function(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], function(err, result) {
            if (err) {
                console.error("Error in findByEmail:", err);
                reject(err);
            } else {
                console.log("Result:", result); // Log kết quả từ truy vấn
                // Trả về kết quả nếu tìm thấy người dùng
                resolve(result.length > 0 ? result[0] : null);
            }
        });
    });
};

// Account.checkLogin
Account.update = function(body, myFun) {
    let sql = "UPDATE users SET ? WHERE id = ?";
    db.query(sql, [body, body.id], async function(err, data) {
        let account = await query("SELECT * FROM users WHERE id = ? ", [body.id]);
        let dataBody = account.length > 0 ? account[0] : "";
        myFun(err, dataBody);
    });
};

Account.delete = function(req, callback) {
    let id = req.params.id;
    let sql_delete_Account = "DELETE FROM users WHERE id = ?";
    db.query(sql_delete_Account, [id], function(err, data) {
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

Account.checkLogin = async function(body, myFun) {
    let sql = "SELECT * FROM users WHERE email = ?  AND password = ?";
    db.query(sql, [body.email, body.password], function(err, data) {
        myFun(err, { result: data.length > 0 ? data[0] : "" });
    });
};

module.exports = Account;