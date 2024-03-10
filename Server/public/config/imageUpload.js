// // imageUpload.js

const multer = require("multer");
const express = require("express");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + ".png");
//   },
// });

// const upload = multer({ storage: storage });

// // Middleware để upload ảnh
// // function uploadImage(req, res, next) {
// //   upload.single("image")(req, res, function (err) {
// //     if (err instanceof multer.MulterError) {
// //       // Xử lý lỗi từ multer
// //       return res.status(400).json({ error: "Lỗi khi tải ảnh lên" });
// //     } else if (err) {
// //       // Xử lý lỗi khác
// //       return res.status(500).json({ error: "Lỗi khi tải ảnh lên" });
// //     }
// //     next();
// //   });
// // }

// // Định nghĩa endpoint để xử lý tải ảnh lên

// module.exports = upload;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
