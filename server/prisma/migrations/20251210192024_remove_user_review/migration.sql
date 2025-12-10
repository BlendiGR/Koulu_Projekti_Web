/*
  Warnings:

  - You are about to drop the column `review_user_id` on the `reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_review_user_id_fkey`;

-- DropIndex
DROP INDEX `reviews_review_user_id_fkey` ON `reviews`;

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `review_user_id`,
    ADD COLUMN `reviewer_name` VARCHAR(191) NOT NULL DEFAULT '';
