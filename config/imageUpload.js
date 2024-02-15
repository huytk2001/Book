// imageUpload.js

const multer = require("multer");
const db = require("./config/database");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

const upload = multer({ storage: storage });

// Middleware để upload ảnh
function uploadImage(req, res, next) {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Xử lý lỗi từ multer
      return res.status(400).json({ error: "Lỗi khi tải ảnh lên" });
    } else if (err) {
      // Xử lý lỗi khác
      return res.status(500).json({ error: "Lỗi khi tải ảnh lên" });
    }
    next();
  });
}

// Hàm để lưu đường dẫn của ảnh vào cơ sở dữ liệu
async function saveImagePathToDatabase(imagePath) {
  try {
    const query = "INSERT INTO images (image_url) VALUES (?)";
    await db.query(query, [imagePath]);
    console.log("Đã lưu đường dẫn của ảnh vào cơ sở dữ liệu:", imagePath);
  } catch (error) {
    console.error("Lỗi khi lưu đường dẫn của ảnh vào cơ sở dữ liệu:", error);
    throw error;
  }
}

module.exports = { uploadImage, saveImagePathToDatabase };
