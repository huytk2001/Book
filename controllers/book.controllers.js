const Book = require("../models/book.model");

exports.list = function (req, res) {
  console.log("Handling /book/list request");

  Book.get_all(function (data) {
    res.send({ result: data });
  });
};
exports.book = function (req, res) {
  Book.getById(req.params.id, function (response) {
    res.send({ result: response });
  });
};
exports.add_book = function (req, res) {
  const data = req.body;
  Book.create(data, function (err, response) {
    if (err) {
      res.status(500).json({ error: err.message }); // Fixing the typo here
    } else {
      res.status(200).send({ result: response });
    }
  });
};

exports.delete_book = function (req, res) {
  const id = req.params.id;

  Book.remove(id, function (err, response) {
    if (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send({ error: "Internal Server Error" });
    } else {
      res.status(200).send({ result: response });
    }
  });
};
exports.update_book = function (req, res) {
  const data = req.body;

  Book.update(data, function (response) {
    res.send({ result: response });
  });
};

// exports.delete_book = function (req, res) {
//   var id = req.params.id;
//   Book.remove(id, function (response) {
//     res.send({ result: response });
//   });
// };
