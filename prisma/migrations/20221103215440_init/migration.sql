-- CreateTable
CREATE TABLE `Pilot` (
    `id_pilot` INTEGER NOT NULL AUTO_INCREMENT,
    `pilot_certification` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `credits` DECIMAL(65, 30) NOT NULL,
    `location_planet` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_pilot`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
