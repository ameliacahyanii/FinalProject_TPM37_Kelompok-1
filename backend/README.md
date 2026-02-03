# Hackathon 2025 Website Project - Technical Reference

**Project Status:** Active Development
**Role:** Full Stack Developer (Monolith Architecture)
**Documentation Version:** 2.0 (Comprehensive)

---

## 1. Project Scope & Requirements

Website ini adalah platform pendaftaran dan informasi untuk event Hackathon 2025. Sistem ini mencakup Landing Page publik, sistem pendaftaran tim (Multi-step), Dashboard peserta, dan Panel Admin.

**Key Functional Requirements (Based on TPM 37 PDF):**

1.  [cite_start]**Landing Page:** Hero section, Prizes, Mentor/Jury, FAQ (Accordion), Timeline, dan Contact Us Form [cite: 4-20].
2.  [cite_start]**Registration:** Multi-step form (Group Info -> Leader Info -> Upload Files) dengan validasi ketat[cite: 37].
3.  [cite_start]**Authentication:** Login Peserta (Nama Tim & Password) dan Login Admin (Username & Password)[cite: 67, 78].
4.  [cite_start]**Dashboard User:** Melihat status tim, data leader (read-only), dan download CV/ID Card [cite: 68-72].
5.  [cite_start]**Admin Panel:** CRUD Peserta, Search (by Name), dan Sort (Alphabetical/Registration Time) [cite: 83-93].
6.  [cite_start]**Contact Us:** Form yang mengirim email otomatis ke panitia (`cio@bncc.net`)[cite: 23, 111].

---

## 2. Tech Stack (Strict Versions)

Gunakan versi ini untuk stabilitas dan menghindari konflik:

- **Runtime:** Node.js v18 LTS / v20 LTS
- **Framework:** Express.js v4.19.2
- **Database:** MySQL 8.0
- **ORM:** Prisma v5.12.0
- **Auth:** `jsonwebtoken` v9.0.2, `bcryptjs` v2.4.3
- **Validation:** `zod` v3.22.4 (Server-side validation)
- **File Upload:** `multer` v1.4.5-lts.1
- **Email:** `nodemailer` v6.9.13
- **Frontend:** Vanilla JS (ES6+), HTML5, Tailwind CSS.

---

## 3. Database Schema (Prisma)

Implementasi ERD berdasarkan requirement PDF.

```prisma
// schema.prisma

model Team {
  id        Int      @id @default(autoincrement())
  name      String   @unique // Login username [cite: 67]
  password  String   // Hashed (Min 8 char, Upper, Lower, Number, Symbol)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  leader    Leader?
}

model Leader {
  id           Int      @id @default(autoincrement())
  fullName     String
  email        String   @unique // Valid email format
  whatsapp     String   @unique // Min 9 digits
  lineId       String   @unique
  githubId     String
  birthPlace   String
  birthDate    DateTime // Validation: Age >= 17 years
  cvUrl        String   // File path (PDF/JPG/PNG)
  idCardUrl    String   // File path (PDF/JPG/PNG)
  isBinusian   Boolean  // Dropdown option [cite: 49]

  teamId       Int      @unique
  team         Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)
}

model Admin {
  id       Int    @id @default(autoincrement())
  username String @unique // [cite: 78]
  password String
}
```

---

## 3.1. Contact Us / Email Feature

The application includes a Contact Us form that allows visitors to send inquiries directly to the organizers.

### **Files Involved:**

1. **Controller:** `src/controllers/generalController.js`
    - Function: `contactUs(req, res)`
    - Handles form submission and email sending

2. **Route:** `src/routes/generalRoutes.js`
    - Endpoint: `POST /api/contact`
    - Public endpoint (no authentication required)

3. **Frontend:** `public/index.html`
    - Contact form with fields: name, email, subject, message
    - Client-side validation and API integration

### **How It Works:**

1. User fills out the contact form on the homepage
2. Form submits data to `POST /api/contact` endpoint
3. Backend validates all required fields (name, email, subject, message)
4. Nodemailer sends email via SMTP
5. Response sent back to user with success/error message

### **Configuration Required:**

Add these to your `.env` file:

```env
# Email Configuration (for Contact Us form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_TO=cio@bncc.net
EMAIL_FROM=noreply@hackathon2025.com
```

### **Using Gmail SMTP:**

1. **Enable 2-Factor Authentication:**
    - Go to your Google Account settings
    - Navigate to Security → 2-Step Verification
    - Enable 2FA

2. **Generate App Password:**
    - Visit: https://myaccount.google.com/apppasswords
    - Select "Mail" and "Other (Custom name)"
    - Name it "Hackathon Contact Form"
    - Copy the 16-character password
    - Use this password in `EMAIL_PASS` (no spaces)

3. **Update `.env`:**
    ```env
    EMAIL_USER=your.email@gmail.com
    EMAIL_PASS=abcd efgh ijkl mnop  # Your 16-char app password
    ```

### **Using Other SMTP Providers:**

**SendGrid:**

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
```

**Mailgun:**

```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_PASS=your_mailgun_password
```

**Outlook/Hotmail:**

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

### **Testing Email Feature:**

**Development Mode (Using Ethereal):**
The controller uses nodemailer's test account for development:

```bash
# Start server
npm run dev

# Submit contact form
# Check terminal output for "Preview URL"
# Click the URL to see the email in Ethereal's inbox
```

**Production Mode (Using Real SMTP):**
Update `generalController.js` to use environment variables:

```javascript
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

await transporter.sendMail({
	from: `"${name}" <${process.env.EMAIL_FROM}>`,
	to: process.env.EMAIL_TO,
	subject: `[Contact Us] ${subject}`,
	text: message,
	html: `...`,
});
```

### **API Endpoint Details:**

**Request:**

```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about Hackathon",
  "message": "When does the registration close?"
}
```

**Success Response (200):**

```json
{
	"success": true,
	"message": "Pesan berhasil dikirim! Cek terminal server untuk link preview."
}
```

**Error Response (400):**

```json
{
	"success": false,
	"error": "Semua field wajib diisi!"
}
```

**Error Response (500):**

```json
{
	"success": false,
	"error": "Gagal mengirim email."
}
```

### **Troubleshooting Email Issues:**

**Issue: "Invalid login" or "Authentication failed"**

- Gmail: Use App Password, not regular password
- Verify EMAIL_USER and EMAIL_PASS are correct
- Check if 2FA is enabled (required for Gmail)

**Issue: "Connection timeout"**

- Check firewall settings
- Verify EMAIL_HOST and EMAIL_PORT
- Try using port 465 (secure) instead of 587

**Issue: "Email not received"**

- Check spam/junk folder
- Verify EMAIL_TO address is correct
- Check SMTP provider's sending limits
- View email logs in your SMTP provider dashboard

**Issue: "self signed certificate" error**
Add to transporter config:

```javascript
tls: {
	rejectUnauthorized: false;
}
```

---

## 4. Complete Setup Guide

### 🔧 Prerequisites (Must Install First)

Before starting, ensure you have the following installed on your system:

#### 1. **Node.js (v18 LTS or v20 LTS)**

- **Windows:**
    - Download from: https://nodejs.org/
    - Run installer and follow wizard
    - Verify installation:
        ```bash
        node --version    # Should show v18.x.x or v20.x.x
        npm --version     # Should show 9.x.x or higher
        ```

- **macOS:**

    ```bash
    # Using Homebrew
    brew install node@20

    # Or download from nodejs.org
    ```

- **Linux (Ubuntu/Debian):**
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

#### 2. **MySQL 8.0**

- **Windows:**
    - Download MySQL Installer from: https://dev.mysql.com/downloads/installer/
    - Choose "Custom" installation
    - Select: MySQL Server 8.0, MySQL Workbench (optional)
    - Set root password during installation (remember this!)
    - Verify installation:
        ```bash
        mysql --version
        ```

- **macOS:**

    ```bash
    # Using Homebrew
    brew install mysql@8.0
    brew services start mysql@8.0

    # Secure installation
    mysql_secure_installation
    ```

- **Linux (Ubuntu/Debian):**
    ```bash
    sudo apt update
    sudo apt install mysql-server
    sudo systemctl start mysql
    sudo mysql_secure_installation
    ```

#### 3. **Git (Optional but Recommended)**

- Download from: https://git-scm.com/downloads
- Verify: `git --version`

#### 4. **Code Editor**

- **Recommended:** Visual Studio Code (https://code.visualstudio.com/)
- **Extensions:** Prisma, ESLint, Prettier

---

### 📦 Project Installation (Step-by-Step)

#### Step 1: Clone or Download Project

```bash
# If using Git
git clone <repository-url>
cd FinalProject_TPM37_Kelompok-1

# Or download ZIP and extract
```

#### Step 2: Navigate to Backend Folder

```bash
cd backend
```

#### Step 3: Install Node.js Dependencies

```bash
# Install all dependencies from package.json
npm install

# This will install:
# - express (v4.19.2) - Web framework
# - @prisma/client (v5.12.0) - Database ORM client
# - bcryptjs (v2.4.3) - Password hashing
# - jsonwebtoken (v9.0.2) - JWT authentication
# - multer (v1.4.5-lts.1) - File upload handling
# - nodemailer (v6.9.13) - Email sending
# - zod (v3.22.4) - Data validation
# - cors (v2.8.5) - CORS middleware
# - dotenv (v16.4.5) - Environment variables
# - ejs (v4.0.1) - Template engine
# - mysql2 (v3.9.4) - MySQL driver
# - nodemon (v3.1.0) - Development auto-restart
# - prisma (v5.12.0) - Database toolkit

# Wait for installation to complete (may take 2-5 minutes)
```

**Troubleshooting npm install:**

```bash
# If you get permission errors (Linux/Mac):
sudo npm install

# If you get EACCES errors:
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH

# If you get network errors:
npm install --registry=https://registry.npmmirror.com

# Clear cache if installation fails:
npm cache clean --force
npm install
```

#### Step 4: Create MySQL Database

Open MySQL command line or MySQL Workbench:

**Option A: Using MySQL Command Line**

```bash
# Login to MySQL
mysql -u root -p
# Enter your MySQL root password

# Create database
CREATE DATABASE hackathon_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Create dedicated user (recommended for security)
CREATE USER 'hackathon_user'@'localhost' IDENTIFIED BY 'your_strong_password_here';

# Grant permissions
GRANT ALL PRIVILEGES ON hackathon_db.* TO 'hackathon_user'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
EXIT;
```

**Option B: Using MySQL Workbench**

1. Open MySQL Workbench
2. Connect to Local MySQL Instance
3. Click "Create New Schema" icon
4. Name: `hackathon_db`
5. Charset: `utf8mb4`, Collation: `utf8mb4_unicode_ci`
6. Click "Apply"

#### Step 5: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
# Windows Command Prompt
type nul > .env

# Windows PowerShell
New-Item .env -ItemType File

# macOS/Linux
touch .env
```

**Edit `.env` file and add the following:**

```env
# Database Configuration
DATABASE_URL="mysql://root:your_mysql_password@localhost:3306/hackathon_db"

# Or if using dedicated user:
# DATABASE_URL="mysql://hackathon_user:your_strong_password_here@localhost:3306/hackathon_db"

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (CHANGE THIS TO A RANDOM STRING!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars

# Email Configuration (for Contact Us form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_TO=cio@bncc.net
EMAIL_FROM=noreply@hackathon2025.com

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./public/uploads
```

**Important Notes:**

- Replace `your_mysql_password` with your actual MySQL password
- Generate secure JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- For Gmail: Enable 2FA and create App Password (https://myaccount.google.com/apppasswords)

#### Step 6: Generate Prisma Client

```bash
# Generate Prisma Client based on schema
npx prisma generate

# Expected output:
# ✔ Generated Prisma Client (v5.12.0)
```

#### Step 7: Run Database Migrations

```bash
# Create tables in database
npx prisma migrate dev --name init

# This will:
# 1. Create migration files in prisma/migrations/
# 2. Execute SQL to create tables (Team, Leader, Admin)
# 3. Update Prisma Client

# Expected output:
# ✔ Migration applied successfully
```

**Troubleshooting Migrations:**

```bash
# If migration fails, reset database:
npx prisma migrate reset --force

# If you need to push schema without migration history:
npx prisma db push

# View migration status:
npx prisma migrate status
```

#### Step 8: Seed Database (Optional)

Populate database with initial admin account:

```bash
# Run seed script
npx prisma db seed

# This creates:
# - Admin account: username "admin", password "Admin123!"
# - Sample team data (if configured)

# Expected output:
# ✔ Seeding completed
```

**If seed script doesn't exist, create it:**

Create `prisma/seed.js`:

```javascript
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Starting database seed...");

	// Create default admin
	const hashedPassword = await bcrypt.hash("Admin123!", 10);
	const admin = await prisma.admin.upsert({
		where: { username: "admin" },
		update: {},
		create: {
			username: "admin",
			password: hashedPassword,
		},
	});

	console.log("✅ Admin created:", admin);
	console.log("📧 Login: admin / Admin123!");
}

main()
	.catch((e) => {
		console.error("❌ Seed error:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
```

#### Step 9: Create Upload Directory

```bash
# Windows
mkdir public\uploads
mkdir public\uploads\cv
mkdir public\uploads\idcard

# macOS/Linux
mkdir -p public/uploads/{cv,idcard}
```

#### Step 10: Verify Project Structure

Your backend folder should look like this:

```
backend/
├── node_modules/          ✅ (Created by npm install)
├── prisma/
│   ├── migrations/        ✅ (Created by migrate)
│   ├── schema.prisma      ✅
│   └── seed.js            ✅
├── public/
│   ├── uploads/           ✅ (Created in Step 9)
│   └── index.html         ✅ (Contact Us form)
├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── teamController.js
│   │   ├── adminController.js
│   │   ├── viewController.js
│   │   └── generalController.js  ✅ (Contact Us email)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── teamRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── viewRoutes.js
│   │   └── generalRoutes.js      ✅ (Contact endpoint)
│   ├── middlewares/
│   └── config/
├── views/                 ✅ (EJS templates)
│   ├── partials/
│   ├── admin/
│   └── *.ejs
├── .env                   ✅ (Created in Step 5)
├── package.json           ✅
└── README.md              ✅
```

---

### 🚀 Running the Application

#### Development Mode (with auto-restart)

```bash
# Start development server
npm run dev

# Expected output:
# [nodemon] starting `node src/app.js`
# 🚀 Server running on http://localhost:3000
# ✅ Database connected

# Server will auto-restart when you save files
```

#### Production Mode

```bash
# Start production server
npm start

# Expected output:
# 🚀 Server running on http://localhost:3000
```

#### Verify Server is Running

Open browser and visit:

- **Homepage:** http://localhost:3000/
- **Login:** http://localhost:3000/login
- **Register:** http://localhost:3000/register
- **Admin Login:** http://localhost:3000/admin/login

---

### 🧪 Testing the Setup

#### 1. Test API Health

```bash
# Using curl
curl http://localhost:3000/api

# Using browser
# Visit: http://localhost:3000/api
# Should see: {"message": "API is running"}
```

#### 2. Test Database Connection

```bash
# Open Prisma Studio (Database GUI)
npx prisma studio

# Opens in browser: http://localhost:5555
# You can view/edit database records here
```

#### 3. Test Admin Login

1. Visit: http://localhost:3000/admin/login
2. Username: `admin`
3. Password: `Admin123!`
4. Should redirect to admin dashboard

#### 4. Test Team Registration

1. Visit: http://localhost:3000/register
2. Fill out form with valid data
3. Upload CV and ID Card (PDF/JPG/PNG, max 5MB)
4. Submit and verify registration success

#### 5. Test Team Login

1. Visit: http://localhost:3000/login
2. Use team name and password from registration
3. Should redirect to team dashboard
4. Verify all data displays correctly

#### 6. Test Contact Us Form

1. Visit: http://localhost:3000/ (homepage)
2. Scroll to "Hubungi Kami" section
3. Fill out all fields:
    - Nama: Your name
    - Email: Valid email address
    - Subject: Test message
    - Pesan: Your inquiry
4. Click "Kirim Pesan"
5. Should see success message
6. **Development mode:** Check terminal for "Preview URL" link
7. **Production mode:** Check EMAIL_TO inbox for received email

---

### 🛠️ Common Issues & Solutions

#### Issue 1: "Cannot find module 'express'"

**Solution:**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Issue 2: "Error: P1001 - Can't reach database server"

**Solutions:**

- Check if MySQL is running:

    ```bash
    # Windows
    net start MySQL80

    # macOS
    brew services start mysql@8.0

    # Linux
    sudo systemctl start mysql
    ```

- Verify DATABASE_URL in `.env` is correct
- Test MySQL connection:
    ```bash
    mysql -u root -p
    ```

#### Issue 3: "Port 3000 is already in use"

**Solutions:**

- Change PORT in `.env` to 3001, 3002, etc.
- Or kill process using port 3000:

    ```bash
    # Windows
    netstat -ano | findstr :3000
    taskkill /PID <PID_NUMBER> /F

    # macOS/Linux
    lsof -ti:3000 | xargs kill -9
    ```

#### Issue 4: "Prisma Client did not initialize yet"

**Solution:**

```bash
npx prisma generate
npm run dev
```

#### Issue 5: "File upload not working"

**Solutions:**

- Check `public/uploads` folder exists
- Verify folder permissions (read/write)
- Check file size (max 5MB)
- Verify file type (PDF, JPG, PNG only)

#### Issue 6: "JWT malformed" or "Token invalid"

**Solutions:**

- Clear browser localStorage: `localStorage.clear()`
- Verify JWT_SECRET in `.env` is set
- Re-login to get new token

#### Issue 7: "Email not sending"

**Solutions:**

- Check EMAIL\_\* variables in `.env`
- For Gmail: Enable "Less secure app access" or use App Password
- Test SMTP connection:
    ```javascript
    // Test in Node REPL
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
    	host: "smtp.gmail.com",
    	port: 587,
    	auth: { user: "your@email.com", pass: "your_password" },
    });
    transporter.verify((err, success) => console.log(err || "Ready"));
    ```

---

### 📝 Development Workflow

#### 1. Making Changes to Database Schema

```bash
# Edit prisma/schema.prisma
# Then run:
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

#### 2. Viewing Database Data

```bash
# Open Prisma Studio
npx prisma studio

# Or use MySQL Workbench
# Or use command line:
mysql -u root -p hackathon_db
SELECT * FROM Team;
```

#### 3. Resetting Database (⚠️ Deletes all data!)

```bash
npx prisma migrate reset
npx prisma db seed
```

#### 4. Creating New API Endpoint

1. Create controller in `src/controllers/`
2. Create route in `src/routes/`
3. Import route in `src/app.js`
4. Test with Postman or curl

#### 5. Creating New View Page

1. Create EJS file in `views/`
2. Add controller method in `src/controllers/viewController.js`
3. Add route in `src/routes/viewRoutes.js`
4. Visit http://localhost:3000/your-page

---

### 🔒 Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to strong random string (min 32 chars)
- [ ] Use environment-specific `.env` files (don't commit to Git!)
- [ ] Enable HTTPS/SSL
- [ ] Set secure cookie options (httpOnly, secure, sameSite)
- [ ] Implement rate limiting (express-rate-limit)
- [ ] Sanitize user inputs (helmet, express-validator)
- [ ] Set up CORS properly (restrict origins)
- [ ] Use prepared statements (Prisma does this automatically)
- [ ] Hash all passwords (bcrypt with salt rounds >= 10)
- [ ] Validate file uploads (type, size, sanitize filenames)
- [ ] Set up logging (winston, morgan)
- [ ] Configure error handling (don't expose stack traces)

---

### 📚 Additional Resources

**Documentation:**

- Express.js: https://expressjs.com/
- Prisma: https://www.prisma.io/docs
- EJS: https://ejs.co/
- JWT: https://jwt.io/

**Tools:**

- Postman: https://www.postman.com/ (API testing)
- MySQL Workbench: https://www.mysql.com/products/workbench/
- Prisma Studio: `npx prisma studio` (Database GUI)

**Learning:**

- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices
- RESTful API Design: https://restfulapi.net/
- MySQL Tutorial: https://www.mysqltutorial.org/

---

### 🆘 Getting Help

If you encounter issues:

1. **Check logs:** Look at terminal output for error messages
2. **Check `.env`:** Verify all environment variables are set correctly
3. **Check database:** Use Prisma Studio or MySQL Workbench
4. **Clear cache:** Delete `node_modules`, run `npm install`
5. **Reset database:** Run `npx prisma migrate reset`
6. **Check documentation:** Review API_Contract.md and INTEGRATION_GUIDE.md

**Still stuck?** Check these files in the project:

- `API_Contract.md` - Complete API documentation
- `INTEGRATION_GUIDE.md` - Frontend-backend integration guide
- `DASHBOARD_FIX_SUMMARY.md` - Dashboard troubleshooting
- `struktur.txt` - Project structure overview
