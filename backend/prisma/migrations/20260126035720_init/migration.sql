-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Team_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leader` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `whatsapp` VARCHAR(191) NOT NULL,
    `lineId` VARCHAR(191) NOT NULL,
    `githubId` VARCHAR(191) NOT NULL,
    `birthPlace` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `cvUrl` VARCHAR(191) NOT NULL,
    `idCardUrl` VARCHAR(191) NOT NULL,
    `isBinusian` BOOLEAN NOT NULL,
    `teamId` INTEGER NOT NULL,

    UNIQUE INDEX `Leader_email_key`(`email`),
    UNIQUE INDEX `Leader_whatsapp_key`(`whatsapp`),
    UNIQUE INDEX `Leader_lineId_key`(`lineId`),
    UNIQUE INDEX `Leader_teamId_key`(`teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Leader` ADD CONSTRAINT `Leader_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
