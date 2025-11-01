const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatLog = document.getElementById("chat-log");

sendBtn.addEventListener("click", handleMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleMessage();
});

function handleMessage() {
  const text = userInput.value.trim();
  if (text === "") return;
  addMessage("user", text);
  userInput.value = "";

  // Show typing indicator
  const typing = document.createElement("div");
  typing.classList.add("bot-msg");
  typing.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/4712/4712107.png" class="msg-avatar" />
  <div class="msg-text typing">TubeThink AI is thinking...</div>`;
  chatLog.appendChild(typing);
  chatLog.scrollTop = chatLog.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const reply = generateAIResponse(text);
    addMessage("bot", reply);
  }, 1200);
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add(sender === "bot" ? "bot-msg" : "user-msg");
  const avatar =
    sender === "bot"
      ? `<img src="https://cdn-icons-png.flaticon.com/512/4712/4712107.png" class="msg-avatar" />`
      : `<img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" class="msg-avatar" />`;
  msg.innerHTML = `${avatar}<div class="msg-text">${text}</div>`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function generateAIResponse(input) {
  const ideas = [
    "🎬 Try this: *'5 Secrets YouTube Doesn't Tell Small Creators!'*",
    "🔥 Idea: *'AI Tools That Make YouTube Editing 10x Faster!'*",
    "📈 Go with: *'How I Got 1K Subs in 7 Days (No Clickbait)*'",
    "🤖 *'I Let AI Decide My YouTube Content For a Week!'* — that’d be awesome!"
  ];
  return ideas[Math.floor(Math.random() * ideas.length)];
}
