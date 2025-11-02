const form = document.getElementById("chat-form");
const chatContainer = document.getElementById("chat-container");
const input = document.getElementById("user-input");

// Replace this with your Render backend URL:
const API_URL = "https://tubethink-ai-server.onrender.com/chat";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  const thinking = addMessage("ai", "Thinking...");
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    thinking.querySelector(".text").textContent = data.reply || "No response from AI.";
  } catch (err) {
    console.error(err);
    thinking.querySelector(".text").textContent = "Error: unable to connect to AI server.";
  }
});

function addMessage(role, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", role);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = role === "user" ? "🧑" : "🤖";

  const msgText = document.createElement("div");
  msgText.classList.add("text");
  msgText.textContent = text;

  msg.appendChild(avatar);
  msg.appendChild(msgText);
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  return msg;
}
