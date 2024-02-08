// app.js

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

app.use("/uploads", express.static("uploads"));
app.use(morgan("combined"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

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

app.use(bookRouter);
app.use(userRouter);
app.use(cookieParser("GJDMLAA"));
app.get("/", (req, res) => {
  res.send({
    message: "Hello Backend",
  });
});

app.listen(port, hostname, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err}`);
  } else {
    console.log(`Server is running on http://${hostname}:${port}`);
  }
});
