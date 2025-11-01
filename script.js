const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatLog = document.getElementById("chat-log");

sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (text === "") return;

  addMessage("user", text);
  userInput.value = "";

  setTimeout(() => {
    const reply = generateAIResponse(text);
    addMessage("bot", reply);
  }, 700);
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add(sender === "bot" ? "bot-msg" : "user-msg");
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function generateAIResponse(input) {
  const ideas = [
    "🎬 '10 Hidden YouTube Tips That Most Creators Miss!'",
    "🔥 'How to Make AI Generate Viral Shorts for You'",
    "📈 'Secrets to Growing from 0 to 10K Subscribers in 30 Days!'",
    "🤖 'AI vs Human Creativity – Who Wins on YouTube?'"
  ];
  return ideas[Math.floor(Math.random() * ideas.length)];
}
