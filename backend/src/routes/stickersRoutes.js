import express from "express";
import * as StickersController from "../controllers/StickersController.js";

const router = express.Router();

router.get("/collection", StickersController.listAllStickers);
router.get("/album/:email", StickersController.getAlbum);
router.get("/stats/:email", StickersController.getStats);
router.post("/add", StickersController.addSticker);
router.put("/update/:number", StickersController.updateSticker);
router.delete("/delete/:number", StickersController.deleteSticker);
router.post("/collect/add", StickersController.addToCollection);
router.put("/collect/update", StickersController.updateInCollection);
router.delete(
  "/collect/delete/:email/:number",
  StickersController.removeFromCollection,
);

export default router;
