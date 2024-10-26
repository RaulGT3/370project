FROM node:20

WORKDIR /server

COPY  package*.json ./

RUN npm install

COPY . .

ENV PORT=5004

EXPOSE 5004

CMD ["npm","start"]