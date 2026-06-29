import express from "express";
import * as UsersController from "../controllers/UsersController.js";

const router = express.Router();

router.put("/user/avatar", UsersController.updateAvatar);
router.get("/user/profile/:email", UsersController.getProfile);

export default router;
