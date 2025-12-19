const messagesBox = document.getElementById("messagesBox");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

// Read friend ID from URL
const params = new URLSearchParams(window.location.search);
const friendId = params.get("friend");

// TEMP auth (replace with JWT later)
const userEmail = localStorage.getItem("userEmail");

async function loadMessages() {
  const res = await fetch(
    `http://localhost:3000/api/messages/${friendId}?email=${userEmail}`
  );
  const messages = await res.json();

  messagesBox.innerHTML = "";

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message " + (msg.fromMe ? "me" : "friend");
    div.textContent = msg.text;
    messagesBox.appendChild(div);
  });

  messagesBox.scrollTop = messagesBox.scrollHeight;
}

messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = messageInput.value;

  await fetch("http://localhost:3000/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: friendId,
      fromEmail: userEmail,
      text
    })
  });

  messageInput.value = "";
  loadMessages();
});

// Refresh messages every 3 seconds
setInterval(loadMessages, 3000);
loadMessages();
