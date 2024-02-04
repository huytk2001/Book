const User = require("../models/User.models");

exports.add_user = function (req, res) {
  const data = req.body;
  User.create(data, function (err, response) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send({ result: response });
    }
  });
};

exports.list = function (req, res) {
  console.log("Handling /book/list request");

  User.get_all(function (data) {
    res.send({ result: data });
  });
};
exports.list = function (req, res) {
  User.get_all(function (err, users) {
    if (err) {
      // Handle the error, send an appropriate response, or log it
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // If no error, send the list of users as a JSON response
    res.json(users);
  });
};
