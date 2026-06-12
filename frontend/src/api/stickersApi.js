import { get, post, put, del } from "./httpClient.js";
import { endpoints } from "../constants/apiConfig.js";

export const getCollection = () => get(endpoints.collection);
export const getAlbum = (email) => get(endpoints.album(email));
export const getStats = (email) => get(endpoints.stats(email));
export const addSticker = (data) => post(endpoints.add, data);
export const updateSticker = (number, data) =>
  put(endpoints.update(number), data);
export const deleteSticker = (number) => del(endpoints.delete(number));
export const addStickerToCollect = (data) => post("/collect/add", data);
export const updateStickerInCollect = (data) => put("/collect/update", data);
export const deleteStickerFromCollect = (email, number) =>
  del(`/collect/delete/${email}/${number}`);

export default {
  getCollection,
  getAlbum,
  getStats,
  addSticker,
  updateSticker,
  deleteSticker,
  addStickerToCollect,
  updateStickerInCollect,
  deleteStickerFromCollect,
};
