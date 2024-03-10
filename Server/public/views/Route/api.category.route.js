const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/api.category.controllers"); // Sửa đường dẫn đến tệp điều khiển

const upload = require("../../config/imageUpload");

router.get("/category", categoryController.index);

router.get("/category-edit/:id", categoryController.edit);
router.put(
  "/category-edit/:id",
  upload.single("image"), // Multer middleware for handling file upload
  categoryController.editCategory
);
router.delete("/category-delete/:id", categoryController.deleteCategory);

router.post("/add/category", categoryController.createCategory);
module.exports = router;
