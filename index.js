const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const database = require("./public/config/database");
const hostname = process.env.DB_HOST;
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const bookRouter = require("./public/views/book.router");
const userRouter = require("./public/views/user.router");
const multer = require("multer");
const flash = require("connect-flash");
const db = require("./public/config/database");
const session = require("express-session");
app.set("views", "./public/views");

app.use(morgan("combined"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());
app.use(session({ secret: "GJDMLAA", cookie: { maxAge: 60000 } }));
app.use(flash());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
// Tạo middleware để lưu trữ ảnh tải lên vào thư mục "uploads"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage });

// // Route để xử lý tải ảnh lên và lưu vào thư mục "uploads"
app.post("/uploads", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!req.file) {
    return res.status(400).json({ error: "Không tìm thấy hình ảnh" });
  }
  const imageFileName = req.file.filename;
  const imagePath = `uploads/${imageFileName}`;
  res.json(imagePath);
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/uploads", express.static("uploads"));
app.use(bookRouter);
app.use(userRouter);
app.use(cookieParser("GJDMLAA"));

app.get("//", (req, res) => {
  res.render("home");
});
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/categories", function (req, res) {
  db.query("SELECT * FROM categories ORDER BY id DESC", function (err, data) {
    res.render("categories", {
      title: "Quản lý danh mục",
      data: data,
      totalPage: 10,
    });
  });
});

// app.get("/categories-delete/:id ", function (req, res) {
//   let id = req.params.id;
//   let sql_delete = "DELETE FROM categories WHERE id = ?";
//   db.query(sql_delete, [id], function (err, data) {
//     if (err) {
//       res.render("error", {
//         message: err.sqlMessage,
//         code: err.errno,
//       });
//     } else {
//       res.redirect("/categories");
//     }
//   });
// });
app.get("/categories-delete/:id", function (req, res) {
  let id = req.params.id;

  // Xóa tất cả các hình ảnh của sách trong bảng book_images
  let sql_delete_images =
    "DELETE FROM book_images WHERE book_id IN (SELECT id FROM book WHERE categoryID = ?)";
  db.query(sql_delete_images, [id], function (err, result) {
    if (err) {
      res.render("error", {
        message: err.sqlMessage,
        code: err.errno,
      });
    } else {
      // Tiếp tục xóa danh mục sách trong bảng categories sau khi đã xóa hình ảnh
      let sql_delete_category = "DELETE FROM categories WHERE id = ?";
      db.query(sql_delete_category, [id], function (err, data) {
        if (err) {
          res.render("error", {
            message: err.sqlMessage,
            code: err.errno,
          });
        } else {
          res.redirect("/categories");
        }
      });
    }
  });
});

app.get("/add/categories", function (req, res) {
  res.render("categories-add");
});
app.listen(port, hostname, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err}`);
  } else {
    console.log(`Server is running on http://${hostname}:${port}`);
  }
});
