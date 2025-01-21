import { z } from "zod";

const configSchema = z.object({
  jwt: z.object({
    secret: z.string().min(1, "JWT_SECRET is required").default('secret'),
  }),
  PORT: z.coerce.number().default(5000),
  REDIS: z.object({
    HOST: z.string().default("localhost"),
    PORT: z.coerce.number().default(6379),
    PASSWORD: z.string().default("password"),
  }),
  frontend: z.object({
    URL: z.string()
  })
});

const parsedConfig = configSchema.parse({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  PORT: process.env.PORT,
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
    PASSWORD: process.env.REDIS_PASSWORD,
  },
  frontend: {
    URL: process.env.FRONTEND_URL
  }
});

export const config = parsedConfig;
