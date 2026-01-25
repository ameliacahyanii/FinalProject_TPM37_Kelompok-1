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

-   **Runtime:** Node.js v18 LTS / v20 LTS
-   **Framework:** Express.js v4.19.2
-   **Database:** MySQL 8.0
-   **ORM:** Prisma v5.12.0
-   **Auth:** `jsonwebtoken` v9.0.2, `bcryptjs` v2.4.3
-   **Validation:** `zod` v3.22.4 (Server-side validation)
-   **File Upload:** `multer` v1.4.5-lts.1
-   **Email:** `nodemailer` v6.9.13
-   **Frontend:** Vanilla JS (ES6+), HTML5, Tailwind CSS.

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
