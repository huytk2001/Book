const Book = require("../models/book.model");

exports.list = async function (req, res) {
  try {
    const data = await Book.get_all();
    res.send({ result: data });
  } catch (error) {
    console.error("Lỗi trong quá trình lấy danh sách sách:", error);
    res.status(500).send({ error: "Lỗi máy chủ nội bộ" });
  }
};

exports.book = async function (req, res) {
  try {
    const bookId = req.params.id;
    const book = await Book.getById(bookId);
    res.send({ result: book });
  } catch (error) {
    console.error("Lỗi trong quá trình lấy thông tin sách:", error);
    res.status(500).send({ error: "Lỗi máy chủ nội bộ" });
  }
};

exports.add_book = function (req, res) {
  const data = req.body;
  Book.create(data)
    .then((response) => {
      res.status(200).send({ result: response });
    })
    .catch((error) => {
      console.error("Lỗi khi thêm sách:", error);
      res.status(400).json({ error: error.message });
    });
};

exports.createBook = async (req, res) => {
  try {
    const { name, description, price, unit, quantity, categoriesID, userId } =
      req.body;

    // Tạo sách và lấy bookId
    const bookId = await Book.createBook({
      name,
      description,
      price,
      unit,
      quantity,
      categoriesID,
      userId,
    });

    res.status(201).json({ message: "Thêm sách thành công", bookId });
  } catch (error) {
    console.error("Lỗi khi tạo sách:", error);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
};
// exports.createBook = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       unit,
//       quantity,
//       userId,
//       author_id,
//       status,
//       request,
//     } = req.body;

//     // Tạo sản phẩm và lấy bookId
//     const bookId = await Book.createBook({
//       name,
//       description,
//       price,
//       unit,
//       quantity,
//       userId,
//       author_id,
//       status,
//       request,
//     });

//     res.status(201).json({ message: "Tạo sản phẩm thành công", bookId });
//   } catch (error) {
//     console.error("Lỗi khi tạo sản phẩm:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.uploadImage = async (req, res) => {
  try {
    const { bookId } = req.body;
    const images = req.files.map((file) => file.path);

    // Thêm hình ảnh vào bảng `book_images` và gắn với sản phẩm có `bookId`
    for (const imagePath of images) {
      await db.query(
        "INSERT INTO book_images (book_id, image_url) VALUES (?, ?)",
        [bookId, imagePath]
      );
    }

    res.status(201).json({ message: "Upload hình ảnh thành công" });
  } catch (error) {
    console.error("Lỗi khi tải lên hình ảnh:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.delete_book = async function (req, res) {
  const id = req.params.id;

  try {
    const response = await Book.remove(id);
    res.status(200).send({ result: response });
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error);
    res.status(500).send({ error: "Lỗi máy chủ nội bộ" });
  }
};

exports.update_book = async function (req, res) {
  const data = req.body;

  try {
    const response = await Book.update(data);
    res.send({ result: response });
  } catch (error) {
    console.error("Lỗi khi cập nhật sách:", error);
    res.status(500).send({ error: "Lỗi máy chủ nội bộ" });
  }
};
