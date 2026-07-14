// frontend/src/api/usersApi.js
import { put, get, post } from "./httpClient.js";
import { endpoints } from "../constants/apiConfig.js";

export const updateAvatar = (data) => put(endpoints.updateAvatar, data);
export const getUserProfile = (email) => get(endpoints.getProfile(email));
export const claimUserCard = (email) => post("/user/claim-card", { email });

export default {
  updateAvatar,
  getUserProfile,
  claimUserCard,
};
