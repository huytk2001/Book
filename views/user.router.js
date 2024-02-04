const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
router.get("/user/list", userController.list);

module.exports = router;
