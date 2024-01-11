const { Op } = require('sequelize');
const BorrowedBook = require('../models/borrowedBook.js');
const Book = require('../models/book.js');
const User = require('../models/user.js');

const handleError = (res, error) => {
  console.error('Error:', error);
  return res.status(500).json({ message: 'Internal Server Error' });
};

const getStartOfDay = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getTotalBooks = async (req, res) => {
  try {
    const totalBooks = await Book.count();
    res.json({ totalBooks });
  } catch (error) {
    handleError(res, error);
  }
};

const getTotalBorrowedBooks = async (req, res) => {
  try {
    const totalBorrowedBooks = await BorrowedBook.count();
    res.json({ totalBorrowedBooks });
  } catch (error) {
    handleError(res, error);
  }
};

const getBooksDueToday = async (req, res) => {
  try {
    const booksDueToday = await BorrowedBook.count({
      where: {
        dueDate: {
          [Op.eq]: getStartOfDay(),
        },
      },
    });
    res.json({ booksDueToday });
  } catch (error) {
    handleError(res, error);
  }
};

const getMembersWithOverdueBooks = async (req, res) => {
  try {
    const membersWithOverdueBooks = await User.findAll({
      where: {
        role: 'Member',
      },
      include: [
        {
          model: BorrowedBook,
          where: {
            dueDate: {
              [Op.lt]: getStartOfDay(),
            },
            returnedAt: null,
          },
          required: false,
        },
      ],
    });
    res.json({ membersWithOverdueBooks });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getTotalBooks,
  getTotalBorrowedBooks,
  getBooksDueToday,
  getMembersWithOverdueBooks,
};
