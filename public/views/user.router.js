const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
// const { authPage } = require("../middleware/auth.middleeware");
// const { checkRoleUser } = require("../middleware/user.middleware");
// Thay đổi phần truyền vào của authPage thành một mảng các vai trò

router.get("/list", userController.list); //  // Kiểm tra xem userController.list có được định nghĩa chưa
router.post("/register/user", userController.add_user);
router.post("/user/login", userController.login);

module.exports = router;
// authPage(["user", "admin"])
