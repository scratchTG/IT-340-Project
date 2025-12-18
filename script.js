// ===== CONFIG =====
const BACKEND_URL = "http://192.168.235.128:3000";

// =====================
// LOGIN FORM HANDLER
// =====================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='text']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
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
      console.error("Login error:", error);
    }
  });
}

// =====================
// SIGNUP FORM HANDLER
// =====================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = signupForm.querySelector("input[type='email']").value;
    const password = signupForm.querySelector("input[type='password']").value;

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please log in.");
        window.location.href = "index.html";
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (error) {
      alert("Backend not reachable");
      console.error("Signup error:", error);
    }
  });
}

