const form = document.getElementById("chat-form");
const chatContainer = document.getElementById("chat-container");
const input = document.getElementById("user-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  const thinking = addMessage("ai", "Thinking...");
  await new Promise((r) => setTimeout(r, 1000));

  thinking.querySelector(".text").textContent =
    generateAIResponse(message);
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

function generateAIResponse(inputText) {
  const responses = [
    "That’s a great topic! You could explore it by adding storytelling visuals.",
    "Nice idea — how about adding trending keywords for better reach?",
    "Try a ‘Top 5’ or ‘Behind the scenes’ format for this idea!",
    "Sounds awesome! Don’t forget to make a catchy thumbnail.",
    "Perfect! Use emotional hooks in your intro to grab attention."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
