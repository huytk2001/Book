const db = require("../config/database");
const util = require("util");
const query = util.promisify(db.query).bind(db);
const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");
const { log } = require("console");
const Product = require("../models/product.model");
exports.index = async function (req, res) {
  try {
    productModel.getAll(req, function (err, data, totalPage, _page, _name) {
      res.render("product", {
        title: "Quản lý sản phẩm",
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

exports.edit = async function (req, res) {
  let sql_cats = "SELECT id, name From categories order by name asc";
  let id = req.params.id;
  let queryCat = await query(sql_cats);
  productModel.getOne(id, function (err, data) {
    if (err) {
      res.render("error", {
        message: err.msg,
        code: err.errno,
      });
    } else {
      res.render("product-edit", {
        product: data,
        cats: queryCat,
      });
    }
  });
};

exports.editProduct = async function (req, res) {
  let id = req.params.id;

  productModel.getOne(id, function (err, data) {
    if (err) {
      res.render("error", {
        message: err.msg,
        code: err.errno,
      });
    } else {
      // Lấy danh sách các danh mục
      productModel.getAll(function (err, categories) {
        if (err) {
          res.render("error", {
            message: "Không thể tải danh mục",
            code: 500,
          });
        } else {
          res.render("product-edit", {
            cat: data,
            cat: categories, // Thay đổi tên biến từ "cat" thành "categories"
          });
        }
      });
    }
  });
};

exports.update = async (req, res) => {
  let id = req.params.id;
  let newData = req.body; // Dữ liệu mới cần cập nhật
  console.log(req.file);
  console.log("Received body data:", newData);
  if (req.file) {
    // If yes, add the file name to newData
    newData.image = req.file.filename;
  }
  Product.update(newData, id, function (err, data) {
    if (err) {
      res.render("error", {
        message: err.msg,
        code: err.errno,
      });
    } else {
      res.redirect("/product"); // Chỉnh sửa đường dẫn để chuyển hướng đúng
    }
  });
};

exports.deleteProduct = function (req, res) {
  let id = req.params.id;
  productModel.delete(req, function (err, message, data) {
    if (err) {
      res.render("error", {
        message: err.msg,
        code: err.errno,
      });
    } else {
      res.redirect("/product");
    }
  });
};

exports.create = function (req, res) {
  categoryModel.dataComboBox(function (err, cats) {
    res.render("product-add", {
      cats: cats.length ? cats : [],
    });
  });
};

exports.store = function (req, res) {
  let bodyData = req.body;
  console.log("Received body data:", bodyData); // Log dữ liệu nhận được từ body
  productModel.store(bodyData, function (err, data) {
    if (err) {
      res.render("error", {
        message: err.msg,
        code: err.errno,
      });
    } else {
      res.redirect("/product");
    }
  });
};
