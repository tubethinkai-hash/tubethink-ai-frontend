import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// single POST /chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = (req.body.message || "").toString();

    if (!userMessage) {
      return res.status(400).json({ reply: "Please send a message in the request body." });
    }

    // call OpenAI chat completions
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4o" / "gpt-3.5-turbo" depending on your key & availability
      messages: [
        {
          role: "system",
          content:
            "You are TubeThink AI, a friendly expert assistant that helps YouTube creators create ideas, titles, scripts, thumbnails and distribution tips. Be concise and give structured actionable suggestions."
        },
        { role: "user", content: userMessage }
      ],
      temperature: 0.8,
      max_tokens: 500
    });

    const aiReply = completion.choices?.[0]?.message?.content ?? "Sorry, no response.";
    return res.json({ reply: aiReply });
  } catch (err) {
    console.error("OpenAI error:", err?.message || err);
    return res.status(500).json({ reply: "Server error while generating reply." });
  }
});

// health
app.get("/", (req, res) => res.send("TUBETHINK AI Backend is running 🚀"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
