document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.querySelector("#loginForm input[type='text']").value;
  const password = document.querySelector("#loginForm input[type='password']").value;

  try {
    const response = await fetch("http://192.168.235.128:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!");
      window.location.href = "homepage.html";
    } else {
      alert(data.message || "Login failed");
    }

  } catch (error) {
    alert("Backend not reachable");
    console.error("Fetch error:", error);
  }
});
