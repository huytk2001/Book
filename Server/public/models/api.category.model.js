// category.model.js
const db = require("../config/database");
const util = require("node:util");
const query = util.promisify(db.query).bind(db);

const Category = {};

Category.getAll = async function (req, callback) {
  try {
    let sql = "SELECT * FROM categories";
    let _name = req.query.name;
    let _page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = 10;
    let _start = (_page - 1) * limit;

    if (_name) {
      sql += " WHERE name LIKE '%" + _name + "%'";
    }

    let sql_total = "SELECT COUNT(*) as total FROM categories";
    let rowData = await query(sql_total);
    let totalRow = rowData[0].total;
    let totalPage = Math.ceil(totalRow / limit);

    _page = _page > 0 ? Math.min(_page, totalPage) : 1;

    sql += " ORDER BY id ASC LIMIT ?, ?";
    let params = [_start, limit];

    db.query(sql, params, function (err, data) {
      callback(err, data, totalPage, _page, _name);
    });
  } catch (error) {
    throw new Error("Error retrieving categories from the database");
  }
};

Category.delete = function (req, res, callback) {
  let id = req.params.id;
  let sql_delete_category = "DELETE FROM categories WHERE id = ?";
  db.query(sql_delete_category, [id], function (err, data) {
    if (err) {
      let msg = "";
      let errno = err.errno;
      if (errno == 1541) {
        msg = "Danh mục đang có sản phẩm không thể xóa";
      } else if (errno == 2000) {
        msg = "Tên danh mục này bị trùng";
      } else {
        msg = "Đã có lỗi, vui lòng thử lại";
      }
      callback({ msg, errno }, null);
    } else {
      callback(null, "Xóa danh mục thành công", data);
    }
  });
};

Category.getOne = function (id, callback) {
  db.query("SELECT * FROM categories WHERE id = ?", [id], function (err, data) {
    if (data.length) {
      callback(false, data[0]);
    } else {
      callback({ msg: "Không tìm thấy dữ liệu", errno: 404 }, null);
    }
  });
};

Category.getCategoryById = async function (id) {
  let getCategoryQuery = "SELECT name FROM categories WHERE id = ?";
  let currentCategory = await query(getCategoryQuery, [id]);
  return currentCategory[0];
};

Category.checkCategoryExists = async function (name) {
  let checkExists = await query(
    "SELECT COUNT(id) as count FROM categories WHERE name = ?",
    [name]
  );
  return checkExists[0].count > 0;
};

Category.updateCategory = async function (id, newData) {
  try {
    let getCategoryQuery = "SELECT name FROM categories WHERE id = ?";
    let currentCategory = await query(getCategoryQuery, [id]);

    if (newData.name !== currentCategory[0].name) {
      let checkExists = await query(
        "SELECT COUNT(id) as count FROM categories WHERE name = ?",
        [newData.name]
      );

      if (checkExists[0].count > 0) {
        throw new Error("Danh mục với cùng tên đã tồn tại");
      }
    }

    let sql = "UPDATE categories SET ? WHERE id = ?";
    let result = await query(sql, [newData, id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
};
Category.dataComboBox = function (callback) {
  db.query(
    "SELECT id,name FROM categories Order By name ASC",
    function (err, data) {
      callback(err, data);
    }
  );
};
Category.createCategory = async function (categoryData) {
  try {
    let sql = "INSERT INTO categories SET ?";
    await query(sql, categoryData);
    return true;
  } catch (error) {
    throw new Error("Error creating category: " + error.message);
  }
};

module.exports = Category;
