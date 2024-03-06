const db = require("../config/database");
const util = require("util");
const query = util.promisify(db.query).bind(db);
const categoryModel = require("../models/api.category.model");

exports.index = async function (req, res) {
  try {
    const { data, _name } = await new Promise((resolve, reject) => {
      categoryModel.getAll(req, function (err, data, totalPage, _page, _name) {
        if (err) {
          reject(err);
        } else {
          resolve({ data, _name });
        }
      });
    });

    res.send({
      data: data ? data : [],
      _name: _name,
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
      res.send({
        message: err.msg,
        code: err.errno,
      });
    } else {
      res.send({
        result: data,
        message: "chi tiết danh mục",
        code: 200,
      });
    }
  });
};

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
      res.send({
        cat: bodyData,
      });
    } else {
      res.send({
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
      res.send({
        message: err.msg,
        code: err.errno,
      });
    } else {
      res.send({
        message: "xóa thành công",
        code: 200,
      });
    }
  });
};

exports.createCategory = async function (req, res) {
  try {
    let checkExists = await categoryModel.checkCategoryExists(req.body.name);
    if (checkExists) {
      return res.send({
        message: "Danh mục với cùng tên đã tồn tại",
        code: 400,
      });
    }

    let result = await categoryModel.createCategory(req.body);
    if (result) {
      return res.send({
        result: req.body,
        message: "Thêm mới danh mục thành công",
        code: 200,
      });
    } else {
      return res.send({
        message: "Không thể tạo danh mục mới",
        code: 400,
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
