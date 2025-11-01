const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  userInput.value = "";

  // Simulate AI typing...
  setTimeout(() => {
    addTypingEffect("Thinking of something creative...");
    setTimeout(() => {
      removeTypingEffect();
      addMessage(generateAIResponse(text), "ai");
    }, 1500);
  }, 500);
}

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = sender === "ai" ? "🤖" : "🧑";

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = text;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(bubble);
  chatBox.appendChild(messageDiv);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function addTypingEffect(text) {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message", "ai", "typing");
  typingDiv.innerHTML = `
    <div class="avatar">🤖</div>
    <div class="bubble">${text}</div>
  `;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingEffect() {
  const typingDiv = document.querySelector(".typing");
  if (typingDiv) typingDiv.remove();
}

function generateAIResponse(prompt) {
  const responses = [
    `How about a YouTube video titled: "${prompt} Explained Simply"?`,
    `Maybe try "${prompt} — The Secret Formula for Success"?`,
    `"${prompt}" could make a viral short if you make it fun!`,
    `Let's create "${prompt}" with TubeThink AI inspiration 🚀`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
