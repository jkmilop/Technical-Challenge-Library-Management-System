const Book = require('../models/book.js');
const hasRole = require("../middlewares/authMiddleware.js");

const handleError = (res, error) => {
  console.error('Error:', error);
  return res.status(500).json({ message: 'Internal Server Error' });
};

async function handleLibrarianAction(req, res, action) {
  try {
    hasRole('Librarian')(req, res, async () => {
      await action();
    });
  } catch (error) {
    handleError(res, error);
  }
}

async function addBook(req, res) {
  handleLibrarianAction(req, res, async () => {
    const newBook = await Book.create(req.body);
    res.json(newBook);
  });
}

async function getBooks(req, res) {
  try {
    const books = await Book.findAll({
      attributes: ['title', 'author', 'genre', 'ISBN', 'total_copies'],
    });
    res.json(books);
  } catch (error) {
    handleError(res, error);
  }
}

async function updateBook(req, res) {
  const { id } = req.params;
  handleLibrarianAction(req, res, async () => {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.update(req.body);

    res.json(book);
  });
}

async function deleteBook(req, res) {
  const { id } = req.params;
  handleLibrarianAction(req, res, async () => {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.destroy();

    return res.sendStatus(204);
  });
}

async function getBook(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id, {
      attributes: ['title', 'author', 'genre', 'ISBN', 'total_copies'],
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
  getBook,
};
