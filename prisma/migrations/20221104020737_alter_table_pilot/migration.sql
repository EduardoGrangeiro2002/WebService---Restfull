/*
  Warnings:

  - A unique constraint covering the columns `[pilot_certification]` on the table `pilot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `pilot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `pilot_name_pilot_certification_key` ON `pilot`;

-- CreateIndex
CREATE UNIQUE INDEX `pilot_pilot_certification_key` ON `pilot`(`pilot_certification`);

-- CreateIndex
CREATE UNIQUE INDEX `pilot_name_key` ON `pilot`(`name`);
