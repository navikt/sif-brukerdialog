FROM node:18-alpine

ENV NODE_ENV production

RUN addgroup --system --gid 1069 nodejs
RUN adduser --system --uid 1069 nextjs

WORKDIR /app
COPY --chown=nextjs:nodejs .env ./
COPY --chown=nextjs:nodejs .env.local ./
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static
COPY --chown=nextjs:nodejs public ./public
USER nextjs

EXPOSE 3000

ENV PORT 3000g

CMD ["node", "server.js"]