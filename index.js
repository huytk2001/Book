const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const database = require("./config/database");
const hostname = process.env.DB_HOST;
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const bookRouter = require("./views/book.router");
const userRouter = require("./views/user.router");
const multer = require("multer");
const flash = require("connect-flash");
const session = require("express-session");

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
    cb(null, "uploads/");
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

app.listen(port, hostname, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err}`);
  } else {
    console.log(`Server is running on http://${hostname}:${port}`);
  }
});
