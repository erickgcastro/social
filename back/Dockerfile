FROM node:18.12-alpine

COPY . /app

WORKDIR /app

RUN npm install --omit=dev

EXPOSE 5000

CMD ["npm", "start"]