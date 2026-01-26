// import necessary modules
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "ini_rahasia";

// REGISTER
const register = async (req, res) => {
	try {
		// Cek File Upload
		// req.files berisi object array file yang diupload via multer
		const files = req.files;
		if (!files || !files["cvFile"] || !files["idCardFile"]) {
			return res.status(400).json({
				success: false,
				errorr: "Wajib upload CV dan ID Card!",
			});
		}

		const cvFileName = files["cvFile"][0].filename;
		const idCardFileName = files["idCardFile"][0].filename;

		const { name, password, fullName, email, whatsapp, lineId, githubId, birthPlace, birthDate } = req.body;

		// ---- 1. Validasi Umur (minimal 17 tahun) ----
		const birthDateObj = new Date(birthDate);
		const today = new Date();
		let age = today.getFullYear() - birthDateObj.getFullYear();
		const monthDiff = today.getMonth() - birthDateObj.getMonth();

		// Cek jika bulan lahir belum terjadi di tahun ini
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
			age--;
		}
		if (age < 17) {
			return res.status(400).json({
				success: false,
				error: "Umur minimal untuk registrasi adalah 17 tahun.",
			});
		}

		// ---- 2. validasi password ----
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		if (!passwordRegex.test(password)) {
			return res.status(400).json({
				success: false,
				error: "Password harus memiliki minimal 8 karakter, termasuk huruf besar, huruf kecil, angka, dan simbol.",
			});
		}

		// ---- 3. cek duplikasi manual ----
		// cek nama tim
		const existingTeam = await prisma.team.findUnique({
			where: { name },
		});
		if (existingTeam) {
			return res.status(400).json({
				success: false,
				error: "Nama tim sudah dipakai. Silakan pilih nama lain.",
			});
		}

		// cek email leader
		const existingEmail = await prisma.leader.findUnique({
			where: { email },
		});

		if (existingEmail) {
			return res.status(400).json({
				success: false,
				error: "Email sudah terdaftar. Silakan gunakan email lain.",
			});
		}

		// ---- 4. simpan data ----
		const hashedPassword = await bcrypt.hash(password, 10); // hash password, standar 10
		// simpan new team + leader ke db
		const newTeam = await prisma.team.create({
			data: {
				name: name,
				password: hashedPassword,
				leader: {
					create: {
						fullName,
						email,
						whatsapp,
						lineId,
						githubId,
						birthPlace,
						birthDate: birthDateObj,
						cvUrl: cvFileName,
						idCardUrl: idCardFileName,
						isBinusian: false, // default false
					},
				},
			},
			include: { leader: true }, // include leader data in the result
		});

		// kirim response sukses
		res.status(201).json({
			success: true,
			message: "Registrasi berhasil dengan file.",
			data: {
				teamName: newTeam.name,
				leaderName: newTeam.leader.fullName,
				files: {
					cv: newTeam.leader.cvUrl,
					idCard: newTeam.leader.idCardUrl,
				},
			},
		});
	} catch (error) {
		console.error("Register registration:", error);

		// handle error prisma unique constraint violation
		if (error.code === "P2002") {
			const target = error.meta.target;
			return res.status(400).json({
				success: false,
				error: `Data ${target} sudah terdaftar.`,
			});
		}
	}
};

// LOGIN

const login = async (req, res) => {
	try {
		const { name, password } = req.body;

		// cek team berdasarkan name di database
		const team = await prisma.team.findUnique({
			where: { name },
		});

		// jika team tidak ditemukan
		if (!team) {
			return res.status(404).json({
				success: false,
				error: "Nama tim atau password salah.",
			});
		}

		// 2. cek password yang diinput dengan yang di database (compare hash nya)
		const isMatch = await bcrypt.compare(password, team.password);
		if (!isMatch) {
			return res.status(404).json({
				success: false,
				error: "Nama tim atau password salah.",
			});
		}

		// 3. buat JWT token
		const token = jwt.sign(
			{
				id: team.id,
				name: team.name,
				role: "participant",
			}, // payload
			JWT_SECRET, // secret key
			{ expiresIn: "1d" }, // expiration
		);

		// kirim response sukses
		res.json({
			success: true,
			message: "Login berhasil.",
			token: token,
			role: "participant",
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({
			success: false,
			error: "Terjadi kesalahan server saat proses login.",
		});
	}
};

module.exports = {
	register,
	login,
};
