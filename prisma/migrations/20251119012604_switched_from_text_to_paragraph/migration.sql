/*
  Warnings:

  - You are about to drop the column `text` on the `BlogParagraph` table. All the data in the column will be lost.
  - Added the required column `paragraph` to the `BlogParagraph` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogParagraph" DROP COLUMN "text",
ADD COLUMN     "paragraph" TEXT NOT NULL;
