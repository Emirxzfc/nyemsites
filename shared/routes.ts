import { z } from 'zod';
import { insertGameSchema, insertTeamMemberSchema, insertStatSchema, games, teamMembers, studioStats } from './schema';

export const api = {
  games: {
    list: {
      method: 'GET' as const,
      path: '/api/games' as const,
      responses: {
        200: z.array(z.custom<typeof games.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/games/:id' as const,
      responses: {
        200: z.custom<typeof games.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  team: {
    list: {
      method: 'GET' as const,
      path: '/api/team' as const,
      responses: {
        200: z.array(z.custom<typeof teamMembers.$inferSelect>()),
      },
    },
  },
  stats: {
    list: {
      method: 'GET' as const,
      path: '/api/stats' as const,
      responses: {
        200: z.array(z.custom<typeof studioStats.$inferSelect>()),
      },
    },
  }
};
