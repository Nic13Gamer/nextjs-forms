-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FormResponse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "response" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formId" TEXT NOT NULL,
    CONSTRAINT "FormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FormResponse" ("formId", "id", "response") SELECT "formId", "id", "response" FROM "FormResponse";
DROP TABLE "FormResponse";
ALTER TABLE "new_FormResponse" RENAME TO "FormResponse";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
