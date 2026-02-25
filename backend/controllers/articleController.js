const db = require("../config/DB.js");

exports.createArticle = async (req, res) => {
  const { title, content, category, tags, summary } = req.body;
  const author_id = req.user.id;

  await db.execute(
    "INSERT INTO articles (title, content, category, tags, summary, author_id) VALUES (?, ?, ?, ?, ?, ?)",
    [title, content, category, tags, summary, author_id]
  );

  res.status(201).json({ message: "Article created" });
};

exports.getAllArticles = async (req, res) => {
  const { search = "", category = "" } = req.query;

  const [rows] = await db.execute(
    `SELECT a.*, u.username FROM articles a
     JOIN users u ON a.author_id = u.id
     WHERE (title LIKE ? OR content LIKE ? OR tags LIKE ?)
     AND (? = '' OR category = ?)`,
    [`%${search}%`, `%${search}%`, `%${search}%`, category, category]
  );

  res.json(rows);
};

exports.getArticleById = async (req, res) => {
  const [rows] = await db.execute(
    "SELECT * FROM articles WHERE id = ?",
    [req.params.id]
  );

  res.json(rows[0]);
};


exports.getUserArticles = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM articles WHERE author_id = ?",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update article (only by author)
exports.updateArticle = async (req, res) => {
  const articleId = req.params.id;
  const userId = req.user.id;
  const { title, content, category, tags, summary } = req.body;

  try {
    // Check ownership
    const [rows] = await db.execute(
      "SELECT * FROM articles WHERE id = ? AND author_id = ?",
      [articleId, userId]
    );

    if (rows.length === 0) {
      return res.status(403).json({ message: "You are not allowed to edit this article" });
    }

    // Update article
    await db.execute(
      "UPDATE articles SET title=?, content=?, category=?, tags=?, summary=?, updated_at=NOW() WHERE id=?",
      [title, content, category, tags, summary, articleId]
    );

    res.json({ message: "Article updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete article (only by author)
exports.deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  const userId = req.user.id;

  try {
    // Check ownership
    const [rows] = await db.execute(
      "SELECT * FROM articles WHERE id = ? AND author_id = ?",
      [articleId, userId]
    );

    if (rows.length === 0) {
      return res.status(403).json({ message: "You are not allowed to delete this article" });
    }

    await db.execute("DELETE FROM articles WHERE id = ?", [articleId]);
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};