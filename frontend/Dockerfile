FROM node:20-alpine

RUN apk add --no-cache bash

SHELL ["/bin/bash", "-c"]

ENV SHELL=/bin/bash

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

RUN pnpm setup

RUN pnpm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
