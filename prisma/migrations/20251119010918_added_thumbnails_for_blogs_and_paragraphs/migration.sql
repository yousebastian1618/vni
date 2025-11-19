/*
  Warnings:

  - You are about to drop the column `image` on the `BlogParagraph` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "BlogParagraph" DROP COLUMN "image",
ADD COLUMN     "thumbnail" TEXT;
