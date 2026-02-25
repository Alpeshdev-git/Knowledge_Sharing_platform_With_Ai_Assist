import { useState } from "react";
import API from "../api/axios";
import "../css/Aisummary.css"; 

function AiSummary() {
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!content.trim()) return;
    try {
      setLoading(true);
      const res = await API.post("/ai/summary", { content });
      // Assuming API returns { summary: "..." }
      setSummary(res.data.summary || "No summary returned");
    } catch (err) {
      console.error(err);
      setSummary("Error summarizing content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-improve-page">
      <h2>AI Summarizer</h2>
      <textarea
        placeholder="Paste your content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="result-box">
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default AiSummary;