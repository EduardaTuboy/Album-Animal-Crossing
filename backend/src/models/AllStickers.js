const db = require("../config/db");

const getAllStickers = async () => {
  const [rows] = await db.query(`SELECT *
    FROM Stickers
    ORDER BY number ASC;`);
  return rows;
};

module.exports = { getAllStickers };
