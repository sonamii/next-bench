ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "universities" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_login" timestamp;--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "created_at";