-- CreateTable
CREATE TABLE "FormResponse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "response" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    CONSTRAINT "FormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
