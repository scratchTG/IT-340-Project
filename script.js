const BACKEND_URL = "http://192.168.235.128:3000";

let pendingEmail = "";

// LOGIN
const loginForm = document.getElementById("loginForm");
const twoFASection = document.getElementById("twoFASection");
const twoFAForm = document.getElementById("twoFAForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='text']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    try {
      const res = await fetch(${BACKEND_URL}/api/auth/login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.requires2FA) {
        pendingEmail = email;
        loginForm.style.display = "none";
        twoFASection.style.display = "block";
        alert("2FA code sent to your email");
      } else if (res.ok) {
        alert("Login successful");
        window.location.href = "homepage.html";
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert("Backend not reachable");
    }
  });
}

// VERIFY 2FA
if (twoFAForm) {
  twoFAForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const code = document.getElementById("twoFACode").value;

    try {
      const res = await fetch(${BACKEND_URL}/api/auth/verify-2fa, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, code })
      });

      const data = await res.json();

      if (res.ok) {
        alert("2FA verified!");
        window.location.href = "homepage.html";
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert("2FA verification failed");
    }
  });
}
