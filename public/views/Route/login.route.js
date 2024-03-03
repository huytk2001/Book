// Import express and other required modules
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
router.post("/user/login", (req, res) => {
  const { email, password } = req.body;

  // Query the database to check if the user exists and the password is correct
  const sql =
    "SELECT id, email, role FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error in user login:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      // If no user found or password doesn't match
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // User found, generate JWT token
    const user = result[0];
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the token in the response
    res.json({ token });
  });
});
// Export the router
module.exports = router;
