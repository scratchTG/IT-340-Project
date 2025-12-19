// =====================
// CONFIG
// =====================
const BACKEND_URL = "http://192.168.235.128:3000";
let pendingEmail = "";

// =====================
// LOGIN FORM HANDLER
// =====================
const loginForm = document.getElementById("loginForm");
const twoFASection = document.getElementById("twoFASection");
const twoFAForm = document.getElementById("twoFAForm");
const signupForm = document.getElementById("signupForm");



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

      // 2FA REQUIRED
      if (data.requires2FA) {
        pendingEmail = email;
        loginForm.style.display = "none";
        twoFASection.style.display = "block";
        alert("2FA code sent to your email");
        return;
      }

      // LOGIN SUCCESS (no 2FA)

window.location.href = "userpage.html";


      if (response.ok) {
  // Save login session
  localStorage.setItem("token", data.token);
  localStorage.setItem("userEmail", email);

  alert("Login successful!");
  window.location.href = "userpage.html";
}

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
// 2FA VERIFICATION HANDLER
// =====================
if (twoFAForm) {
  twoFAForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const code = document.getElementById("twoFACode").value;

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/verify-2fa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: pendingEmail,
          code: code
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("2FA verified! Login complete.");
        window.location.href = "homepage.html";
      } else {
        alert(data.message || "Invalid 2FA code");
      }

    } catch (error) {
      alert("2FA verification failed");
      console.error("2FA error:", error);
    }
  });
}

// =====================
// USER PROFILE LOAD
// =====================
const emailSpan = document.getElementById("userEmail");

if (emailSpan) {
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  if (!token || !userEmail) {
    // Not logged in → kick out
    window.location.href = "index.html";
  } else {
    emailSpan.textContent = userEmail;
  }
}

document.querySelectorAll("a[href='index.html']").forEach(link => {
  link.addEventListener("click", () => {
    localStorage.clear();
  });
});

