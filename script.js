const form = document.getElementById("chat-form");
const chatContainer = document.getElementById("chat-container");
const input = document.getElementById("user-input");

// 🌐 Your backend server URL
const SERVER_URL = "https://tubethink-ai-server.onrender.com";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  const thinking = addMessage("ai", "Thinking...");
  try {
    const res = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    thinking.querySelector(".text").textContent = data.reply;
  } catch (err) {
    thinking.querySelector(".text").textContent = "⚠️ Connection issue. Please try again.";
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
