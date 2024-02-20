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
const sessionstorage = require("node-sessionstorage");
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const bookRouter = require("./public/views/Route/book.router");
const userRouter = require("./public/views/Route/user.router");
const homeRouter = require("./public/views/Route/home.router");
const categoryRoute = require("./public/views/Route/category.route");
const productRoute = require("./public/views/Route/product.route");
const apiProductRoute = require("./public/views/Route/api.product.route");
const apiCategoryRoute = require("./public/views/Route/api.category.route");
const apiAccountRoute = require("./public/views/Route/api.account.route");
const loginRoute = require("./public/views/Route/login.route");

const imageUploadRouter = require("./public/config/imageUpload");
const multer = require("multer");
const flash = require("connect-flash");

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

// Tạo middleware để lưu trữ ảnh tải lên vào thư mục "uploads"

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
app.use(loginRoute);
app.use(function (req, res, next) {
  let accountJson = sessionstorage.getItem("admin_login");
  console.log(accountJson);
  if (accountJson) {
    global.account = JSON.parse(accountJson);
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/uploads", express.static("uploads"));
app.use(bookRouter);
app.use(userRouter);
app.use(homeRouter);
app.use(categoryRoute);
app.use(productRoute);
app.use(apiCategoryRoute);
app.use(apiProductRoute);
app.use(apiAccountRoute);

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
// app.get("/categories", async function(req, res) {
//     try {
//         let sql = "SELECT * FROM categories";
//         let _name = req.query.name;
//         let _page = req.query.page ? parseInt(req.query.page) : 1;
//         let limit = 5;
//         let _start = (_page - 1) * limit;

//         // Xây dựng truy vấn SQL chính
//         if (_name) {
//             sql += " WHERE name LIKE '%" + _name + "%'";
//         }

//         // Truy vấn để lấy tổng số hàng
//         let sql_total = "SELECT COUNT(*) as total FROM categories";
//         let rowData = await query(sql_total);
//         let totalRow = rowData[0].total;
//         let totalPage = Math.ceil(totalRow / limit);

//         // Điều chỉnh số trang
//         _page = _page > 0 ? Math.min(_page, totalPage) : 1;

//         // Sửa đổi truy vấn SQL cho phân trang
//         sql += " ORDER BY id ASC LIMIT ?, ?";
//         let params = [_start, limit];

//         // Thực hiện truy vấn SQL chính
//         let data = await query(sql, params);

//         res.render("categories", {
//             title: "Quản lý danh mục",
//             data: data ? data : [],
//             totalPage: totalPage,
//             _page: parseInt(_page),
//             _name: _name,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Lỗi máy chủ nội bộ");
//     }
// });

// app.get("/categories-edit/:id", );
// app.post("/categories-edit/:id", async function(req, res) {
//     let id = req.params.id;
//     let newName = req.body.name; // Lấy tên mới từ yêu cầu

//     // Truy vấn để lấy thông tin danh mục hiện tại
//     let getCategoryQuery = "SELECT name FROM categories WHERE id = ?";
//     let currentCategory = await query(getCategoryQuery, [id]);

//     // Kiểm tra xem tên mới có khác với tên hiện tại hay không
//     if (newName !== currentCategory[0].name) {
//         // Nếu tên mới khác với tên hiện tại, kiểm tra sự tồn tại của tên mới
//         let checkExists = await query(
//             "SELECT COUNT(id) as count FROM categories WHERE name = ?", [newName]
//         );

//         // Nếu tên mới đã tồn tại, hiển thị lỗi
//         if (checkExists[0].count > 0) {
//             res.render("error", {
//                 message: "Danh mục với cùng tên đã tồn tại",
//                 code: 400,
//             });
//             return;
//         }
//     }

//     // Nếu không có lỗi, tiến hành cập nhật danh mục
//     let sql = "UPDATE categories SET ? WHERE id = ?";
//     db.query(sql, [req.body, id], function(err, data) {
//         if (err) {
//             let msg = "";
//             if (err.errno == 1062) {
//                 msg = "Tên danh mục đã tồn tại, hãy chọn tên khác";
//             } else if (err.errno == 2000) {
//                 msg = "Tên danh mục này đã bị trùng";
//             } else {
//                 msg = "Đã có lỗi vui lòng thử lại";
//             }
//             res.render("error", {
//                 message: msg,
//                 code: err.errno,
//             });
//         } else {
//             if (data.affectedRows > 0) {
//                 res.render("categories-edit", {
//                     cat: req.body,
//                 });
//             } else {
//                 res.render("error", {
//                     message: "Không thể cập nhật danh mục",
//                     code: 500,
//                 });
//             }
//         }
//     });
// });

// app.get("/categories-delete/:id", function(req, res) {
//     let id = req.params.id;

//     // Xóa tất cả các hình ảnh của sách trong bảng book_images
//     let sql_delete_images =
//         "DELETE FROM book_images WHERE book_id IN (SELECT id FROM book WHERE categoryID = ?)";
//     db.query(sql_delete_images, [id], function(err, result) {
//         if (err) {
//             res.render("error", {
//                 message: err.sqlMessage,
//                 code: err.errno,
//             });
//         } else {
//             // Tiếp tục xóa danh mục sách trong bảng categories sau khi đã xóa hình ảnh
//             let sql_delete_category = "DELETE FROM categories WHERE id = ?";
//             db.query(sql_delete_category, [id], function(err, data) {
//                 if (err) {
//                     res.render("error", {
//                         message: err.sqlMessage,
//                         code: err.errno,
//                     });
//                 } else {
//                     res.redirect("/categories");
//                 }
//             });
//         }
//     });
// });

// app.get("/add/categories", function(req, res) {
//     res.render("categories-add");
// });
// app.post("/add/categories", async function(req, res) {
//     // Khai báo biến id từ req.params.id nếu cần thiết
//     let sql = "INSERT INTO categories SET ?";

//     // Kiểm tra xem tên danh mục đã tồn tại hay chưa
//     let checkExists = await query(
//         "SELECT COUNT(id) as count FROM categories WHERE name = ?", [req.body.name]
//     );

//     // Nếu tên danh mục đã tồn tại, render trang lỗi và dừng hàm
//     if (checkExists[0].count > 0) {
//         res.render("error", {
//             message: "Danh mục với cùng tên đã tồn tại",
//             code: 400,
//         });
//         return;
//     }

//     // Thêm mới danh mục vào cơ sở dữ liệu
//     db.query(sql, req.body, (err, data) => {
//         if (err) {
//             let msg = "";
//             if (err.code === "ER_DUP_ENTRY") {
//                 msg = "Tên danh mục đã tồn tại, vui lòng chọn tên khác.";
//             } else {
//                 msg = "Đã có lỗi xảy ra.";
//             }
//             res.render("error", {
//                 message: msg,
//                 code: err.code,
//             });
//         } else {
//             res.redirect("/categories");
//         }
//     });
// });

app.listen(port, hostname, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err}`);
  } else {
    console.log(`Server is running on http://${hostname}:${port}`);
  }
});
