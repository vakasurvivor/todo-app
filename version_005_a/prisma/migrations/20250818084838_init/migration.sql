/*
  Warnings:

  - You are about to drop the column `title` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `text` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tasks" DROP COLUMN "title",
ADD COLUMN     "text" VARCHAR(50) NOT NULL;
