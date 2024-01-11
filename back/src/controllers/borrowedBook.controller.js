const BorrowedBook = require('../models/borrowedBook.js');
const Book = require('../models/book.js');
const User = require('../models/user.js');

async function getBorrowedBooks(req, res) {
  const { user_id } = req.params;

  try {
    const borrowedBooks = await BorrowedBook.findAll({
      where: {
        user_id,
        returnedAt: null,
      },
    });

    res.json({ borrowedBooks });
  } catch (error) {
    handleError(res, error);
  }
}

async function borrowBook(req, res) {
  const { user_id, book_id } = req.body;

  try {
    await sequelize.transaction(async (t) => {
      const user = await User.findByPk(user_id, { transaction: t });
      if (!user || user.role !== 'Member') {
        return res.status(403).json({ message: 'Only Members can borrow books' });
      }

      const book = await Book.findByPk(book_id, { transaction: t });
      if (!book || book.total_copies <= 0) {
        return res.status(404).json({ message: 'Book not available for borrowing' });
      }

      const existingBorrowedBook = await BorrowedBook.findOne({
        where: { user_id, book_id, returnedAt: null },
        transaction: t,
      });
      if (existingBorrowedBook) {
        return res.status(400).json({ message: 'You have already borrowed this book' });
      }

      await book.update({ total_copies: book.total_copies - 1 }, { transaction: t });
      const borrowedBook = await BorrowedBook.create(
        { user_id, book_id, borrowedAt: new Date() },
        { transaction: t }
      );

      res.json(borrowedBook);
    });
  } catch (error) {
    handleError(res, error);
  }
}

async function returnBook(req, res) {
  const { user_id, book_id } = req.body;

  try {
    await sequelize.transaction(async (t) => {
      const user = await User.findByPk(user_id, { transaction: t });
      if (!user || user.role !== 'Librarian') {
        return res.status(403).json({ message: 'Only Librarians can mark books as returned' });
      }

      const borrowedBook = await BorrowedBook.findOne({
        where: { user_id, book_id, returnedAt: null },
        transaction: t,
      });
      if (!borrowedBook) {
        return res.status(404).json({ message: 'No active borrow record found for the book' });
      }

      await borrowedBook.update({ returnedAt: new Date() }, { transaction: t });
      const book = await Book.findByPk(book_id, { transaction: t });
      await book.update({ total_copies: book.total_copies + 1 }, { transaction: t });

      res.json({ message: 'Book marked as returned' });
    });
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  getBorrowedBooks,
  borrowBook,
  returnBook,
};
