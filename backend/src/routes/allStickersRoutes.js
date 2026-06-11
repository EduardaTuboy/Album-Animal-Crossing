const express = require("express");
const router = express.Router();
const AllStickersController = require("../controllers/AllStickersController");

router.get("/collection", AllStickersController.listAllStickers);

module.exports = router;
