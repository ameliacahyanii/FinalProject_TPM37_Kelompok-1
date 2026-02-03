const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");

// POST /api/contact
router.post("/contact", generalController.contactUs);

module.exports = router;
