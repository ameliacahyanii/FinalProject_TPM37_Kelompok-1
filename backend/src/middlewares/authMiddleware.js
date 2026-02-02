// import modules
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const verifyToken = (req, res, next) => {
	// ambil token dari Header -> "Authorization: Bearer <token>"
	const authHeader = req.headers["authorization"];

	// validasi exist
	if (!authHeader) {
		return res.status(401).json({
			success: false,
			error: "Akses ditolak! Token tidak ditemukan.",
		});
	}

	// split string "Bearer <token>" untuk ambil token
	const token = authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			success: false,
			error: "Format token salah!",
		});
	}

	// verifikasi token
	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({
				success: false,
				error: "Token tidak valid atau sudah kadaluarsa!",
			});
		}

		// simpan data user hasil decode ke req.user
		req.user = decoded;

		next(); // lanjut ke handler berikutnya
	});
};

module.exports = verifyToken;
