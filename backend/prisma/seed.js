const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
	// Admin Credentials
	const adminUserrname = "admin";
	const adminPassword = "admin123";

	// Hash passworrd (encryption)
	const hashedPassword = await bcrypt.hash(adminPassword, 10); // standarnya 10
	console.log("Hashed Password:", hashedPassword);

	// masukkan ke database (upsert)
	// upsert: kalau ada, update, kalau ga ada, create. aman untuk "duplikasi" data
	const admin = await prisma.admin.upsert({
		where: { username: adminUserrname },
		update: {}, // ga usah di update klo udah ada
		create: {
			username: adminUserrname,
			password: hashedPassword,
		},
	});

	console.log("Admin user created or already exists:", admin);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
