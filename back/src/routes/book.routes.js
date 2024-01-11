const { Router } = require("express");
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
  getBook,
} = require("../controllers/book.controller.js");

const router = Router();

router.post("/", addBook);
router.get("/", getBooks);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.get("/:id", getBook);

module.exports = router;
