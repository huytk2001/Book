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
const employerRoute = require("./public/views/Route/employer.route");
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

// Sử dụng CORS middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4000"],
    credentials: true, // Nếu cần sử dụng cookies hoặc header tùy chỉnh
  })
);

app.use(session({ secret: "GJDMLAA", cookie: { maxAge: 60000 } }));
app.use(flash());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage });

app.post("/uploads", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!req.file) {
    return res.status(400).json({ error: "Không tìm thấy hình ảnh" });
  }
  const imageFileName = req.file.filename;
  const imagePath = `uploads/${imageFileName}`;
  res.json(imagePath);
});

// Loại bỏ middleware xác thực khỏi các API
app.use(apiProductRoute);
app.use(apiCategoryRoute);
app.use(apiAccountRoute);

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
// app.post("/update-shipping-address", (req, res) => {
//     const { userId, address } = req.body;
//     const { province, district, ward, street, phoneNumber, coordinates } =
//     address;

//     const shippingAddress = `${street}, ${ward}, ${district}, ${province}.`;

//     const query =
//         "UPDATE users SET payment_method = ?, shipping_address = ?, phone = ?, coordinates = ? WHERE id = ?";
//     const values = [
//         "Thanh toán khi nhận hàng",
//         shippingAddress,
//         phoneNumber,
//         JSON.stringify(coordinates),
//         userId,
//     ];

//     db.execute(query, values, (error, results) => {
//         if (error) {
//             console.error("Error updating shipping address:", error);
//             res.status(500).send("Internal Server Error");
//         } else {
//             console.log("Shipping address updated successfully");
//             res.status(200).send("Shipping address updated successfully");
//         }
//     });
// });
app.use(bookRouter);
app.use(userRouter);
app.use(homeRouter);
app.use(categoryRoute);
app.use(productRoute);
app.use(employerRoute);

app.use(cookieParser("GJDMLAA"));

app.get("//", (req, res) => {
  res.render("home");
});
app.get("/", function (req, res) {
  res.render("home");
});

app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, hostname, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err}`);
  } else {
    console.log(`Server is running on http://${hostname}:${port}`);
  }
});
