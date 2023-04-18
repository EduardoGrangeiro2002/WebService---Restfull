/*
  Warnings:

  - You are about to alter the column `name` on the `pilot` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(45)`.
  - You are about to alter the column `location_planet` on the `pilot` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(65)`.
  - A unique constraint covering the columns `[name,pilot_certification]` on the table `pilot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `pilot_name_key` ON `pilot`;

-- AlterTable
ALTER TABLE `pilot` MODIFY `name` VARCHAR(45) NOT NULL,
    MODIFY `location_planet` VARCHAR(65) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pilot_name_pilot_certification_key` ON `pilot`(`name`, `pilot_certification`);
