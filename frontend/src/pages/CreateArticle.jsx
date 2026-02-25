import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import API from "../api/axios";
import "react-quill/dist/quill.snow.css";
import "../css/createarticle.css";

function CreateArticle() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingArticle = location.state?.article;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [summary, setSummary] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (editingArticle) {
      setTitle(editingArticle.title || "");
      setContent(editingArticle.content || "");
      setCategory(editingArticle.category || "");
      setTags(editingArticle.tags || "");
      setSummary(editingArticle.summary || "");
    } else {
      setTitle("");
      setContent("");
      setCategory("");
      setTags("");
      setSummary("");
    }
  }, [editingArticle]);

  // Create / Update
  const handleSubmit = async () => {
    try {
      if (editingArticle) {
        await API.put(`/articles/${editingArticle.id}`, {
          title,
          content,
          category,
          tags,
          summary,
        });
        alert("Article updated successfully!");
      } else {
        await API.post("/articles", { title, content, category, tags, summary });
        alert("Article created successfully!");
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save article.");
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!editingArticle) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/articles/${editingArticle.id}`);
      alert("Article deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to delete article.");
    }
  };

  // AI Improve Content
  const handleAiImprove = async () => {
    if (!content.trim()) return;
    try {
      setLoadingAI(true);
      const res = await API.post("/ai/improve", { content });
      setContent(res.data.improved || content);
      alert("Content improved by AI!");
    } catch (err) {
      console.error(err);
      alert("AI improvement failed.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="create-article-page">
      <h2>{editingArticle ? "Edit Article" : "Create Article"}</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <ReactQuill value={content} onChange={setContent} />

      <div className="article-buttons">
        <button onClick={handleSubmit}>
          {editingArticle ? "Update Article" : "Publish Article"}
        </button>
        {editingArticle && (
          <button className="delete-btn" onClick={handleDelete}>
            Delete Article
          </button>
        )}
        <button
          className="ai-btn"
          onClick={handleAiImprove}
          disabled={loadingAI}
        >
          {loadingAI ? "Improving..." : "AI Improve"}
        </button>
      </div>
    </div>
  );
}

export default CreateArticle;