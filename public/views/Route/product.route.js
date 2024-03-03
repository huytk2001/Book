const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controllers");
const upload = require("../../config/imageUpload");
router.get("/product", productController.index);
router.get("/product-edit/:id", productController.edit);

router.post(
    "/product-edit/:id",
    upload.single("image"), // Multer middleware for handling file upload
    productController.update
);
router.get("/product-delete/:id", productController.deleteProduct);
router.get("/add/product", productController.create);
router.post("/add/product", productController.store);
// router.post("/product/add", productController.store);
module.exports = router;