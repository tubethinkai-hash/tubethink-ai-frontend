// ===============================
// TubeThink AI - script.js
// ===============================

// 🔗 Backend API URL (replace if your backend URL is different)
const API_URL = "https://tubethink-ai-backend.onrender.com";

// 🎨 Select key elements
const chatContainer = document.querySelector(".chat-container");
const userInput = document.querySelector("#user-input");
const sendButton = document.querySelector("#send-btn");

// 🧩 Add message to chat UI
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  const avatar = document.createElement("span");
  avatar.classList.add("avatar");
  avatar.textContent = sender === "user" ? "🧑" : "🤖";

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("bubble");
  messageBubble.textContent = text;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(messageBubble);
  chatContainer.appendChild(messageDiv);

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 🧠 Send user input to backend and get AI reply
async function sendMessageToBackend(message) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();
    return data.reply || "Hmm... I couldn’t find an answer.";
  } catch (error) {
    console.error(error);
    return "⚠️ Unable to connect to AI. Please try again later.";
  }
}

// 📨 Handle Send button click
sendButton.addEventListener("click", async () => {
  const message = userInput.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  userInput.value = "";

  const reply = await sendMessageToBackend(message);
  addMessage(reply, "bot");
});

// ⌨️ Handle Enter key press
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
});

// 👋 Initial greeting message
window.addEventListener("load", () => {
  addMessage(
    "Hi! I’m TubeThink AI — your creative assistant for crafting viral YouTube ideas! 🚀",
    "bot"
  );
});
