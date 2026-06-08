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

app.get("/stats/:email", async (req, res) => {
  const userEmail = req.params.email;

  const query = `
    WITH user_stats AS (
      SELECT 
        COUNT(number)::int AS unlocked,
        COUNT(CASE WHEN amount >= 2 THEN 1 END)::int AS repeating
      FROM Collect
      WHERE email = $1
    ),
    catalog_stats AS (
      SELECT COUNT(number)::int AS total_stickers
      FROM Stickers
    )
    SELECT 
      user_stats.unlocked,
      user_stats.repeating,
      (catalog_stats.total_stickers - user_stats.unlocked) AS missing,
      catalog_stats.total_stickers AS total
    FROM user_stats, catalog_stats;
  `;

  try {
    const result = await db.query(query, [userEmail]);

    // Se o usuário não tiver nada, a query ainda retorna 0s,
    // mas garantimos que a resposta seja enviada corretamente.
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao buscar estatísticas:", err);
    res.status(500).json({ error: "Erro ao processar as estatísticas." });
  }
});

app.post("/add", async (req, res) => {
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
