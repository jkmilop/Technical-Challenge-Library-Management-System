const User = require('./models/user.js');
const Book = require('./models/book.js');
const BorrowedBook = require('./models/borrowedBook.js');

BorrowedBook.belongsTo(User, { foreignKey: 'member_id', targetKey: 'user_id' });
BorrowedBook.belongsTo(Book, { foreignKey: 'book_id', targetKey: 'book_id' });

module.exports = { User, Book, BorrowedBook };
