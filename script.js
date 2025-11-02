const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Your backend API URL
const API_URL = "https://tubethink-ai-backend.onrender.com/api/chat"; // 👈 replace if different

let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

function displayMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message", "ai");
  typingDiv.id = "typing";
  typingDiv.textContent = "TubeThink AI is typing...";
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typingDiv = document.getElementById("typing");
  if (typingDiv) typingDiv.remove();
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  displayMessage(text, "user");
  userInput.value = "";
  showTyping();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });

    const data = await response.json();
    removeTyping();

    const aiReply = data.response || "Sorry, I didn’t catch that.";
    displayMessage(aiReply, "ai");

    // Save chat history
    chatHistory.push({ user: text, ai: aiReply });
    if (chatHistory.length > 10) chatHistory.shift(); // keep last 10
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  } catch (error) {
    removeTyping();
    displayMessage("⚠️ Connection error, please try again.", "ai");
  }
}

// Restore chat on reload
window.onload = () => {
  chatHistory.forEach((msg) => {
    displayMessage(msg.user, "user");
    displayMessage(msg.ai, "ai");
  });
};

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
