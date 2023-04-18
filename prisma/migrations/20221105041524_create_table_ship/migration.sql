-- CreateTable
CREATE TABLE `ship` (
    `id_ship` INTEGER NOT NULL AUTO_INCREMENT,
    `fuel_capacity` INTEGER NOT NULL,
    `fuel_level` INTEGER NOT NULL,
    `weightCapacity` INTEGER NOT NULL,
    `idPilot` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_ship`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ship` ADD CONSTRAINT `ship_idPilot_fkey` FOREIGN KEY (`idPilot`) REFERENCES `pilot`(`id_pilot`) ON DELETE RESTRICT ON UPDATE CASCADE;
