import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const db = require("./config/db.js");

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
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao buscar estatísticas:", err);
    res.status(500).json({ error: "Erro ao processar as estatísticas." });
  }
});

app.get("/album/:email", async (req, res) => {
  const userEmail = req.params.email;

  // Left join to show inclusive the missing stickers
  const query = `
    SELECT 
      s.number,
      s.name,
      s.species,
      s.personality,
      s.gender,
      s.url AS image_url,
      COALESCE(c.amount, 0)::int AS amount,
      s.catchphrase,
      s.birthday,
      s.hobbie
    FROM Stickers s
    LEFT JOIN Collect c ON s.number = c.number AND c.email = $1
    ORDER BY s.number ASC;
  `;

  try {
    const result = await db.query(query, [userEmail]);
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao carregar o álbum:", err);
    res.status(500).json({ error: "Erro ao carregar o álbum de figurinhas." });
  }
});

// Essa requisição foi usada de exemplo para ser separada em Model, Controller e View
app.get("/collection", async (req, res) => {
  const query = `
    SELECT *
    FROM Stickers
    ORDER BY number ASC;
  `;

  try {
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar as figurinhas:", err);
    res.status(500).json({ error: "Erro ao processar as figurinhas." });
  }
});

app.post("/add", async (req, res) => {
  const {
    number,
    name,
    gender,
    species,
    personality,
    rarity,
    total,
    url,
    catchphrase,
    birthday,
    hobbie,
  } = req.body;

  const query = `
    INSERT INTO Stickers (number, name, gender, species, personality, rarity, total, url, catchphrase, birthday, hobbie) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;

  try {
    const result = await db.query(query, [
      number,
      name,
      gender,
      species,
      personality,
      rarity,
      total,
      url,
      catchphrase,
      birthday || null,
      hobbie,
    ]);
    // Retorna o sticker recém-criado para o frontend
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao adicionar sticker:", err);
    res
      .status(500)
      .json({ error: "Erro ao adicionar figurinha no banco de dados." });
  }
});

app.put("/update/:number", async (req, res) => {
  const stickerNumber = req.params.number;
  const {
    name,
    gender,
    species,
    personality,
    rarity,
    total,
    url,
    catchphrase,
    birthday,
    hobbie,
  } = req.body;

  const query = `
    UPDATE Stickers 
    SET name = $1, gender = $2, species = $3, personality = $4, rarity = $5, total = $6, url = $7, catchphrase = $8, birthday = $9, hobbie = $10
    WHERE number = $11
    RETURNING *;
  `;

  try {
    const result = await db.query(query, [
      name,
      gender,
      species,
      personality,
      rarity,
      total,
      url,
      catchphrase,
      birthday || null,
      hobbie,
      stickerNumber,
    ]);
    // Retorna o sticker atualizado para o frontend
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar sticker:", err);
    res
      .status(500)
      .json({ error: "Erro ao atualizar figurinha no banco de dados." });
  }
});

app.delete("/delete/:number", async (req, res) => {
  const stickerNumber = req.params.number;

  try {
    // 1. Eliminação em cascata: Apagar da tabela Collect primeiro
    await db.query("DELETE FROM Collect WHERE number = $1", [stickerNumber]);

    // 2. Apagar da tabela Stickers
    const result = await db.query(
      "DELETE FROM Stickers WHERE number = $1 RETURNING *",
      [stickerNumber],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Villager não encontrado." });
    }

    res.json({
      message: "Villager eliminado com sucesso!",
      deleted: result.rows[0],
    });
  } catch (err) {
    console.error("Erro ao eliminar sticker:", err);
    res
      .status(500)
      .json({ error: "Erro ao eliminar o villager da base de dados." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
