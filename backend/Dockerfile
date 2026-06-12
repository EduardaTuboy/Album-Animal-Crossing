FROM node:20-alpine

# Cria a pasta da aplicação dentro do container
WORKDIR /app

# Copia apenas os ficheiros de dependências primeiro 
COPY package*.json ./

RUN npm install

# Copia o resto do código do backend
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]