const verifyAdmin = (req, res, next) => {
	// cek if req.user ada dan role-nya admin
	if (!req.user || req.user.role !== "admin") {
		return res.status(403).json({
			success: false,
			error: "Akses Ditolak! Area ini khusus Admin.",
		});
	}

	next(); // lanjut ke handler berikutnya
};

module.exports = verifyAdmin;
