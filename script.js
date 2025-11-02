const chatForm = document.getElementById("chat-form");
const chatBox = document.getElementById("chat-box");

// Replace this URL with your own backend URL from Render!
const API_URL = "https://tubethink-ai-server.onrender.com/api/chat";

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputField = document.getElementById("user-input");
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  // Display user message
  chatBox.innerHTML += `<div class="user"><b>You:</b> ${userMessage}</div>`;
  inputField.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userMessage }),
    });

    const data = await response.json();

    if (data.reply) {
      chatBox.innerHTML += `<div class="ai"><b>TubeThink AI:</b> ${data.reply}</div>`;
    } else {
      chatBox.innerHTML += `<div class="ai"><b>TubeThink AI:</b> Sorry, I didn’t get that.</div>`;
    }
  } catch (error) {
    console.error("Error:", error);
    chatBox.innerHTML += `<div class="ai error"><b>TubeThink AI:</b> There was an error connecting to the server.</div>`;
  }

  // Auto scroll
  chatBox.scrollTop = chatBox.scrollHeight;
});
