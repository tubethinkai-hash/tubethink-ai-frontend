const form = document.getElementById("chat-form");
const chatContainer = document.getElementById("chat-container");
const input = document.getElementById("user-input");

// When user submits the message
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  // Add user's message
  addMessage("user", message);
  input.value = "";

  // Show temporary "thinking..." message
  const thinking = addMessage("ai", "Thinking...");
  await new Promise((r) => setTimeout(r, 800));

  // Get real response from backend
  const aiReply = await generateAIResponse(message);

  // Replace "Thinking..." with AI's real reply
  thinking.querySelector(".text").textContent = aiReply;
});

// Function to display messages
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

// Function to talk to backend API
async function generateAIResponse(inputText) {
  try {
    const response = await fetch("https://tubethink-ai-server.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputText }),
    });

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();
    return data.reply || "🤖 Sorry, I didn’t get that. Try again!";
  } catch (error) {
    console.error("Error:", error);
    return "⚠️ Connection issue — please try again later.";
  }
}
