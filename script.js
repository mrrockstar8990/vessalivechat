const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Show user message
  const userBubble = document.createElement("div");
  userBubble.className = "user-message";
  userBubble.innerText = message;
  chatBox.appendChild(userBubble);
  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Show loading
  const loadingBubble = document.createElement("div");
  loadingBubble.className = "bot-message";
  loadingBubble.innerText = "Thinking...";
  chatBox.appendChild(loadingBubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://livechat-production-1092.up.railway.app/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    loadingBubble.remove();

    const botBubble = document.createElement("div");
    botBubble.className = "bot-message";
    botBubble.innerText = data.reply;
    chatBox.appendChild(botBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    loadingBubble.innerText = "Sorry, I couldn’t connect.";
  }
}
