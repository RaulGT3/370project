FROM node:20

WORKDIR /client

COPY  package*.json ./

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["npm","start"]