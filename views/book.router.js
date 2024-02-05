const express = require("express");
const router = express.Router();
const bookControllers = require("../controllers/book.controllers");

router.get("/book/list", bookControllers.list);
router.get("/book/:id", bookControllers.book);
router.post("/book/add", bookControllers.add_book);
router.delete("/book/delete/:id", bookControllers.delete_book);
router.put("/book/edit/:id", bookControllers.update_book);

module.exports = router;
