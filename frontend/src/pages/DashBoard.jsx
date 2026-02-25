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
  const [category, setCategory] = useState(""); // selected category
  const [loading, setLoading] = useState(false);

  // Fetch articles (optionally filtered by search or category)
  const fetchArticles = async (query = "", cat = "") => {
    try {
      setLoading(true);
      let url = "/articles";
      if (query && cat) url += `?search=${query}&category=${cat}`;
      else if (query) url += `?search=${query}`;
      else if (cat) url += `?category=${cat}`;

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
    fetchArticles(search.trim(), category);
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

  return (
    <div className="dashboard-page">
      <h2>All Articles</h2>

      {/* Search + Category dropdown */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="DevOps">DevOps</option>
          <option value="AI">AI</option>
        </select>

        <button type="submit">Search</button>
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

              {/* Show edit/delete only for the author */}
              {article.userId === user?.id && (
                <div className="article-actions">
                  <button onClick={() => handleEdit(article)}>Edit</button>
                  <button onClick={() => handleDelete(article.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;