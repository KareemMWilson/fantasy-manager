//TODO: create zodSchema for config, and not use process.env , only use config object

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || "kareem-secret",
  },
  PORT: process.env.PORT || 5000,
  REDIS: {
    HOST: process.env.REDIS_HOST || 'localhost',
    PORT: process.env.REDIS_PORT || 6379,
    PASSWORD: process.env.REDIS_PASSWORD || 'password',
  }
};