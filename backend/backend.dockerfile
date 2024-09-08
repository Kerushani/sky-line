FROM node:20

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD ["node", "dist/index.js"]