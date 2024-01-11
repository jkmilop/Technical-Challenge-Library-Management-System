'use strict';
const app = require('./app.js');
const { Book, BorrowedBook, User } = require('./associations.js');
const sequelize = require('./database/database.js');

const main = async () => {
  try {
    await sequelize.sync({ force: true });
    app.listen(3000);
    console.log('Server is running on port 3000');
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

main();