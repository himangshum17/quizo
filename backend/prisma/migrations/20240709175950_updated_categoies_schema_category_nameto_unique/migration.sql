/*
  Warnings:

  - A unique constraint covering the columns `[categoryName]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Categories_categoryName_key` ON `Categories`(`categoryName`);
