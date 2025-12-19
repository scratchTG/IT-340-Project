document.getElementById("verifyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const otp = document.getElementById("otp").value;
  const email = localStorage.getItem("2faEmail");

  if (!email) {
    alert("Session expired. Please log in again.");
    window.location.href = "index.html";
    return;
  }

  const res = await fetch("http://localhost:3000/api/auth/verify-2fa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Authentication successful!");
    localStorage.removeItem("2faEmail");
    window.location.href = "userpage.html";
  } else {
    alert(data.message || "Invalid code");
  }
});
