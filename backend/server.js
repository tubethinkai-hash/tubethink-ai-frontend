import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ API route for AI responses
app.post("/api/chat", async (req, res) => {
  try {
    const userPrompt = req.body.prompt;

    // 🔥 TubeThink AI personality
    const aiPrompt = `
    You are TubeThink AI — an expert YouTube strategist and creative partner.
    Your job is to help creators with:
    - Video ideas
    - Titles
    - Descriptions
    - Trending keywords
    - Script outlines
    Be friendly, motivating, and data-driven.
    Now respond to the user’s request below in a professional yet conversational tone.

    User request: ${userPrompt}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: aiPrompt }],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// ✅ Default route for testing
app.get("/", (req, res) => {
  res.send("TubeThink AI backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
