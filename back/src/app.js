const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes.js');
const bookRoutes = require('./routes/book.routes.js');
const borrowedBookRoutes = require('./routes/borrowedBook.routes.js');
const librarianDashboardRoutes = require('./routes/librarianDashboard.routes.js');
const memberDashboardRoutes = require('./routes/memberDashboard.routes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/borrowed-books', borrowedBookRoutes);
app.use('/librarian-dashboard', librarianDashboardRoutes);
app.use('/member-dashboard', memberDashboardRoutes);

module.exports = app;
