const express = require("express");
const router = express.Router();
const AccountControllers = require("../../controllers/account.controllers");

router.get("/api/account", AccountControllers.index);
router.post("/api/account/create", AccountControllers.store);
router.put("/api/account/update/:id", AccountControllers.update); // Di chuyển lên đây
router.get("/api/account/:id", AccountControllers.getOne);
router.delete("/api/account/delete/:id", AccountControllers.delete);
router.post("/api/account/login", AccountControllers.checklogin);
module.exports = router;