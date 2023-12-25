-- CreateTable
CREATE TABLE "_requests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_requests_AB_unique" ON "_requests"("A", "B");

-- CreateIndex
CREATE INDEX "_requests_B_index" ON "_requests"("B");

-- AddForeignKey
ALTER TABLE "_requests" ADD CONSTRAINT "_requests_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_requests" ADD CONSTRAINT "_requests_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
