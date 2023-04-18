/*
  Warnings:

  - A unique constraint covering the columns `[idPilot]` on the table `ship` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ship_idPilot_key` ON `ship`(`idPilot`);
