const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category.controllers");
const upload = require("../../config/imageUpload");

router.get("/categories", categoryController.index);

router.get("/categories-edit/:id", categoryController.edit);
router.post(
  "/categories-edit/:id",
  upload.single("image"), // Multer middleware for handling file upload
  categoryController.editCategory
);
router.get("/categories-delete/:id", categoryController.deleteCategory);

router.get("/add/categories", categoryController.create);
router.post(
  "/add/categories",

  categoryController.createCategory
);
module.exports = router;
