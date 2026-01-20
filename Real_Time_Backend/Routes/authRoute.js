const express = require("express");
const router = express.Router();

const UserController = require("../Controller/UserController")

router.post("/register/user",UserController.registerUser);
router.post("/login/user",UserController.loginUser);

module.exports = router;