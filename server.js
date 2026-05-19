import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    `<h1>URL Shortener</h1><p>POST /shorten with { "longUrl": "https://example.com" }</p>`
  );
});

app.use("/", urlRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.path });
});

const PORT = process.env.PORT || 3000;

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
