-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_review_user_id_fkey`;

-- DropIndex
DROP INDEX `reviews_review_user_id_fkey` ON `reviews`;

-- AlterTable
ALTER TABLE `order_products` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `orderer_name` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_review_user_id_fkey` FOREIGN KEY (`review_user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
