-- AlterTable
ALTER TABLE "User" ADD COLUMN "fullName" TEXT,
ADD COLUMN "email" TEXT,
ADD COLUMN "img" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
