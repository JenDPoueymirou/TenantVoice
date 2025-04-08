import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema (kept from original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Building schema
export const buildings = pgTable("buildings", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  unit: text("unit"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  landlord: text("landlord").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBuildingSchema = createInsertSchema(buildings).omit({
  id: true,
  createdAt: true,
});

export type InsertBuilding = z.infer<typeof insertBuildingSchema>;
export type Building = typeof buildings.$inferSelect;

// Issue categories enum
export const issueCategories = [
  "repairs",
  "harassment",
  "rental_agreements",
  "financial",
  "digital",
  "displacement"
] as const;

// Sub-issues by category
export const subIssuesByCategory = {
  repairs: [
    "heat_hot_water",
    "plumbing_leaks",
    "electrical",
    "pests",
    "structural",
    "appliances",
    "mold",
    "ventilation",
    "common_areas",
    "other_repairs"
  ],
  harassment: [
    "verbal_intimidation",
    "illegal_entry",
    "service_disruptions",
    "threats",
    "privacy_violations",
    "other_harassment"
  ],
  rental_agreements: [
    "excessive_rent_increases",
    "lease_violations",
    "security_deposit",
    "lease_renewal",
    "illegal_fees",
    "other_agreement"
  ],
  financial: [
    "unexplained_charges",
    "illegal_late_fees",
    "rent_overcharges",
    "payment_processing",
    "billing_errors",
    "other_financial"
  ],
  digital: [
    "app_portal_problems",
    "internet_wifi",
    "digital_communication",
    "online_harassment",
    "other_digital"
  ],
  displacement: [
    "illegal_eviction",
    "buyout_pressure",
    "construction_harassment",
    "essential_service_denial",
    "other_displacement"
  ]
} as const;

// Issue schema
export const issues = pgTable("issues", {
  id: serial("id").primaryKey(),
  buildingId: integer("building_id").notNull(),
  category: text("category").notNull(),
  subIssues: json("sub_issues").$type<string[]>().notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  status: text("status").notNull().default("open"),
  resolution: text("resolution"),
  contactInfo: text("contact_info"), // Optional contact info
  vector: json("vector").$type<number[]>(), // For vector search
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertIssueSchema = createInsertSchema(issues).omit({
  id: true,
  vector: true,
  createdAt: true,
}).extend({
  category: z.enum(issueCategories),
  subIssues: z.array(z.string()),
  date: z.coerce.date(),
});

export type InsertIssue = z.infer<typeof insertIssueSchema>;
export type Issue = typeof issues.$inferSelect;

// Export the categories as proper types
export type IssueCategory = typeof issueCategories[number];
export type SubIssue = {
  [K in IssueCategory]: typeof subIssuesByCategory[K][number];
}[IssueCategory];
