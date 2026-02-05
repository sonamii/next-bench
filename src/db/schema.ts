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


export const edu = pgTable("edu", {
  uuid: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug"),
  mdx: text("mdx"),
  createdAt: timestamp("created_at").defaultNow(),
  ratings: text("ratings").default("0"),
  desc: text("desc"),
  name: text("name"),
  city: text("city"),
  state: text("state"),
  tags: text("tags"),
});
