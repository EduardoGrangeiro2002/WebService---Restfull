-- DropForeignKey
ALTER TABLE `ship` DROP FOREIGN KEY `ship_idPilot_fkey`;

-- AlterTable
ALTER TABLE `ship` MODIFY `idPilot` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ship` ADD CONSTRAINT `ship_idPilot_fkey` FOREIGN KEY (`idPilot`) REFERENCES `pilot`(`id_pilot`) ON DELETE SET NULL ON UPDATE CASCADE;
