# Álbum Animal Crossing — Album de Figurinhas (Full Stack)

Projeto de um álbum de figurinhas digital com backend em Node.js/Express e frontend em React + TanStack :)

**Tema:** Animal Crossing

**Estado atual:** implementação do backend e frontend básica com seed de dados e integração via Docker Compose.

**Tecnologias principais**

- **Backend:** Node.js, Express, pg (Postgres)
- **Banco:** PostgreSQL (via Docker)
- **Frontend:** React, Vite, @tanstack/react-query, @tanstack/react-router, @tanstack/react-table
- **Containerização:** Docker / Docker Compose

**Estrutura do repositório**

- **backend/**: código do servidor Express, scripts de seed em `backend/db`
- **frontend/**: aplicação React + TanStack
- **docker-compose.yml**: orquestra db, backend e frontend

**Funcionalidades implementadas**

- Catálogo de figurinhas com CRUD (número, nome, categoria, raridade, imagem)
- Álbum do colecionador: registrar figurinhas coladas, faltantes e repetidas
- Endpoints para estatísticas de progresso do álbum
- Seeds iniciais para popular o catálogo e o álbum padrão (ver `backend/db`)

**Endpoints principais**

- `GET /collection` — lista todas as figurinhas do catálogo
- `GET /album/:email` — retorna o álbum (coleção) do usuário identificado por `email`
- `GET /stats/:email` — retorna estatísticas de progresso do álbum do usuário
- `POST /add` — cria uma nova figurinha no catálogo (payload: objeto figurinha)
- `PUT /update/:number` — atualiza dados da figurinha identificada por `number`
- `DELETE /delete/:number` — remove figurinha do catálogo
- `POST /collect/add` — adiciona uma figurinha à coleção do usuário (payload: `{ email, number, amount, autograph? }`)
- `PUT /collect/update` — atualiza quantidade/autógrafo na coleção (payload: `{ email, number, amount, autograph? }`)
- `DELETE /collect/delete/:email/:number` — remove uma entrada do álbum do usuário

**Decisões técnicas e observações**

- Banco: PostgreSQL devido a familiaridade com o banco de dados
- Paginação: a listagem usa paginação client-side devido a familiaridade maior com frontend, mas se o sistema escalar muito com novas figurinhas, seria melhor server-side
- Política de remoção do catálogo: atualmente `DELETE /delete/:number` remove a figurinha primeiro na coleção do usuário e depois no catálogo, pra não dar incoerência de dados entre o catálogo e álbum. Posteriormente com aumento de entidades e tabelas, vale modificar para DELETE CASCADE

**Pré-requisitos**

- Docker e Docker Compose

**Configurar variáveis de ambiente**
Crie um arquivo `.env` na raiz (ou exporte variáveis) com as seguintes chaves usadas pelo `docker-compose` e pela aplicação:

```
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=album
DB_PORT=5432
DB_EXTERNAL_PORT=5432
```

**Rodando com Docker Compose (recomendado)**

```bash
# na raiz do repositório
sudo docker compose up --build
# ver logs
sudo docker compose logs -f
# parar e apagar dados
sudo docker compose down -v
```

**Rodando localmente sem Docker**

```bash
# backend
cd backend
cp .env.example .env
npm install
npm run dev

# frontend
cd ../frontend
npm install
npm run dev
```

**Dados iniciais (seed)**

- Há scripts SQL em `backend/db/` (`01_schema.sql`, `02_load_stickers.sql`, `03_load_users.sql`) que são executados na inicialização do container PostgreSQL via volume montado, contendo apenas 1 usuário e em torno de 400 villagers.

**Desafios implementados**

- Desafio Hat-trick: Toda a aplicação roda através de um Docker Compose. Esse desafio teve prioridade em relação aos outros pois assim é garantido a reprodutibilidade do ambiente e facilita a entrega do projeto.

**_Portas_**

Backend: 5000 (container) -> 5000 (host)
Frontend: 5173 (container) -> 5173 (host)
Banco: 5432 (container) -> ${DB_EXTERNAL_PORT} (host)

**Código de Status e Padrões**

- 200 OK
- 201 Item Criado
- 404 Não encontrado
- 409 Conflito
- 500 Erro do servidor
