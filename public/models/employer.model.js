// category.model.js
const db = require("../config/database");
const util = require("node:util");
const query = util.promisify(db.query).bind(db);

const Employer = {};

Employer.getAll = async function (req, callback) {
  try {
    let sql = "SELECT * FROM users";
    let _name = req.query.name;
    let _page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = 5;
    let _start = (_page - 1) * limit;

    if (_name) {
      sql += " WHERE name LIKE '%" + _name + "%'";
    }

    let sql_total = "SELECT COUNT(*) as total FROM users";
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
    throw new Error("Error retrieving users from the database");
  }
};

Employer.delete = function (req, res, callback) {
  let id = req.params.id;
  let sql_delete_Employer = "DELETE FROM users WHERE id = ?";
  db.query(sql_delete_Employer, [id], function (err, data) {
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

Employer.getOne = function (id, callback) {
  db.query("SELECT * FROM users WHERE id = ?", [id], function (err, data) {
    if (data.length) {
      callback(false, data[0]);
    } else {
      callback({ msg: "Không tìm thấy dữ liệu", errno: 404 }, null);
    }
  });
};

Employer.getEmployerById = async function (id) {
  let getEmployerQuery = "SELECT name FROM users WHERE id = ?";
  let currentEmployer = await query(getEmployerQuery, [id]);
  return currentEmployer[0];
};

Employer.checkEmployerExists = async function (name) {
  let checkExists = await query(
    "SELECT COUNT(id) as count FROM users WHERE name = ?",
    [name]
  );
  return checkExists[0].count > 0;
};

Employer.updateEmployer = async function (id, newData) {
  try {
    let getEmployerQuery = "SELECT name FROM users WHERE id = ?";
    let currentEmployer = await query(getEmployerQuery, [id]);

    if (newData.name !== currentEmployer[0].name) {
      let checkExists = await query(
        "SELECT COUNT(id) as count FROM users WHERE name = ?",
        [newData.name]
      );

      if (checkExists[0].count > 0) {
        throw new Error("Danh mục với cùng tên đã tồn tại");
      }
    }
    let sql = "UPDATE users SET name = ?, image = ? WHERE id = ?";
    let result = await query(sql, [newData.name, newData.image, id]);

    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error updating Employer: " + error.message);
  }
};

Employer.dataComboBox = function (callback) {
  db.query("SELECT id,name FROM users Order By name ASC", function (err, data) {
    callback(err, data);
  });
};
Employer.createEmployer = async function (EmployerData) {
  try {
    let sql = "INSERT INTO users SET ?";
    await query(sql, EmployerData);
    return true;
  } catch (error) {
    throw new Error("Error creating category: " + error.message);
  }
};

module.exports = Employer;
