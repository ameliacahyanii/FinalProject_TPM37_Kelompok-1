// src/controllers/teamController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getMe = async (req, res) => {
	try {
		// ID dari req.user (hasil kerja middleware)
		const teamId = req.user.id;

		// search team + leader
		const team = await prisma.team.findUnique({
			where: { id: teamId },
			include: { leader: true },
		});

		if (!team) {
			return res.status(404).json({ success: false, error: "Team tidak ditemukan" });
		}

		// object baru tanpa password
		const safeData = {
			teamId: team.id,
			name: team.name,
			joinedAt: team.createdAt,
			leader: {
				fullName: team.leader.fullName,
				email: team.leader.email,
				whatsapp: team.leader.whatsapp,
				lineId: team.leader.lineId,
				githubId: team.leader.githubId,
				birthDate: team.leader.birthDate,
				// Kita beri URL lengkap agar frontend tinggal pasang di <a href>
				cvUrl: `/uploads/${team.leader.cvUrl}`,
				idCardUrl: `/uploads/${team.leader.idCardUrl}`,
			},
		};

		res.json({
			success: true,
			message: "Berhasil mengambil data dashboard",
			data: safeData,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Server Error" });
	}
};
