# ----------------------------
# 1) Build stage
# ----------------------------
FROM node:20 AS build
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate

RUN pnpm run build

RUN pnpm prune --prod

# ----------------------------
# 2) Production stage
# ----------------------------
FROM node:20 AS production

WORKDIR /app

RUN npm install -g pnpm

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist

COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .

EXPOSE 5000

CMD ["pnpm", "start"]
    