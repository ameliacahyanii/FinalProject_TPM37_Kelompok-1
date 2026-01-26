const { PrismaClient } = require("@prisma/client");

async function testConnection() {
	const prisma = new PrismaClient();

	try {
		await prisma.$connect();
		console.log("✅ MySQL connection successful!");
	} catch (error) {
		console.error("❌ MySQL connection failed:", error.message);
	} finally {
		await prisma.$disconnect();
	}
}

testConnection();
