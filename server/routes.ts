import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.games.list.path, async (req, res) => {
    const games = await storage.getGames();
    res.json(games);
  });

  app.get(api.games.get.path, async (req, res) => {
    const game = await storage.getGame(Number(req.params.id));
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  });

  app.get(api.team.list.path, async (req, res) => {
    const team = await storage.getTeamMembers();
    res.json(team);
  });

  app.get(api.stats.list.path, async (req, res) => {
    const stats = await storage.getStats();
    res.json(stats);
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const games = await storage.getGames();
  if (games.length === 0) {
    console.log("Seeding database...");
    
    // Seed Games
    await storage.createGame({
      title: "Cyber City Tycoon",
      description: "Build your own futuristic city in this immersive tycoon experience. Manage resources, upgrade buildings, and dominate the leaderboard!",
      imageUrl: "https://images.unsplash.com/photo-1533972724312-6e8a60310352?auto=format&fit=crop&q=80&w=800",
      gameUrl: "https://roblox.com",
      isNew: true,
      likes: "95%",
      playing: "12.5K"
    });
    
    await storage.createGame({
      title: "Dungeon Quest: Reborn",
      description: "Explore infinite dungeons, defeat epic bosses, and collect legendary loot in this action-packed RPG.",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
      gameUrl: "https://roblox.com",
      isNew: true,
      likes: "92%",
      playing: "8.2K"
    });

    await storage.createGame({
      title: "Speed Run X",
      description: "The ultimate parkour challenge. Can you beat the world record? 50+ maps and competitive matchmaking.",
      imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800",
      gameUrl: "https://roblox.com",
      isNew: true,
      likes: "88%",
      playing: "5.1K"
    });

    await storage.createGame({
      title: "Pet Simulator: Space",
      description: "Collect adorable pets and explore the galaxy! New space-themed pets and worlds to discover.",
      imageUrl: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&q=80&w=800",
      gameUrl: "https://roblox.com",
      isNew: false,
      likes: "98%",
      playing: "25K"
    });

    // Seed Team
    await storage.createTeamMember({
      name: "NyEm",
      role: "Founder & Lead Dev",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=NyEm&backgroundColor=b6e3f4",
      profileUrl: "#"
    });

    await storage.createTeamMember({
      name: "CodeMaster",
      role: "Scripter",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMaster&backgroundColor=c0aede",
      profileUrl: "#"
    });

    await storage.createTeamMember({
      name: "PixelArt",
      role: "3D Artist",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=PixelArt&backgroundColor=ffdfbf",
      profileUrl: "#"
    });
    
    await storage.createTeamMember({
      name: "BuilderBob",
      role: "Map Builder",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=BuilderBob&backgroundColor=d1d4f9",
      profileUrl: "#"
    });

    // Seed Stats
    await storage.createStat({
      label: "Group Members",
      value: "150K+",
      icon: "Users"
    });
    
    await storage.createStat({
      label: "Total Visits",
      value: "25M+",
      icon: "Trophy"
    });
    
    await storage.createStat({
      label: "Active Players",
      value: "5K+",
      icon: "Gamepad2"
    });

    console.log("Database seeded successfully!");
  }
}
