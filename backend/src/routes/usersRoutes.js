import express from "express";
import * as UsersController from "../controllers/UsersController.js";

const router = express.Router();

router.put("/user/avatar", UsersController.updateAvatar);
router.get("/user/profile/:email", UsersController.getProfile);
router.put("/user/acumulated-cards", UsersController.updateAcumulatedCards);
router.post("/user/claim-card", UsersController.claimCard);

export default router;
