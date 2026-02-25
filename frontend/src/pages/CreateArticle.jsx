import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/dashboard.css";

function Dashboard() {
  const { user } = useContext(AuthContext); // logged-in user info
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch articles from API
  const fetchArticles = async (query = "") => {
    try {
      setLoading(true);
      const res = await API.get(`/articles${query ? `?search=${query}` : ""}`);
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchArticles(search.trim());
  };

  const handleEdit = (article) => {
    navigate("/create", { state: { article } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await API.delete(`/articles/${id}`);
      setArticles(articles.filter(a => a.id !== id));
      alert("Article deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete article.");
    }
  };

  return (
    <div className="dashboard-page">
      <h2>All Articles</h2>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p className="loading-text">Loading articles...</p>
      ) : articles.length === 0 ? (
        <p className="loading-text">No articles found.</p>
      ) : (
        <div className="articles-grid">
          {articles.map(article => (
            <div key={article.id} className="article-card">
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <small>
                <strong>Category:</strong> {article.category} |{" "}
                <strong>Tags:</strong> {article.tags}
              </small>

              {/* Only show Edit/Delete if current user is the author */}
              {user?.id === article.userId && (
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