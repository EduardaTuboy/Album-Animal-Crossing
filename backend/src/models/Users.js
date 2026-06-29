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

export default {
  getUserByEmail,
  updateUserAvatar,
};
