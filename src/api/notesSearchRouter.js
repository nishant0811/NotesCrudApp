const express = require("express");
const router = express.Router();

const notesSearchController = require("./controllers/notesSearchController");
const { verifyToken } = require("../middlewares/validateAccessToken");

router.get("/" , verifyToken, notesSearchController.search )

module.exports = router;