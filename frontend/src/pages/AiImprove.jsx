import { useState } from "react";
import API from "../api/axios";
import "../css/AiImprove.css";

function AiImprove() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    if (!content.trim()) return;
    try {
      setLoading(true);
      const res = await API.post("/ai/improve", { content });
      setResult(res.data.improved || "No improvement returned");
    } catch (err) {
      console.error(err);
      setResult("Error improving content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-improve-page">
      <h2>AI Sentence Improver</h2>
      <textarea
        placeholder="Enter sentence..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleImprove} disabled={loading}>
        {loading ? "Improving..." : "Improve Sentence"}
      </button>

      {result && (
        <div className="result-box">
          <h3>Improved:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default AiImprove;