import { pgTable, text, serial, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Games table
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  gameUrl: text("game_url").notNull(),
  isNew: boolean("is_new").default(false),
  likes: text("likes").default("0"),
  playing: text("playing").default("0"),
});

// Team members table
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  profileUrl: text("profile_url"),
});

// Studio stats (for the home page)
export const studioStats = pgTable("studio_stats", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  icon: text("icon").notNull(), // lucide icon name
});

export const insertGameSchema = createInsertSchema(games).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export const insertStatSchema = createInsertSchema(studioStats).omit({ id: true });

export type Game = typeof games.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type StudioStat = typeof studioStats.$inferSelect;
