# Usa uma versão leve do Node.js
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# O Vite usa a porta 5173 por predefinição
EXPOSE 5173

# No Vite, precisamos de adicionar o --host para ele ser acessível fora do Docker
CMD ["npm", "run", "dev", "--", "--host"]