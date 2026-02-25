const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, articleController.createArticle);
router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);
router.put("/:id", verifyToken, articleController.updateArticle);
router.delete("/:id", verifyToken, articleController.deleteArticle);
router.get("/my/user", verifyToken, articleController.getUserArticles);

module.exports = router;