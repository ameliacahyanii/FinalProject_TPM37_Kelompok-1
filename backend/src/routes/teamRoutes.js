// src/routes/teamRoutes.js
const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const verifyToken = require("../middlewares/authMiddleware"); // Import Satpam

// /api/team/me
router.get("/me", verifyToken, teamController.getMe);

module.exports = router;
