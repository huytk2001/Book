const db = require("../config/database");

const Book = function (book) {
  this.id = book.id;
  this.name = book.name;
  this.image = book.image;
  this.description = book.description;
  this.price = book.price;
  this.unit = book.unit;
  this.quantity = book.quantity;
  this.userId = book.userId;
  this.author_id = book.author_id;
};
//  toan
Book.get_all = async function (result) {
  db.query("SELECT * FROM book", function (err, books) {
    if (err) {
      console.error("Error retrieving data from the database:", err);
      result(err);
    } else {
      result(books);
    }
  });
};

Book.getById = async function (id, result) {
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
