import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Health check - confirms the server is alive. Also what you'll
// ping before a demo to wake up Render's free tier.
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});