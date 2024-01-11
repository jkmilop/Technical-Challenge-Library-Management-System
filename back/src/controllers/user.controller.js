const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

const handleError = (res, error) => {
  console.error('Error:', error);
  return res.status(500).json({ message: 'Internal Server Error' });
};

const register = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    if (role !== 'Librarian' && role !== 'Member') {
      return res.status(400).json({ message: 'Invalid user role' });
    }
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role,
    });

    res.json(newUser);
  } catch (error) {
    handleError(res, error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'yourSecretKey', { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (error) {
    handleError(res, error);
  }
};

const logout = (req, res) => {
  res.clearCookie('jwtToken'); // Assuming the token is stored in a cookie
  res.json({ message: 'Logout successful' });
};

module.exports = {
  register,
  login,
  logout,
  
};
