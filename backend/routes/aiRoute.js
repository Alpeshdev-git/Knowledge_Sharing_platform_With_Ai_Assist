const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

router.post("/improve", aiController.improveContent);
router.post("/summary", aiController.generateSummary);

module.exports = router;