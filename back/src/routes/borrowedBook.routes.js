const { Router } = require("express");
const {
  borrowBook,
  returnBook,
  getBorrowedBooks,
} = require("../controllers/borrowedBook.controller.js");
const hasRole = require("../middlewares/authMiddleware.js");

const router = Router();

router.post("/",(req, res, next) => {
  hasRole("Member")(req, res, next);
 },  borrowBook);
router.put("/:id", (req, res, next) => {
  hasRole("Member")(req, res, next);
 },  returnBook);
router.get("/", (req, res, next) => {
  hasRole("Member")(req, res, next);
 },  getBorrowedBooks);

module.exports = router;
