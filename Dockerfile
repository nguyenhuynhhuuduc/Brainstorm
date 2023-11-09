FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as builder
WORKDIR /app
COPY . .
RUN npm run build

FROM base as production
WORKDIR /app

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cmFwaWQtYXBoaWQtNDkuY2xlcmsuYWNjb3VudHMuZGV2JA
ENV CLERK_SECRET_KEY=sk_test_Rn77ZD4F2NP4UyyuikrU7RLRfMKYCXr2cqg1XrRf7o
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
ENV MAIL_SERVER_PASSWORD="ambzwujtqvbxgqkr"
ENV CLOUDINARY_API_KEY="871896899478877"
ENV CLOUDINARY_SERECT_KEY="ygfsWKyBBOCS6MIUywKx5kSlRDM"
ENV CLOUDINARY_NAME="dvivu9mvj"

ENV NODE_ENV=production
RUN npm ci

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Add prisma schema
COPY ./prisma/schema.prisma ./prisma/schema.prisma

# Generate Prisma client
RUN npx prisma generate

# Push changes to DB
RUN npx prisma db push

CMD npm start

FROM base as dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
CMD npm run dev
