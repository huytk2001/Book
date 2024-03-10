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

exports.editCategory = async function (req, res) {
  let id = req.params.id;
  let newName = req.body.name;
  let bodyData = req.body;
  console.log(bodyData);
  console.log(req.file);

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
