const express = require("express");
const router = express.Router();
const productController = require("../../controllers/api.product.controllers");

router.get("/api/product", productController.index);
router.get("/api/product-edit/:id", productController.edit);
router.get("/api/product/:id", productController.getProductById);
router.put("/api/product-edit/:id", productController.update);
router.delete("/api/product-delete/:id", productController.deleteProduct);
router.get("/api/search", productController.searchProducts);
router.get(
  "/api/category/:categoryID",
  productController.getAllProductsByCategory
);
router.post("/api/add/product", productController.store);

module.exports = router;
