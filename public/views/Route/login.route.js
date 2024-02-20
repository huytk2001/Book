const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const sessionstorage = require("node-sessionstorage");
// Define your login routes here
router.get("/login", (req, res) => {
  res.render("login", {
    err_msg: "",
  });
});
router.get("/logout", (req, res) => {
  sessionstorage.removeItem("admin_login");
  res.redirect("/login");
});
router.post("/login", (req, res) => {
  let sql =
    "SELECT id,name,email FROM users WHERE email = ? AND password = ? AND role= 'admin'";
  db.query(sql, [req.body.email, req.body.password], function (err, data) {
    if (err || data.length == 0) {
      res.render("login", {
        err_msg: "Tài khoan và mật khẩu không chính xác",
      });
    } else {
      let accountJson = JSON.stringify(data[0]);
      sessionstorage.setItem("admin_login", accountJson);
      res.redirect("/");
    }
  });
});

module.exports = router;
