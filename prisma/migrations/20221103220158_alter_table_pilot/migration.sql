/*
  Warnings:

  - You are about to alter the column `pilot_certification` on the `pilot` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `name` on the `pilot` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - A unique constraint covering the columns `[name]` on the table `pilot` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pilot` MODIFY `pilot_certification` VARCHAR(10) NOT NULL,
    MODIFY `name` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pilot_name_key` ON `pilot`(`name`);
