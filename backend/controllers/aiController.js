exports.improveContent = async (req, res) => {
  const { content } = req.body;

  // Mocked AI response
  const improved = content + "\n\n[Improved by AI]";

  res.json({ improved });
};

exports.generateSummary = async (req, res) => {
  const { content } = req.body;

  const summary = content.substring(0, 150) + "...";

  res.json({ summary });
};