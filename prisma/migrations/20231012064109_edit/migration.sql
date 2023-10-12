/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `cart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.
  - You are about to alter the column `totalPrice` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.
  - You are about to alter the column `totalPrice` on the `orderitem` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `cart` MODIFY `totalPrice` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `totalPrice` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` MODIFY `totalPrice` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `price` DECIMAL(10, 2) NOT NULL;
