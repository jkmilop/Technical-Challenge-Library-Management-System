const { Router } = require("express");
const {
  register,
  login,
  logout,
} = require("../controllers/user.controller.js");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
