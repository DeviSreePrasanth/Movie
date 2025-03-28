// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = "8de602d1ef935fcd543656e2bbbe240f";

app.use(express.json());

// Proxy endpoint for movie data
app.get("/api/movies/:lang", async (req, res) => {
  const { lang } = req.params;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${lang}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch movies from TMDb" });
  }
});

// Enable CORS for all origins (adjust as needed)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});