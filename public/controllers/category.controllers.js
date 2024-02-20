const db = require("../config/database");
const util = require("util");
const query = util.promisify(db.query).bind(db);
const categoryModel = require("../models/category.model");

exports.index = async function (req, res) {
  try {
    categoryModel.getAll(req, function (err, data, totalPage, _page, _name) {
      res.render("categories", {
        title: "Quản lý danh mục",
        data: data ? data : [],
        totalPage: totalPage,
        _page: parseInt(_page),
        _name: _name,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi máy chủ nội bộ");
  }
};

exports.edit = function (req, res) {
  let id = req.params.id;
  categoryModel.getOne(id, function (err, data) {
    if (err) {
      res.render("error", {
        message: err.msg,
        code: err.errno,
      });
    } else {
      res.render("categories-edit", {
        cat: data,
      });
    }
  });
};

// exports.editCategory = async function (req, res) {
//   let id = req.params.id;
//   let newName = req.body.name; // Lấy tên mới từ yêu cầu

//   // Truy vấn để lấy thông tin danh mục hiện tại
//   let getCategoryQuery = "SELECT name FROM categories WHERE id = ?";
//   let currentCategory = await query(getCategoryQuery, [id]);

//   // Kiểm tra xem tên mới có khác với tên hiện tại hay không
//   if (newName !== currentCategory[0].name) {
//     // Nếu tên mới khác với tên hiện tại, kiểm tra sự tồn tại của tên mới
//     let checkExists = await query(
//       "SELECT COUNT(id) as count FROM categories WHERE name = ?",
//       [newName]
//     );

//     // Nếu tên mới đã tồn tại, hiển thị lỗi
//     if (checkExists[0].count > 0) {
//       res.render("error", {
//         message: "Danh mục với cùng tên đã tồn tại",
//         code: 400,
//       });
//       return;
//     }
//   }

//   // Nếu không có lỗi, tiến hành cập nhật danh mục
//   let sql = "UPDATE categories SET ? WHERE id = ?";
//   db.query(sql, [req.body, id], function (err, data) {
//     if (err) {
//       let msg = "";
//       if (err.errno == 1062) {
//         msg = "Tên danh mục đã tồn tại, hãy chọn tên khác";
//       } else if (err.errno == 2000) {
//         msg = "Tên danh mục này đã bị trùng";
//       } else {
//         msg = "Đã có lỗi vui lòng thử lại";
//       }
//       res.render("error", {
//         message: msg,
//         code: err.errno,
//       });
//     } else {
//       if (data.affectedRows > 0) {
//         res.render("categories-edit", {
//           cat: req.body,
//         });
//       } else {
//         res.render("error", {
//           message: "Không thể cập nhật danh mục",
//           code: 500,
//         });
//       }
//     }
//   });
// };
exports.editCategory = async function (req, res) {
  let id = req.params.id;
  let newName = req.body.name;
  let bodyData = req.body;

  // Check if a file was uploaded
  if (req.file) {
    // If yes, add the file name to bodyData
    bodyData.image = req.file.filename;
  }

  try {
    let result = await categoryModel.updateCategory(id, bodyData);
    if (result) {
      res.render("categories-edit", {
        cat: bodyData,
      });
    } else {
      res.render("error", {
        message: "Không thể cập nhật danh mục",
        code: 500,
      });
    }
  } catch (error) {
    console.error(error);
    res.render("error", {
      message: error.message,
      code: 500,
    });
  }
};

exports.deleteCategory = function (req, res) {
  let id = req.params.id;
  categoryModel.delete(req, res, function (err, msg, data) {
    if (err) {
      res.render("error", {
        message: err.msg,
        code: err.errno,
      });
    } else {
      res.redirect("/categories");
    }
  });
};

exports.create = function (req, res) {
  res.render("categories-add");
};

exports.createCategory = async function (req, res) {
  try {
    let checkExists = await categoryModel.checkCategoryExists(req.body.name);
    if (checkExists) {
      return res.render("error", {
        message: "Danh mục với cùng tên đã tồn tại",
        code: 400,
      });
    }

    let result = await categoryModel.createCategory(req.body);
    if (result) {
      res.redirect("/categories");
    } else {
      res.render("error", {
        message: "Không thể tạo danh mục mới",
        code: 500,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Đã có lỗi xảy ra",
      code: 500,
    });
  }
};
