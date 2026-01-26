const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../config/multer");

router.post(
	"/register",
	upload.fields([
		{ name: "cvFile", maxCount: 1 },
		{ name: "idCardFile", maxCount: 1 },
	]),
	authController.register,
);
router.post("/login", authController.login);

module.exports = router;
