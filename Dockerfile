FROM node:latest
WORKDIR /app
COPY package*.json ./
EXPOSE 3000
EXPOSE 5432
RUN yarn
COPY . .
RUN npm run migration:run

CMD ["npm", "start"]
