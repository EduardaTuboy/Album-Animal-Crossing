const AllStickersModel = require("../models/AllStickers");

const listAllStickers = async (req, res) => {
  try {
    const stickers = await AllStickersModel.getAllStickers();
    return res.status(200).json(stickers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar stickers" });
  }
};

module.exports = { listAllStickers };
