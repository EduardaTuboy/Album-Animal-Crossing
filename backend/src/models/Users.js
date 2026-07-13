import db from "../config/db.js";

export const getUserByEmail = async (email) => {
  const query = "SELECT * FROM Users WHERE email = $1;";
  const result = await db.query(query, [email]);
  return result.rows[0];
};

export const updateUserAvatar = async (
  email,
  skinIndex,
  eyesIndex,
  hairIndex,
  hairColor,
  eyesColor,
) => {
  // columns before the '=' are snake_case (from the database). The $1, $2 are the parameters.
  const query = `
    UPDATE Users 
    SET skin_index = $1, 
        eyes_index = $2, 
        hair_index = $3, 
        hair_color = $4, 
        eyes_color = $5 
    WHERE email = $6 
    RETURNING email, skin_index, eyes_index, hair_index, hair_color, eyes_color;
  `;

  // The order of this array MUST match the order of $1, $2, $3, $4, $5, $6 in the query above!
  const values = [skinIndex, eyesIndex, hairIndex, hairColor, eyesColor, email];

  const result = await db.query(query, values);
  return result.rows[0];
};

export const updateUserAcumulatedCards = async (email, acumulatedCards) => {
  //[cite: 3]
  const query = `
    UPDATE Users
    SET acumulated_cards = $1
    WHERE email = $2
    RETURNING email, acumulated_cards;
  `; //[cite: 3]

  const values = [acumulatedCards, email]; //[cite: 3]

  const result = await db.query(query, values); //[cite: 3]
  return result.rows[0]; //[cite: 3]
}; //[cite: 3]

/**
 * Atualiza as cartas acumuladas e o timestamp de sincronização do usuário de uma só vez.
 */
export const updateUserCardsAndSync = async (
  email,
  acumulatedCards,
  lastSync,
) => {
  const query = `
    UPDATE Users
    SET acumulated_cards = $1,
        last_sync = $2
    WHERE email = $3
    RETURNING email, acumulated_cards, last_sync;
  `;

  const values = [acumulatedCards, lastSync, email];

  const result = await db.query(query, values);
  return result.rows[0];
};

/**
 * Salva a figurinha resgatada no álbum do usuário (inventário).
 * Altere o nome da tabela 'User_Stickers' e colunas se seu banco for diferente.
 */
export const addStickerToUserAlbum = async (email, stickerNumber) => {
  const query = `
    INSERT INTO Collect (email, number, amount, timestamp, autograph)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const result = await db.query(query, [
    email,
    stickerNumber,
    1,
    new Date(),
    false,
  ]);
  return result.rows[0];
};

export default {
  getUserByEmail,
  updateUserAvatar,
  updateUserAcumulatedCards,
  updateUserCardsAndSync,
  addStickerToUserAlbum,
};
