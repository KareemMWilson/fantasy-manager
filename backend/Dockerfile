# ----------------------------
# 1) Build stage
# ----------------------------
    FROM node:20 AS build

    WORKDIR /app
    
    # Install pnpm globally
    RUN npm install -g pnpm
    
    # Copy package files first (for caching)
    COPY package.json pnpm-lock.yaml ./
    
    # Install all dependencies
    RUN pnpm install
    
    # Copy source code
    COPY . .
    
    # Generate Prisma Client at build time (optional but recommended)
    RUN pnpm prisma generate
    
    # Build your app (TypeScript -> dist)
    RUN pnpm run build
    
    # Remove dev dependencies, keeping only production deps
    RUN pnpm prune --prod
    
    # ----------------------------
    # 2) Production stage
    # ----------------------------
    FROM node:20 AS production
    
    WORKDIR /app
    
    # Install pnpm globally
    RUN npm install -g pnpm
    
    # Copy production node_modules from build stage
    COPY --from=build /app/node_modules ./node_modules
    
    # Copy the compiled output
    COPY --from=build /app/dist ./dist
    
    # Copy necessary files
    COPY --from=build /app/package.json .
    COPY --from=build /app/pnpm-lock.yaml .
    COPY --from=build /app/prisma ./prisma
    
    # Copy and make the entrypoint script executable
    COPY docker-entrypoint.sh .
    RUN chmod +x docker-entrypoint.sh
    
    # Expose the port your app listens on
    EXPOSE 5000
    
    # Use the entrypoint script 
    ENTRYPOINT ["./docker-entrypoint.sh"]
    