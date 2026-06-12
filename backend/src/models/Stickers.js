import db from "../config/db.js";

export const getAllStickers = async () => {
  const result = await db.query(`SELECT *
    FROM Stickers
    ORDER BY number ASC;`);
  return result.rows;
};

export const getAlbumByEmail = async (email) => {
  const result = await db.query(
    `SELECT 
      s.number,
      s.name,
      s.species,
      s.personality,
      s.gender,
      s.rarity,
      s.total,
      s.url AS image_url,
      COALESCE(c.amount, 0)::int AS amount,
      COALESCE(c.autograph, false) AS autograph,
      s.catchphrase,
      s.birthday,
      s.hobbie
    FROM Stickers s
    LEFT JOIN Collect c ON s.number = c.number AND c.email = $1
    ORDER BY s.number ASC;`,
    [email],
  );
  return result.rows;
};

export const getUserStats = async (email) => {
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

  const result = await db.query(query, [email]);
  return result.rows[0];
};

export const insertSticker = async (sticker) => {
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
  } = sticker;

  const result = await db.query(
    `INSERT INTO Stickers (number, name, gender, species, personality, rarity, total, url, catchphrase, birthday, hobbie)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;`,
    [
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
    ],
  );
  return result.rows[0];
};

export const updateStickerByNumber = async (numberParam, sticker) => {
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
  } = sticker;

  const result = await db.query(
    `UPDATE Stickers SET name=$1, gender=$2, species=$3, personality=$4, rarity=$5, total=$6, url=$7, catchphrase=$8, birthday=$9, hobbie=$10 WHERE number=$11 RETURNING *;`,
    [
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
      numberParam,
    ],
  );
  return result.rows[0];
};

export const deleteStickerByNumber = async (numberParam) => {
  await db.query("DELETE FROM Collect WHERE number = $1", [numberParam]);
  const result = await db.query(
    "DELETE FROM Stickers WHERE number = $1 RETURNING *",
    [numberParam],
  );
  return result.rows[0];
};

export const addStickerToCollect = async (
  email,
  number,
  amount,
  autograph = false,
) => {
  const result = await db.query(
    `INSERT INTO Collect (email, number, amount, autograph) VALUES ($1, $2, $3, $4) RETURNING *;`,
    [email, number, amount, autograph],
  );
  return result.rows[0];
};

export const updateStickerInCollect = async (
  email,
  number,
  amount,
  autograph = false,
) => {
  const result = await db.query(
    `UPDATE Collect SET amount=$3, autograph=$4 WHERE email=$1 AND number=$2 RETURNING *;`,
    [email, number, amount, autograph],
  );
  return result.rows[0];
};

export const getCollectItem = async (email, number) => {
  const result = await db.query(
    `SELECT * FROM Collect WHERE email=$1 AND number=$2;`,
    [email, number],
  );
  return result.rows[0];
};

export const removeStickerFromCollect = async (email, number) => {
  const result = await db.query(
    `DELETE FROM Collect WHERE email=$1 AND number=$2 RETURNING *;`,
    [email, number],
  );
  return result.rowCount > 0;
};

export default {
  getAllStickers,
  getAlbumByEmail,
  getUserStats,
  insertSticker,
  updateStickerByNumber,
  deleteStickerByNumber,
  addStickerToCollect,
  updateStickerInCollect,
  removeStickerFromCollect,
};
