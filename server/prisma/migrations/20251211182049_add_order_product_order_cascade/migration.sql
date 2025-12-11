-- DropForeignKey
ALTER TABLE `order_products` DROP FOREIGN KEY `order_products_order_id_fkey`;

-- AddForeignKey
ALTER TABLE `order_products` ADD CONSTRAINT `order_products_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;
