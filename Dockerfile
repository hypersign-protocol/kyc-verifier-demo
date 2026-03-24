FROM node:20-bookworm-slim AS deps

WORKDIR /app

# Install only production dependencies using the lockfile for reproducibility.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:20-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Run as the built-in non-root user in the Node image.
USER node

COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node package.json ./package.json
COPY --chown=node:node index.js ./index.js
COPY --chown=node:node public ./public

EXPOSE 6006

CMD ["npm", "start"]
