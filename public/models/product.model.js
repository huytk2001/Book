const e = require("connect-flash");
const db = require("../config/database");
const util = require("node:util");
const query = util.promisify(db.query).bind(db);

const Product = {};
Product.getAll = async function(req, callback) {
    try {
        let sql =
            "SELECT p.*, c.name as cname FROM book p LEFT JOIN categories c ON p.categoryID = c.id";
        let _name = req.query.name ? req.query.name : ""; // Ensure _name is initialized even if not provided
        let _page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = 5;
        let _start = (_page - 1) * limit;

        // Build the main SQL query
        if (_name) {
            sql += " WHERE p.name LIKE '%" + _name + "%'";
        }

        // Query to get the total number of rows
        let sql_total = "SELECT COUNT(*) as total FROM book";
        let rowData = await query(sql_total);
        let totalRow = rowData[0].total;
        let totalPage = Math.ceil(totalRow / limit);

        // Adjust page number
        _page = _page > 0 ? Math.min(_page, totalPage) : 1;

        // Modify SQL query for pagination
        sql += " ORDER BY p.id ASC LIMIT ?, ?";
        let params = [_start, limit];

        // Execute the modified query
        db.query(sql, params, function(err, data) {
            callback(err, data, totalPage, _page, _name);
        });
    } catch (error) {
        // Handle any errors
        console.error("Error retrieving books from the database:", error);
        callback(error); // Pass the error to the callback
    }
};

Product.delete = function(req, callback) {
    let id = req.params.id;
    let sql_delete_Product = "DELETE FROM book WHERE id = ?";
    db.query(sql_delete_Product, [id], function(err, data) {
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

Product.getOne = function(id, callback) {
    db.query("SELECT * FROM book WHERE id = ?", [id], function(err, data) {
        if (data.length) {
            callback(false, data[0]);
        } else {
            callback({ msg: "Không tìm thấy dữ liệu", errno: 404 }, null);
        }
    });
};

Product.getProductById = async function(id) {
    let getProductQuery = "SELECT name FROM book WHERE id = ?";
    let currentProduct = await query(getProductQuery, [id]);
    return currentProduct[0];
};

Product.checkProductExists = async function(name) {
    let checkExists = await query(
        "SELECT COUNT(id) as count FROM book WHERE name = ?", [name]
    );
    return checkExists[0].count > 0;
};

Product.updateProduct = async function(id, newData) {
    try {
        let getProductQuery = "SELECT name FROM book WHERE id = ?";
        let currentProduct = await query(getProductQuery, [id]);

        if (newData.name !== currentProduct[0].name) {
            let checkExists = await query(
                "SELECT COUNT(id) as count FROM book WHERE name = ?", [newData.name]
            );

            if (checkExists[0].count > 0) {
                throw new Error("Tên sản phẩm với cùng tên đã tồn tại");
            }
        }

        let sql = "UPDATE book SET ? WHERE id = ?";
        let result = await query(sql, [newData, id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Error updating book: " + error.message);
    }
};
Product.update = function(newData, id, callback) {
    let sql = "UPDATE book SET ? WHERE id = ?";
    db.query(sql, [newData, id], (err, data) => {
        if (err) {
            let msg = "";
            if (err.errno == 1062) {
                msg = "Tên sản phẩm đã tồn tại, hãy chọn tên khác";
            } else if (err.errno == 2000) {
                msg = "Tên sản phẩm bị trùng";
            } else {
                msg = "Đã xảy ra lỗi, vui lòng thử lại";
            }
            callback({ msg, errno: err.errno }, null);
        } else {
            callback(null, data);
        }
    });
};

Product.store = function(bodyData, callback) {
    console.log("Body data received:", bodyData); // Log bodyData để kiểm tra
    let sql = "INSERT INTO book SET ?";
    db.query(sql, bodyData, (err, data) => {
        if (err) {
            let msg = "";
            if (err.errno == 1062) {
                msg = "Tên sản phẩm đã tồn tại, hãy chọn tên khác";
            } else if (err.errno == 2000) {
                msg = "Tên sản phẩm bị trùng";
            } else {
                msg = "Đã xảy ra lỗi, vui lòng thử lại";
            }
            callback({ msg, errno: err.errno }, null);
        } else {
            callback(null, data);
        }
    });
};

module.exports = Product;