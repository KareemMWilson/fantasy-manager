export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || "kareem-secret",
  },
  PORT: process.env.PORT || 5000,
};



