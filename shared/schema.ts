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
  vector: json("vector").$type<number[]>(), // For vector search of buildings
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBuildingSchema = createInsertSchema(buildings).omit({
  id: true,
  vector: true,
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
export const subIssuesByCategory: Record<typeof issueCategories[number], readonly string[]> = {
  repairs: [
    "heat_hot_water",
    "no_hot_water",
    "leaks_water_damage_apartment",
    "leaks_water_damage_public_areas",
    "doorbell_not_working_apartment", 
    "doorbell_not_working_outside",
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
    "lack_of_hot_water",
    "unreturned_leases",
    "physical_harassment",
    "apartment_breakins",
    "lease_theft",
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
    "cell_disruption",
    "social_media_hacks",
    "app_portal_problems",
    "internet_wifi",
    "online_harassment",
    "other_digital"
  ],
  displacement: [
    "illegal_eviction",
    "buyout_pressure",
    "construction_harassment",
    "essential_service_denial",
    "identity_theft",
    "lack_of_funds",
    "harassment",
    "lack_of_work",
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
