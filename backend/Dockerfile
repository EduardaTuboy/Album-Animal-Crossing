# Usa uma versão leve do Node.js
FROM node:20-alpine

# Cria a pasta da aplicação dentro do container
WORKDIR /app

# Copia apenas os ficheiros de dependências primeiro (ajuda na rapidez do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código do backend
COPY . .

# Expõe a porta que o seu servidor usa
EXPOSE 5000

# O comando para iniciar o backend (igual ao que usa no terminal)
CMD ["npm", "run", "dev"]