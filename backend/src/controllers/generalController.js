// import modules
const nodemailer = require("nodemailer");

const contactUs = async (req, res) => {
	try {
		const { name, email, subject, message } = req.body;

		// input validation
		if (!name || !email || !subject || !message) {
			return res.status(400).json({
				success: false,
				error: "Semua field wajib diisi!",
			});
		}

		// dummy account for testing dari nodemailer
		let testAccount = await nodemailer.createTestAccount();

		// transporter untuk mengirim email
		const transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user, // User dummy generate otomatis
				pass: testAccount.pass, // Password dummy generate otomatis
			},
		});

		// kirim email
		const info = await transporter.sendMail({
			from: `"${name}" <${email}>`, // Pengirim (dari form)
			to: "temporary@example.com", // Penerima (sesuai request Anda)
			subject: `[Contact Us] ${subject}`,
			text: message, // Versi Plaintext
			html: `
        <h3>Pesan Baru dari Website Hackathon</h3>
        <ul>
          <li>Nama: ${name}</li>
          <li>Email: ${email}</li>
        </ul>
        <p><strong>Pesan:</strong></p>
        <p>${message}</p>
      `,
		});

		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

		res.json({
			success: true,
			message: "Pesan berhasil dikirim! Cek terminal server untuk link preview.",
		});
	} catch (error) {
		console.error("Email Error:", error);
		res.status(500).json({ success: false, error: "Gagal mengirim email." });
	}
};

module.exports = {
	contactUs,
};
