CREATE TABLE "checklists" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_order_checklists" (
	"id" text PRIMARY KEY NOT NULL,
	"service_order_id" text NOT NULL,
	"checklist_id" text NOT NULL,
	"checked" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_orders" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"photo_url" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "service_order_checklists" ADD CONSTRAINT "service_order_checklists_service_order_id_service_orders_id_fk" FOREIGN KEY ("service_order_id") REFERENCES "public"."service_orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_order_checklists" ADD CONSTRAINT "service_order_checklists_checklist_id_checklists_id_fk" FOREIGN KEY ("checklist_id") REFERENCES "public"."checklists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;