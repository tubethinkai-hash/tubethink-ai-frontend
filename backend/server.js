import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Simple AI logic — smart text generation
function generateSmartResponse(message) {
  const lower = message.toLowerCase();

  if (lower.includes("idea")) {
    return "💡 That’s a great idea! Try structuring it with a catchy hook, visual storytelling, and an engaging CTA.";
  }

  if (lower.includes("youtube")) {
    return "🎥 For YouTube success, focus on attention-grabbing intros, consistent posting, and thumbnail optimization!";
  }

  if (lower.includes("title")) {
    return "🧠 A strong YouTube title includes emotion + curiosity. Example: 'I Tried This Strategy for 7 Days — Here’s What Happened!'";
  }

  if (lower.includes("content")) {
    return "📘 Create content that educates, entertains, or inspires — those three pillars always perform best.";
  }

  const generalReplies = [
    "🚀 That sounds exciting! Could you share a bit more about your idea?",
    "🤔 Interesting thought — let’s refine it to make it even stronger!",
    "🔥 Great direction! Try blending creativity with value for your audience.",
    "✨ I love that! Maybe add a visual or example to make it pop.",
  ];

  return generalReplies[Math.floor(Math.random() * generalReplies.length)];
}

// POST route — AI replies here
app.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Please send a message!" });
  }

  const aiReply = generateSmartResponse(message);
  res.json({ reply: aiReply });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 AI server running on port ${PORT}`));
