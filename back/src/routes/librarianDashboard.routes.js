const { Router } = require("express");
const {
  getTotalBooks,
  getTotalBorrowedBooks,
  getBooksDueToday,
  getMembersWithOverdueBooks,
} = require("../controllers/librarianDashboard.controller.js");
const hasRole = require("../middlewares/authMiddleware.js");

const router = Router();

router.get("/total-books", hasRole("Librarian"), getTotalBooks);
router.get("/total-borrowed-books", hasRole("Librarian"), getTotalBorrowedBooks);
router.get("/books-due-today", hasRole("Librarian"), getBooksDueToday);
router.get("/members-with-overdue-books", hasRole("Librarian"), getMembersWithOverdueBooks);

module.exports = router;
