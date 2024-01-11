# Library Management System

This project is a web application designed to manage a library's book inventory and user borrowings. The application is built using Node.js, Express, Sequelize, and MySQL for backend development, and React for the frontend.

## Getting Started

These instructions will guide you through the process of setting up and running the project on your local machine.

### Prerequisites

Before you start, ensure you have installed the following software:

* Node.js
* MySQL
* NPM (Node Package Manager)

### Installing

To get the project up and running on your local machine, follow these steps:

1. Clone the project from GitHub:

```bash
git clone https://github.com/jkmilop/Technical-Challenge-Technical-Challenge-Library-Management-System.git
```
#### Back-End
1. Navigate to the project directory and install the dependencies:

```bash
cd Technical-Challenge-Library-Management-System/back
npm install bcrypt@5.1.1 cors@2.8.5 express@4.18.2 jsonwebtoken@9.0.2 mysql2@3.7.0 sequelize@6.35.2
npm install --save-dev nodemon


```

2. Create a MySQL database and add the database name, username, and password in `Technical-Challenge-Library-Management-System/back/src/database/database.js` file.

3. Once the database is configured, create tables:

```bash
npm run d
```

## Features

The application includes the following features:

- **Authentication and Authorization**: Users can register, log in, and log out. There are two types of users: Librarian and Member. Only Librarian users can add, edit, or delete books.

- **Book Management**: Users can add a new book with details like title, author, genre, ISBN, and total copies. They can also edit and delete book details.

- **Borrowing and Returning**: Member users can borrow a book if it's available. They can't borrow the same book multiple times. The system tracks when a book was borrowed. Librarian users can mark a book as returned.

- **Dashboard**: Librarians have a dashboard showing total books, total borrowed books, books due today, and a list of members with overdue books. Members have a dashboard showing books they've borrowed, their due dates, and any overdue books.

- **Frontend**: The frontend is developed using React and is responsive and user-friendly.

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Express](https://expressjs.com/) - Minimal and flexible Node.js web application framework
- [Sequelize](https://sequelize.org/) - Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server
- [MySQL](https://www.mysql.com/) - Open-source relational database management system
- [React](https://react.dev/) - Platform for building web applications

## Authors

- Juan Peña - Initial work
 
