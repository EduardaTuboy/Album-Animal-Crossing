import * as Stickers from "../models/Stickers.js";

export const listAllStickers = async (req, res) => {
  try {
    const stickers = await Stickers.getAllStickers();
    return res.status(200).json(stickers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar stickers" });
  }
};

export const getAlbum = async (req, res) => {
  const userEmail = req.params.email;
  try {
    const rows = await Stickers.getAlbumByEmail(userEmail);
    res.json(rows);
  } catch (err) {
    console.error("Erro ao carregar o álbum:", err);
    res.status(500).json({ error: "Erro ao carregar o álbum de figurinhas." });
  }
};

export const getStats = async (req, res) => {
  const userEmail = req.params.email;
  try {
    const stats = await Stickers.getUserStats(userEmail);
    res.json(stats);
  } catch (err) {
    console.error("Erro ao buscar estatísticas:", err);
    res.status(500).json({ error: "Erro ao processar as estatísticas." });
  }
};

export const addSticker = async (req, res) => {
  try {
    const sticker = await Stickers.insertSticker(req.body);
    res.json(sticker);
  } catch (err) {
    console.error("Erro ao adicionar sticker:", err);
    res
      .status(500)
      .json({ error: "Erro ao adicionar figurinha no banco de dados." });
  }
};

export const updateSticker = async (req, res) => {
  const stickerNumber = req.params.number;
  try {
    const updated = await Stickers.updateStickerByNumber(
      stickerNumber,
      req.body,
    );
    res.json(updated);
  } catch (err) {
    console.error("Erro ao atualizar sticker:", err);
    res
      .status(500)
      .json({ error: "Erro ao atualizar figurinha no banco de dados." });
  }
};

export const deleteSticker = async (req, res) => {
  const stickerNumber = req.params.number;
  try {
    const deleted = await Stickers.deleteStickerByNumber(stickerNumber);
    if (!deleted)
      return res.status(404).json({ error: "Villager não encontrado." });
    res.json({ message: "Villager eliminado com sucesso!", deleted });
  } catch (err) {
    console.error("Erro ao eliminar sticker:", err);
    res
      .status(500)
      .json({ error: "Erro ao eliminar o villager da base de dados." });
  }
};

export const addToCollection = async (req, res) => {
  const { email, number, amount } = req.body;
  try {
    const item = await Stickers.addStickerToCollect(email, number, amount);
    res.json(item);
  } catch (err) {
    console.error("Erro ao adicionar à coleção:", err);
    res.status(500).json({ error: "Erro ao adicionar à coleção" });
  }
};

export const updateInCollection = async (req, res) => {
  const { email, number, amount } = req.body;
  try {
    const item = await Stickers.updateStickerInCollect(email, number, amount);
    res.json(item);
  } catch (err) {
    console.error("Erro ao atualizar coleção:", err);
    res.status(500).json({ error: "Erro ao atualizar coleção" });
  }
};

export const removeFromCollection = async (req, res) => {
  const { email, number } = req.params; // Lemos os dados pela URL
  try {
    await Stickers.removeStickerFromCollect(email, number);
    res.json({ message: "Removido com sucesso" });
  } catch (err) {
    console.error("Erro ao remover da coleção:", err);
    res.status(500).json({ error: "Erro ao remover da coleção" });
  }
};

export default {
  listAllStickers,
  getAlbum,
  getStats,
  addSticker,
  updateSticker,
  deleteSticker,
  addToCollection,
  updateInCollection,
  removeFromCollection,
};
