-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT ('now'::text)::timestamp(6) with time zone,
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "username" DROP DEFAULT,
ALTER COLUMN "username" SET DATA TYPE TEXT;
