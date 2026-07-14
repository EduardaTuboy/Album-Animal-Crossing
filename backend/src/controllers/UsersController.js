import * as Users from "../models/Users.js";
import * as Stickers from "../models/Stickers.js"; // <-- ADICIONE ESTA LINHA

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

/**
 * Função utilitária para calcular e sincronizar as cartas baseadas no tempo decorrido.
 * É executada dinamicamente de forma "Lazy" sem a necessidade de Cron Jobs.
 */
const syncUserCards = async (user) => {
  const now = new Date();
  const lastSync = new Date(user.last_sync);

  // Calcula a diferença em milissegundos e converte para horas
  const diffMs = now - lastSync;
  const diffHours = diffMs / (1000 * 60 * 60);

  // Divide a diferença por 4 horas para saber quantas cartas foram geradas
  const cardsGenerated = Math.floor(diffHours / 4);

  if (cardsGenerated > 0) {
    const currentCards = user.acumulated_cards;
    const availableRoom = 12 - currentCards;

    // Se o usuário já estava no limite de 12 cartas antes da sincronização
    if (availableRoom <= 0) {
      // Descarta o excesso de tempo mantendo apenas o progresso parcial do ciclo atual
      const remainderMs = diffMs % (4 * 60 * 60 * 1000);
      const newSyncTime = new Date(now.getTime() - remainderMs);

      const updatedUser = await Users.updateUserCardsAndSync(
        user.email,
        12,
        newSyncTime,
      );
      return { ...user, ...updatedUser };
    }

    // Se a geração ultrapassar o limite de 12 acumuladas
    if (cardsGenerated >= availableRoom) {
      const remainderMs = diffMs % (4 * 60 * 60 * 1000);
      const newSyncTime = new Date(now.getTime() - remainderMs);

      const updatedUser = await Users.updateUserCardsAndSync(
        user.email,
        12,
        newSyncTime,
      );
      return { ...user, ...updatedUser };
    } else {
      // Geração normal sem atingir o teto
      const hoursToAdd = cardsGenerated * 4;
      const newSyncTime = new Date(
        lastSync.getTime() + hoursToAdd * 60 * 60 * 1000,
      );
      const newAcumulated = currentCards + cardsGenerated;

      const updatedUser = await Users.updateUserCardsAndSync(
        user.email,
        newAcumulated,
        newSyncTime,
      );
      return { ...user, ...updatedUser };
    }
  }

  return user;
};

export const getProfile = async (req, res) => {
  //[cite: 2]
  const userEmail = req.params.email; //[cite: 2]

  try {
    //[cite: 2]
    const profile = await Users.getUserByEmail(userEmail); //[cite: 2]
    if (!profile) {
      //[cite: 2]
      return res.status(404).json({ error: "Usuário não encontrado." }); //[cite: 2]
    } //[cite: 2]

    // 1. Sincroniza dinamicamente as cartas baseadas no tempo decorrido antes de retornar o perfil
    const syncedProfile = await syncUserCards(profile);

    // Remove a senha do objeto de resposta por segurança
    if (syncedProfile.password) {
      //[cite: 2]
      delete syncedProfile.password; //[cite: 2]
    } //[cite: 2]

    return res.status(200).json(syncedProfile); //[cite: 2]
  } catch (error) {
    //[cite: 2]
    console.error("Erro ao buscar perfil do usuário:", error); //[cite: 2]
    return res //[cite: 2]
      .status(500) //[cite: 2]
      .json({ error: "Erro ao carregar os dados do perfil." }); //[cite: 2]
  } //[cite: 2]
}; //[cite: 2]

export const updateAcumulatedCards = async (req, res) => {
  //[cite: 2]
  const { email, acumulatedCards } = req.body; //[cite: 2]

  try {
    //[cite: 2]
    const userExists = await Users.getUserByEmail(email); //[cite: 2]
    if (!userExists) {
      //[cite: 2]
      return res.status(404).json({ error: "Usuário não encontrado." }); //[cite: 2]
    } //[cite: 2]

    const updatedUser = await Users.updateUserAcumulatedCards(
      //[cite: 2]
      email, //[cite: 2]
      acumulatedCards, //[cite: 2]
    ); //[cite: 2]

    return res.status(200).json(updatedUser); //[cite: 2]
  } catch (error) {
    //[cite: 2]
    console.error("Erro ao atualizar cartas acumuladas:", error); //[cite: 2]
    return res //[cite: 2]
      .status(500) //[cite: 2]
      .json({
        //[cite: 2]
        error: "Erro ao atualizar cartas acumuladas no banco de dados.", //[cite: 2]
      }); //[cite: 2]
  } //[cite: 2]
}; //[cite: 2]

/**
 * Rota de Resgate (Claim): Sincroniza o tempo, consome 1 carta e gera uma figurinha aleatória
 * respeitando as probabilidades e fazendo busca linear em caso de incompatibilidade de raridade.
 */
export const claimCard = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // 1. Garante que o saldo de cartas acumuladas está atualizado com o tempo decorrido
    const syncedUser = await syncUserCards(user);

    // 2. Verifica se de fato há cartas disponíveis para resgate
    if (syncedUser.acumulated_cards <= 0) {
      return res
        .status(400)
        .json({ error: "Nenhuma carta disponível para resgatar no momento." });
    }

    // 3. Busca todas as figurinhas para realizar a conferência de raridade[cite: 7]
    const allStickers = await Stickers.getAllStickers(); // <-- MUDOU AQUI
    if (!allStickers || allStickers.length === 0) {
      return res
        .status(500)
        .json({ error: "Nenhuma figurinha cadastrada no banco de dados." });
    }

    // 4. Sorteia a RARIDADE com base nas chances definidas
    const randomChance = Math.random();
    let targetRarity = "common"; // Padrão 80%

    if (randomChance <= 0.05) {
      targetRarity = "legendary"; // 5% de chance
    } else if (randomChance <= 0.2) {
      targetRarity = "rare"; // 15% de chance
    }

    // 5. Sorteia o ID/Índice inicial aleatório
    const startIndex = Math.floor(Math.random() * allStickers.length);

    // 6. Busca linear a partir do ID sorteado até encontrar a raridade correta (Loop circular)
    let foundStickerId = null;

    for (let i = 0; i < allStickers.length; i++) {
      const currentIndex = (startIndex + i) % allStickers.length;
      const currentSticker = allStickers[currentIndex];

      // Ignora case para evitar bugs com os dados retornados do SELECT *[cite: 7]
      if (currentSticker.rarity.toLowerCase() === targetRarity) {
        foundStickerId = currentSticker.number;
        break;
      }
    }

    // 7. Decrementa 1 carta acumulada
    const newCardCount = syncedUser.acumulated_cards - 1;
    await Users.updateUserCardsAndSync(
      email,
      newCardCount,
      syncedUser.last_sync,
    );

    // 8. Salva a nova figurinha no álbum do usuário usando as funções existentes
    const existingCollectItem = await Stickers.getCollectItem(
      // <-- MUDOU AQUI
      email,
      foundStickerId,
    );

    let claimedSticker;
    if (existingCollectItem) {
      claimedSticker = await Stickers.updateStickerInCollect(
        // <-- MUDOU AQUI
        email,
        foundStickerId,
        existingCollectItem.amount + 1,
        existingCollectItem.autograph,
      );
    } else {
      claimedSticker = await Stickers.addStickerToCollect(
        // <-- MUDOU AQUI
        email,
        foundStickerId,
        1,
        false,
      );
    }

    return res.status(200).json({
      message: "Figurinha resgatada com sucesso!",
      rarityDrawn: targetRarity,
      acumulatedCards: newCardCount,
      sticker: claimedSticker,
    });

    return res.status(200).json({
      message: "Figurinha resgatada com sucesso!",
      rarityDrawn: targetRarity,
      acumulatedCards: newCardCount,
      sticker: claimedSticker,
    });
  } catch (error) {
    console.error("Erro ao resgatar figurinha:", error);
    return res
      .status(500)
      .json({ error: "Erro ao processar o resgate da sua figurinha." });
  }
};

export default {
  //[cite: 2]
  updateAvatar, //[cite: 2]
  getProfile, //[cite: 2]
  updateAcumulatedCards, //[cite: 2]
  claimCard,
}; //[cite: 2]
