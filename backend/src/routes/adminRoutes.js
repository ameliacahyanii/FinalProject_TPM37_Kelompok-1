// import modules
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyToken = require("../middlewares/authMiddleware"); // cek token valid atau tidak
const verifyAdmin = require("../middlewares/adminMiddleware"); // cek role admin atau tidak

// pasang middleware di level router agar semua endpoint di bawah ini terlindungi
router.use(verifyToken, verifyAdmin);

// Endpoint Admin
router.get("/participants", adminController.getAllTeams);
router.delete("/teams/:id", adminController.deleteTeam);
router.put("/teams/:id", adminController.editTeam);

module.exports = router;
