const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  // Add user message
  addMessage(text, "user-message");

  // Clear input
  userInput.value = "";

  // Simulate AI typing
  setTimeout(() => {
    const reply = getAIResponse(text);
    addMessage(reply, "bot-message");
  }, 600);
}

function addMessage(text, className) {
  const msg = document.createElement("div");
  msg.classList.add(className);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getAIResponse(input) {
  const responses = [
    "That sounds interesting! How about a video on 'AI tools for YouTubers'?",
    "You could make a tutorial about improving YouTube titles with AI.",
    "Try a video like 'How I use TubeThink AI to plan my videos'!",
    "Great idea! Want me to generate a catchy title for that?"
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
