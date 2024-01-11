const { Op } = require('sequelize');
const BorrowedBook = require('../models/borrowedBook.js');

const handleError = (res, error) => {
  console.error('Error:', error);
  return res.status(500).json({ error: 'Internal Server Error' });
};

async function getBorrowedBooks(req, res) {
  const { userId } = req.params;

  try {
    const borrowedBooks = await BorrowedBook.findAll({
      where: {
        userId,
        returnedAt: null,
      },
    });

    res.json({ data: borrowedBooks || [] }); 
  } catch (error) {
    handleError(res, error);
  }
}

async function getDueDates(req, res) {
  const { userId } = req.params;

  try {
    const borrowedBooks = await BorrowedBook.findAll({
      where: {
        userId,
        returnedAt: null,
      },
    });

    const dueDates = borrowedBooks.map(book => ({ bookId: book.bookId, dueDate: book.dueDate }));
    res.json({ data: dueDates || [] }); 
  } catch (error) {
    handleError(res, error);
  }
}

async function getOverdueBooks(req, res) {
  const { userId } = req.params;

  try {
    const overdueBooks = await BorrowedBook.findAll({
      where: {
        userId,
        returnedAt: null,
        dueDate: {
          [Op.lt]: new Date().setHours(0, 0, 0, 0),
        },
      },
    });

    res.json({ data: overdueBooks || [] });
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  getBorrowedBooks,
  getDueDates,
  getOverdueBooks,
};
