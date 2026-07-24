# Next.js 15 production image for citron-web (citronos.com)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build-time public env (baked into the client bundle)
ARG NEXT_PUBLIC_SITE_URL=https://citronos.com
ARG NEXT_PUBLIC_BILLING_URL=https://dashboard.citronos.com
ARG NEXT_PUBLIC_SETTINGS_URL=https://settings.citronos.com
ARG NEXT_PUBLIC_DOWNLOAD_URL=https://download.citronos.com
ARG NEXT_PUBLIC_IDENTITY_URL=https://identity.citronos.com
ARG NEXT_PUBLIC_CALENDLY_URL=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_BILLING_URL=$NEXT_PUBLIC_BILLING_URL
ENV NEXT_PUBLIC_SETTINGS_URL=$NEXT_PUBLIC_SETTINGS_URL
ENV NEXT_PUBLIC_DOWNLOAD_URL=$NEXT_PUBLIC_DOWNLOAD_URL
ENV NEXT_PUBLIC_IDENTITY_URL=$NEXT_PUBLIC_IDENTITY_URL
ENV NEXT_PUBLIC_CALENDLY_URL=$NEXT_PUBLIC_CALENDLY_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
