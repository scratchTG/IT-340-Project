const friendsList = document.getElementById("friendsList");
const addFriendForm = document.getElementById("addFriendForm");

// TEMP: replace with JWT later
const userEmail = localStorage.getItem("userEmail");

// Load friends
async function loadFriends() {
  const res = await fetch(`http://localhost:3000/api/friends/${userEmail}`);
  const friends = await res.json();

  friendsList.innerHTML = "";

  friends.forEach(friend => {
    const div = document.createElement("div");
    div.className = "friend-card";

    div.innerHTML = `
      <strong>${friend.name}</strong>
      <p>Age: ${friend.age}</p>
      <p>Job: ${friend.job}</p>
      <div class="friend-actions">
        <button onclick="deleteFriend('${friend._id}')">Delete</button>
        <button onclick="messageFriend('${friend._id}')">Message</button>
      </div>
    `;

    friendsList.appendChild(div);
  });
}

addFriendForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const friendEmail = document.getElementById("friendEmail").value;

  await fetch("http://localhost:3000/api/friends/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail, friendEmail })
  });

  loadFriends();
});

async function deleteFriend(friendId) {
  await fetch(`http://localhost:3000/api/friends/${friendId}`, {
    method: "DELETE"
  });

  loadFriends();
}

function messageFriend(friendId) {
  window.location.href = `messages.html?friend=${friendId}`;
}

loadFriends();
