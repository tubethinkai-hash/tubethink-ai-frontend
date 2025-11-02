import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route for chat requests
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are TubeThink AI, an intelligent YouTube idea assistant." },
        { role: "user", content: userMessage },
      ],
    });

    const aiReply = response.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "Error generating AI response." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
