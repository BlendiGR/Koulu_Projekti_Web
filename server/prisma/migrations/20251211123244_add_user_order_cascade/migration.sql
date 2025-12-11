-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_order_user_id_fkey`;

-- DropIndex
DROP INDEX `orders_order_user_id_fkey` ON `orders`;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_order_user_id_fkey` FOREIGN KEY (`order_user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;