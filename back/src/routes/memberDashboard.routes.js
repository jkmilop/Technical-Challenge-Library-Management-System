const { Router } = require("express");
const {
  getBorrowedBooks,
  getDueDates,
  getOverdueBooks,
} = require("../controllers/memberDashboard.controller.js");
const hasRole = require("../middlewares/authMiddleware.js");

const router = Router();

router.get("/borrowed-books", hasRole("Member"), getBorrowedBooks);
router.get("/due-dates", hasRole("Member"), getDueDates);
router.get("/overdue-books", hasRole("Member"), getOverdueBooks);

module.exports = router;
