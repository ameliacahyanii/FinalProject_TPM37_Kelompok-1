// src/controllers/adminController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET ALL PARTICIPANTS (search & sort)
const getAllTeams = async (req, res) => {
	try {
		// ambil query params dari URL
		// ==> ?search=timhebat&sortBy=name&order=desc
		const { search, sortBy, order } = req.query;

		// settingan default untuk sorting
		const orderBy = {};
		if (sortBy === "name") {
			orderBy.name = order === "desc" ? "desc" : "asc";
		} else {
			orderBy.createdAt = order === "oldest" ? "asc" : "desc"; // default sorting dari terbaru
		}

		const teams = await prisma.team.findMany({
			where: {
				name: {
					contains: search || "", // Kalau kosong, ambil semua
				},
			},
			orderBy: orderBy,
			include: { leader: true }, // ambil data leadernya juga
		});

		// format data sesuai kebutuhan frontend
		const formattedData = teams.map((team) => ({
			id: team.id,
			teamName: team.name,
			leaderName: team.leader?.fullName || "-",
			email: team.leader?.email || "-",
			registeredAt: team.createdAt,
			cvUrl: `/uploads/${team.leader?.cvUrl}`,
			idCardUrl: `/uploads/${team.leader?.idCardUrl}`,
		}));

		res.json({
			success: true,
			data: formattedData,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Gagal mengambil data peserta." });
	}
};

// 2. DELETE TEAM
const deleteTeam = async (req, res) => {
	try {
		const { id } = req.params;

		await prisma.team.delete({
			where: { id: parseInt(id) },
		});

		res.json({ success: true, message: "Tim berhasil dihapus!" });
	} catch (error) {
		res.status(400).json({ success: false, error: "Gagal menghapus tim (ID tidak ditemukan)." });
	}
};

// 3. EDIT TEAM (Update Data Team & Leader)
const editTeam = async (req, res) => {
	try {
		const { id } = req.params;
		// ambil data dari body
		const { teamName, fullName, email, whatsapp } = req.body;

		// gunakan transaction untuk memastikan kedua update berhasil
		await prisma.$transaction([
			// 1. Update Tabel Team (Jika teamName dikirim)
			prisma.team.update({
				where: { id: parseInt(id) },
				data: {
					name: teamName, // Update nama tim (Login username berubah)
				},
			}),
			// 2. Update Tabel Leader
			prisma.leader.update({
				where: { teamId: parseInt(id) },
				data: {
					fullName,
					email,
					whatsapp,
				},
			}),
		]);

		res.json({ success: true, message: "Data Tim dan Peserta berhasil diupdate." });
	} catch (error) {
		console.error("Edit Error:", error);
		// Handle jika nama tim baru ternyata sudah dipakai tim lain
		if (error.code === "P2002") {
			return res.status(400).json({ success: false, error: "Nama Tim/Email sudah digunakan!" });
		}
		res.status(400).json({ success: false, error: "Gagal update data." });
	}
};

module.exports = {
	getAllTeams,
	deleteTeam,
	editTeam,
};
