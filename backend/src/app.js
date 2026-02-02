const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes"); // import routes
const teamRoutes = require("./routes/teamRoutes"); // import team routes

// load env variables dari .env
dotenv.config();

// express initialization
const app = express();
const PORT = process.env.PORT || 3000;

// --- middlewares ---
app.use(cors()); // biar bisa diakses dari luar domain, misal dari frontend
app.use(express.json()); // biar bisa parse JSON body
app.use(express.urlencoded({ extended: true })); // biar bisa parse URL-encoded body dari form submissions html

// static files
app.use(express.static(path.join(__dirname, "../public"))); // biar bisa akses file statis dari public folder

// --- routes ---
app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);

// basic route
app.get("/", (req, res) => {
	res.json({ message: "Hackathon 2025 Backend API" });
});

// start server
app.listen(PORT, () => {
	console.log(`\n🔥 Server running on http://localhost:${PORT}`);
	console.log(`📂 Serving static files from: public folder`);
});

module.exports = app;
