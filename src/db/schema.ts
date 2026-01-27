import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const authUsers = pgTable("users", {  // From auth.users introspect
  uuid: uuid("id").primaryKey(),
  email: text("email"),
});

export const profiles = pgTable("profiles", {  // New table
  uuid: uuid("id").primaryKey().defaultRandom(),  // Or .references(() => authUsers.id)
  name: text("name").notNull(),
  email: text("email").notNull(),  // Duplicate for queries
  city: text("city"),
  state: text("state"),
  country: text("country"),
  phone: text("phone"),
  goal: text("goal"),
  universities: jsonb("universities"),  
  createdAt: timestamp("created_at").defaultNow(),
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  authUser: one(authUsers, { fields: [profiles.uuid], references: [authUsers.uuid] }),
}));
