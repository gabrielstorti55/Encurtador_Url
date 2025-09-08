import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });
      const data = await res.json();
      setShortUrl(data.shortUrl);
      setUrl("");
    } catch (err) {
      console.error("Erro ao encurtar URL:", err);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Encurtador de URL</h1>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="url"
            placeholder="Cole sua URL aqui..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit">Encurtar</button>
        </form>

        {shortUrl && (
          <div className="result">
            <span>✅ URL curta:</span>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
