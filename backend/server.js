import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Tubethink AI backend is running!");
});

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
