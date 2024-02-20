const express = require("express");
const router = express.Router(); // Thêm dấu ngoặc đơn ở đây
const homeControllers = require("../../controllers/home.controllers");

router.get("/", homeControllers.home);
module.exports = router; // Thay Router thành router
