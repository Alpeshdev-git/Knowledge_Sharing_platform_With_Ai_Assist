import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/dashboard.css";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(null); // article id being summarized
  const [summaries, setSummaries] = useState({}); // store summaries by article id

  // Fetch articles
  const fetchArticles = async (query = "", category = "") => {
    try {
      setLoading(true);
      let url = "/articles";
      const params = [];
      if (query) params.push(`search=${query}`);
      if (category) params.push(`category=${category}`);
      if (params.length) url += `?${params.join("&")}`;
      const res = await API.get(url);
      if (Array.isArray(res.data)) setArticles(res.data);
      else if (Array.isArray(res.data.data)) setArticles(res.data.data);
      else setArticles([]);
    } catch (err) {
      console.error(err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    fetchArticles(search.trim(), categoryFilter);
  };

  // Edit article
  const handleEdit = (article) => {
    navigate("/create", { state: { article } });
  };

  // Delete article
  const handleDelete = async (articleId) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await API.delete(`/articles/${articleId}`);
      setArticles(articles.filter((a) => a.id !== articleId));
      alert("Article deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete article.");
    }
  };

  // AI Summarize
  const handleAiSummary = async (articleId, content) => {
    try {
      setAiLoading(articleId);
      const res = await API.post("/ai/summary", { content });
      setSummaries((prev) => ({ ...prev, [articleId]: res.data.summary }));
    } catch (err) {
      console.error(err);
      alert("Failed to generate summary.");
    } finally {
      setAiLoading(null);
    }
  };

  return (
    <div className="dashboard-page">
      <h2>All Articles</h2>

      {/* Search & Category */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="AI">AI</option>
          <option value="DevOps">DevOps</option>
        </select>
        <button type="submit">Filter</button>
      </form>

      {loading ? (
        <p className="loading-text">Loading articles...</p>
      ) : articles.length === 0 ? (
        <p className="loading-text">No articles found.</p>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <small>
                <strong>Category:</strong> {article.category} |{" "}
                <strong>Tags:</strong> {article.tags}
              </small>

              {/* AI Summary */}
              <div className="article-actions">
                <button
                  onClick={() => handleAiSummary(article.id, article.content)}
                  disabled={aiLoading === article.id}
                  className="ai-btn"
                >
                  {aiLoading === article.id ? "Summarizing..." : "AI Summarize"}
                </button>

                {/* Show summary if available */}
                {summaries[article.id] && (
                  <div className="ai-summary">
                    <strong>AI Summary:</strong>
                    <p>{summaries[article.id]}</p>
                  </div>
                )}

                {/* Edit/Delete only for author */}
                {article.userId === user?.id && (
                  <>
                    <button onClick={() => handleEdit(article)}>Edit</button>
                    <button onClick={() => handleDelete(article.id)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard; 