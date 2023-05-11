# [BASE] LAYER
FROM node:19-alpine AS base

WORKDIR /app

RUN yarn cache clean

COPY package*.json yarn.lock* ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN yarn install --immutable

# [BUILD] LAYER
FROM base AS build

WORKDIR /app

RUN yarn cache clean

# COPY --from=base /app/node_modules ./node_modules
COPY package*.json yarn.lock* ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN yarn install --immutable

COPY . .

RUN yarn build

# [PRODUCTION] LAYER
FROM node:19-alpine AS production

WORKDIR /app

RUN yarn cache clean

COPY package*.json yarn.lock* ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./

# RUN yarn workspaces focus --all --production
RUN yarn install --immutable

COPY --from=build /app/dist ./dist
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next

EXPOSE 3000

CMD ["node", "dist/src/server.js"]
