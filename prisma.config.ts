import path from "path";
import type { PrismaConfig } from "prisma";

export default {
  schema: path.join(__dirname, "prisma/schema.prisma"),
  migrate: {
    adapter: async () => {
      const { PrismaNeon } = await import("@prisma/adapter-neon");
      const { neonConfig, Pool } = await import("@neondatabase/serverless");
      const ws = await import("ws");
      neonConfig.webSocketConstructor = ws.default;
      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      return new PrismaNeon(pool);
    },
  },
} satisfies PrismaConfig;