const db = require("../../public/config/database");

const Book = function (book) {
  this.id = book.id;
  this.name = book.name;
  this.description = book.description;
  this.price = book.price;
  this.unit = book.unit;
  this.quantity = book.quantity;
  this.userId = book.userId;
  this.author_id = book.author_id;
  this.status = book.status;
  this.request = book.request;
};

// Function to create a book and associated images
// controllers/old_book.controller.js
Book.createBook = async function (bookData) {
  try {
    const { name, description, price, unit, quantity, categoriesID, userId } =
      bookData;

    // Insert book into the books table
    const [bookResult] = await db.execute(
      "INSERT INTO books (name, description, price, unit, quantity, categoriesID, status, request, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        description,
        price,
        unit,
        quantity,
        categoriesID,
        "Còn hàng",
        "Đang xét duyệt",
        userId,
      ]
    );

    // Return the bookId
    return bookResult.insertId;
  } catch (error) {
    console.error("Lỗi khi tạo sách:", error);
    throw error;
  }
};

Book.get_all = async function (result) {
  try {
    const [rows] = await db.promise().query("SELECT * FROM book");
    return rows;
  } catch (error) {
    console.log("Error in get_all", error);
    return error;
  }
};
// Api lấy thông tin sản phẩm thông qua product id
Book.getById = async function (id, result) {
  db.query("SELECT * FROM book WHERE id = ?", id, function (err, books) {
    if (err) {
      return null;
    } else {
      result(books);
    }
  });
};

Book.remove = function (id, result) {
  db.query("DELETE FROM book WHERE id = ?", id, function (err, book) {
    if (err) {
      return result(err, null); // Truyền lỗi vào callback
    } else {
      return result(null, "Xóa dữ liệu " + id + " thành công"); // Truyền kết quả thành công vào callback
    }
  });
};

Book.update = function (d, result) {
  console.log("====================================");
  console.log(d);
  console.log("====================================");
  db.query(
    "UPDATE book SET name=?, image=?, author_id=? WHERE id = ?",
    [d.name, d.image, d.author_id, d.id],
    function (err, products) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      if (err) {
        result(err);
      } else {
        result(products);
      }
    }
  );
};

module.exports = Book;
