document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputs = document.querySelectorAll("#signupForm input");
  const name = inputs[0].value;
  const email = inputs[1].value;
  const password = inputs[2].value;

  try {
    const response = await fetch("http://192.168.235.128:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account created! Please log in.");
      window.location.href = "index.html";
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    alert("Backend not reachable");
    console.error(err);
  }
});
