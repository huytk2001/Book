// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();
// const authenticateUser = (req, res, next) => {
//   cookieParser()(req, res, () => {});
//   const token = req.cookies.token;
//   if (!token) {
//     return res.redirect("/admin/login");
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.redirect("/login");
//   }
// };

const { use } = require("../views/book.router");

// module.exports = { authenticateUser };
const findUser = (userId) => {
  return users.find((user) => user.id === userId);
};
const authPage = (permission) => {
  return (req, res, next) => {
    const { userId } = req.body;
    if (!userId) {
      return res.status(403).json("You need sign in");
    }
    const user = findUser(userId);
    if (!userId) {
      return res.status(403).json("User not found");
    }
    const { role } = user;
    if (!permission.includes(role)) {
      return res.status(401).json("You dont have permission");
    }
    next();
  };
};
// const authCourse = (req, res, next) => {
//   const { userId } = req.body;
//   if (!userId) {
//     return res.status(403).json("You need sign in");
//   }
//   const user = findUser(userId);
//   if (!userId) {
//     return res.status(403).json("User not found");
//   }
//   const { role } = user;
// };

module.exports = {
  authPage,
};
