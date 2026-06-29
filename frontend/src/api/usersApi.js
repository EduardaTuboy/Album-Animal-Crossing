// frontend/src/api/usersApi.js
import { put, get } from "./httpClient.js";
import { endpoints } from "../constants/apiConfig.js";

export const updateAvatar = (data) => put(endpoints.updateAvatar, data);
export const getUserProfile = (email) => get(endpoints.getProfile(email));

export default {
  updateAvatar,
  getUserProfile,
};
