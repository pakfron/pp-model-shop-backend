/*
  Warnings:

  - You are about to drop the column `DateTime` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `QrImageUrl` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `Slip` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `order` table. All the data in the column will be lost.
  - The values [Cart] on the enum `order_OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `Quantity` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `totalPriceEachProduct` on the `orderitem` table. All the data in the column will be lost.
  - Added the required column `qrImageUrl` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `orderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `orderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `DateTime`,
    DROP COLUMN `QrImageUrl`,
    DROP COLUMN `Slip`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `dateTime` DATETIME(3) NULL,
    ADD COLUMN `qrImageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `slip` VARCHAR(191) NULL,
    MODIFY `OrderStatus` ENUM('Pending', 'Success') NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `Quantity`,
    DROP COLUMN `totalPriceEachProduct`,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `totalPrice` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
