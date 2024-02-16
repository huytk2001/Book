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
const util = require("node:util");
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const bookRouter = require("./public/views/book.router");
const userRouter = require("./public/views/user.router");
const multer = require("multer");
const flash = require("connect-flash");
const db = require("./public/config/database");
const session = require("express-session");
const { start } = require("node:repl");
const query = util.promisify(db.query).bind(db);
app.set("views", "./public/views");

app.use(morgan("combined"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

// app.get("/categories", function (req, res) {
//   let sql = "SELECT * FROM categories";
//   let _name = req.query.name;
//   if (_name) {
//     sql += " WHERE name LIKE '%?%'";
//   }
//   sql += " ORDER BY id DESC";
//   console.log(sql);
//   db.query(sql, [_name], function (err, data) {
//     res.render("categories", {
//       title: "Quản lý danh mục",
//       data: data,
//       totalPage: 10,
//     });
//   });
// });
// app.get("/categories", async function (req, res) {
//   let sql = "SELECT * FROM categories";
//   let _name = req.query.name;
//   // Lấy trang hiện tại: 1,2,3
//   let _page = req.query.page ? req.query.page : 1;
//   let limit = 5;
//   let _start = (_page - 1) * limit;

//   // Thực hiện truy vấn để lấy tổng số hàng
//   let rowData = await query("SELECT COUNT(*) as total FROM categories");
//   let totalRow = rowData[0].total;
//   let totalPage = Math.ceil(totalRow / limit);
//   _page = _page > 0 ? Math.floor(_page) : 1;
//   _page = _page <= totalPage ? Math.floor(_page) : totalPage;
//   if (_name) {
//     sql += " WHERE name LIKE '%" + _name + "%'";
//     // _name = "%" + _name + "%"; // Thêm dấu % ở đầu và cuối chuỗi để tìm kiếm một phần của tên
//   }

//   sql += " ORDER BY id DESC LIMIT " + _start + "," + limit;
//   console.log(sql);

//   // Thực hiện truy vấn chính và gửi phản hồi khi kết thúc
//   db.query(sql, function (err, data) {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     } else {
//       res.render("categories", {
//         title: "Quản lý danh mục",
//         data: data,
//         totalPage: totalPage,
//         _page: parseInt(_page),
//       });
//     }
//   });
// });
app.get("/categories", async function (req, res) {
  try {
    let sql = "SELECT * FROM categories";
    let _name = req.query.name;
    let _page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = 5;
    let _start = (_page - 1) * limit;

    // Xây dựng truy vấn SQL chính
    if (_name) {
      sql += " WHERE name LIKE '%" + _name + "%'";
    }

    // Truy vấn để lấy tổng số hàng
    let sql_total = "SELECT COUNT(*) as total FROM categories";
    let rowData = await query(sql_total);
    let totalRow = rowData[0].total;
    let totalPage = Math.ceil(totalRow / limit);

    // Điều chỉnh số trang
    _page = _page > 0 ? Math.min(_page, totalPage) : 1;

    // Sửa đổi truy vấn SQL cho phân trang
    sql += " ORDER BY id ASC LIMIT ?, ?";
    let params = [_start, limit];

    // Thực hiện truy vấn SQL chính
    let data = await query(sql, params);

    res.render("categories", {
      title: "Quản lý danh mục",
      data: data ? data : [],
      totalPage: totalPage,
      _page: parseInt(_page),
      _name: _name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi máy chủ nội bộ");
  }
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
app.post("/add/categories", function (req, res) {
  let sql = "INSERT INTO categories SET ?";
  db.query(sql, req.body, (err, data) => {
    if (err) {
      let msg = "";
      if (err.errno == 1451) {
        msg = "Danh muc dang co san pham";
      } else if (err.errno == 2000) {
        msg = "ten danh muc bi trung";
      } else {
        msg = "Da co loi";
      }
      res.render("error", {
        message: msg,
        code: err.errno,
      });
    } else {
      res.redirect("/categories");
    }
  });
});
app.listen(port, hostname, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err}`);
  } else {
    console.log(`Server is running on http://${hostname}:${port}`);
  }
});
