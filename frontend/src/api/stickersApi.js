import { get, post, put, del } from './httpClient.js';
import { endpoints } from '../constants/apiConfig.js';

export const getCollection = () => get(endpoints.collection);
export const getAlbum = (email) => get(endpoints.album(email));
export const getStats = (email) => get(endpoints.stats(email));
export const addSticker = (data) => post(endpoints.add, data);
export const updateSticker = (number, data) => put(endpoints.update(number), data);
export const deleteSticker = (number) => del(endpoints.delete(number));

export default {
  getCollection,
  getAlbum,
  getStats,
  addSticker,
  updateSticker,
  deleteSticker,
};
