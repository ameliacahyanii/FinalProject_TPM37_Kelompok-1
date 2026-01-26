// multer.js

const multer = require("multer");
const path = require("path");

// 1. Menentukan LOKASI dan FILE NAME
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads/");
	},
	filename: (req, file, cb) => {
		// Format nama: TIMESTAMP-NamaAsli.ext
		// Contoh: 170988888-cv_budi.pdf
		// Tujuannya agar nama file tidak bentrok jika ada 2 user upload "cv.pdf"
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + path.extname(file.originalname));
	},
});

// 2. FILTER tipe file
const fileFilter = (req, file, cb) => {
	// hanya terima PDF, JPG, JPEG, PNG, sesuai requirement PDF
	const allowedTypes = /jpeg|jpg|png|pdf/;
	const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = allowedTypes.test(file.mimetype);

	if (extName && mimeType) {
		cb(null, true);
	} else {
		cb(new Error("Hanya file PDF, JPG, JPEG, dan PNG yang diperbolehkan!"));
	}
};

// 3. Initialization Multer
const upload = multer({
	storage: storage,
	limits: {
		filesize: 5 * 1024 * 1024, // max: 5MB per file
	},
	fileFilter: fileFilter,
});

module.exports = upload;
