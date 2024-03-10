const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/api.order.controller");

// Định nghĩa tuyến đường để lấy thông tin chi tiết đơn hàng với ảnh sản phẩm

// Định nghĩa tuyến đường để cập nhật địa chỉ giao hàng
router.post("/update-shipping-address", orderController.updateShippingAddress);
router.get("/:userId/order/:orderId", orderController.getOrder);
router.get("/list/orders", orderController.getAllOrders);
// Định nghĩa tuyến đường để đặt đơn hàng
router.post("/order/place-order", orderController.placeOrder);

module.exports = router;
