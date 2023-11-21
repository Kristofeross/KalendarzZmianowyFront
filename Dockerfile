# Użyj obrazu bazowego Node.js
FROM node:18-alpine

# Ustal katalog roboczy
WORKDIR /reactapp

COPY public/ /reactapp/public
COPY src/ /reactapp/src
COPY package.json /reactapp/

RUN npm install

CMD ["npm", "start"]