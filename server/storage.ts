import { db } from "./db";
import { games, teamMembers, studioStats } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Games
  getGames(): Promise<typeof games.$inferSelect[]>;
  getGame(id: number): Promise<typeof games.$inferSelect | undefined>;
  createGame(game: typeof games.$inferInsert): Promise<typeof games.$inferSelect>;
  
  // Team
  getTeamMembers(): Promise<typeof teamMembers.$inferSelect[]>;
  createTeamMember(member: typeof teamMembers.$inferInsert): Promise<typeof teamMembers.$inferSelect>;

  // Stats
  getStats(): Promise<typeof studioStats.$inferSelect[]>;
  createStat(stat: typeof studioStats.$inferInsert): Promise<typeof studioStats.$inferSelect>;
}

export class DatabaseStorage implements IStorage {
  async getGames(): Promise<typeof games.$inferSelect[]> {
    return await db.select().from(games).orderBy(desc(games.isNew), desc(games.id));
  }

  async getGame(id: number): Promise<typeof games.$inferSelect | undefined> {
    const [game] = await db.select().from(games).where(eq(games.id, id));
    return game;
  }

  async createGame(game: typeof games.$inferInsert): Promise<typeof games.$inferSelect> {
    const [newGame] = await db.insert(games).values(game).returning();
    return newGame;
  }

  async getTeamMembers(): Promise<typeof teamMembers.$inferSelect[]> {
    return await db.select().from(teamMembers);
  }

  async createTeamMember(member: typeof teamMembers.$inferInsert): Promise<typeof teamMembers.$inferSelect> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }

  async getStats(): Promise<typeof studioStats.$inferSelect[]> {
    return await db.select().from(studioStats);
  }

  async createStat(stat: typeof studioStats.$inferInsert): Promise<typeof studioStats.$inferSelect> {
    const [newStat] = await db.insert(studioStats).values(stat).returning();
    return newStat;
  }
}

export const storage = new DatabaseStorage();
