/*
  Warnings:

  - Added the required column `value` to the `contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contract` ADD COLUMN `value` DECIMAL(32, 12) NOT NULL;
