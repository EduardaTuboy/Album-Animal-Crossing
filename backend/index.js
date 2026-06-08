import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 5000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});
db.connect();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/stats", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM sua_tabela_de_stats;");

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao buscar dados do banco.");
  }
});

app.post("/api/add", async (req, res) => {
  const item = req.body.item;
  try {
    await db.query("INSERT INTO ... VALUES ($1)", [item]);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
