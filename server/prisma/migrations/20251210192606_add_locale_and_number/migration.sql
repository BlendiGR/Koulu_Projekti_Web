/*
  Warnings:

  - Added the required column `phone` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `locale` VARCHAR(191) NOT NULL DEFAULT 'en';
