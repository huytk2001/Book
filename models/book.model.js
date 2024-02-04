const db = require("../config/database");

const Book = function (book) {
  this.id = book.id;
  this.name = book.name;
  this.image = book.image;
  this.author_id = book.author_id;
};
//  toan
Book.get_all = function (result) {
  db.query("SELECT * FROM book", function (err, books) {
    if (err) {
      console.error("Error retrieving data from the database:", err);
      result(err);
    } else {
      result(books);
    }
  });
};
Book.getById = function (id, result) {
  db.query("SELECT * FROM book WHERE id = ?", id, function (err, books) {
    if (err) {
      return null;
    } else {
      result(books);
    }
  });
};
Book.create = function (data, result) {
  db.query("INSERT INTO book SET ?", data, function (err, book) {
    if (err) {
      return result(err);
    } else {
      result(null, { id: book.insertId, ...data });
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

module.exports = Book;
