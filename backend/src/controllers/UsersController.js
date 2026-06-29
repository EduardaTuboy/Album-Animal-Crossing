import * as Users from "../models/Users.js";

export const updateAvatar = async (req, res) => {
  const { email, skinIndex, eyesIndex, hairIndex, hairColor, eyesColor } =
    req.body;

  try {
    const userExists = await Users.getUserByEmail(email);
    if (!userExists) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const updatedAvatar = await Users.updateUserAvatar(
      email,
      skinIndex,
      eyesIndex,
      hairIndex,
      hairColor,
      eyesColor,
    );

    return res.status(200).json(updatedAvatar);
  } catch (error) {
    console.error("Erro ao atualizar o avatar:", error);
    return res
      .status(500)
      .json({ error: "Erro ao atualizar o avatar no banco de dados." });
  }
};

export const getProfile = async (req, res) => {
  const userEmail = req.params.email;

  try {
    const profile = await Users.getUserByEmail(userEmail);
    if (!profile) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    // removes the password field from the profile object before sending the response
    if (profile.password) {
      delete profile.password;
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    return res
      .status(500)
      .json({ error: "Erro ao carregar os dados do perfil." });
  }
};

export default {
  updateAvatar,
  getProfile,
};
