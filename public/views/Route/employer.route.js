const express = require("express");
const router = express.Router();
const employerController = require("../../controllers/employer.controllers");
const upload = require("../../config/imageUpload");

router.get("/user", employerController.index);

router.get("/user-edit/:id", employerController.edit);

router.post(
  "/user-edit/:id",
  upload.single("image"),
  employerController.editEmployer
);

router.get("/user-delete/:id", employerController.delete);

router.get("/add/user", employerController.create);

module.exports = router;
