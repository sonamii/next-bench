CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"city" text,
	"state" text,
	"country" text,
	"phone" text,
	"goal" text,
	"universities" jsonb,
	"created_at" timestamp DEFAULT now()
);
