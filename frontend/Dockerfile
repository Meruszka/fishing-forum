FROM node:alpine3.18

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --force

COPY . .

EXPOSE 5137

CMD ["npm", "run", "dev"]