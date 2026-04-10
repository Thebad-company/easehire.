-- AlterTable
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "brandingColor" TEXT;

-- AlterTable
ALTER TABLE "Application" ADD COLUMN IF NOT EXISTS "rating" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "slug" TEXT;
ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "type" TEXT;

-- Backfill existing jobs with stable public slugs before enforcing NOT NULL.
UPDATE "Job"
SET "slug" = TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER("title"), '[^a-z0-9]+', '-', 'g')) || '-' || RIGHT("id", 6)
WHERE "slug" IS NULL OR "slug" = '';

ALTER TABLE "Job" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Job_companyId_slug_key" ON "Job"("companyId", "slug");
