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

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='text']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      // LOGIN SUCCESS (NO 2FA)
      if (response.ok) {
        localStorage.setItem("userEmail", email);
        alert("Login successful!");
        window.location.href = "userpage.html";
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pendingEmail,
          code: code
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userEmail", pendingEmail);
        alert("2FA verified! Login complete.");
        window.location.href = "userpage.html";
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
<<<<<<< HEAD
// USER PROFILE PAGE LOAD
=======
// LOAD USER PROFILE
>>>>>>> 2f6b58eb5746e0ba75b3e90e711e666ba909e7b5
// =====================
const emailSpan = document.getElementById("userEmail");
const resumeStatus = document.getElementById("resumeStatus");

if (emailSpan) {
<<<<<<< HEAD
  const userEmail = localStorage.getItem("userEmail");

  if (!userEmail) {
=======
  const token = localStorage.getItem("token");

  if (!token) {
>>>>>>> 2f6b58eb5746e0ba75b3e90e711e666ba909e7b5
    window.location.href = "index.html";
  } else {
    loadUserProfile();
  }
}

async function loadUserProfile() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!res.ok) throw new Error("Unauthorized");

    const user = await res.json();

    emailSpan.textContent = user.email;
    resumeStatus.textContent = user.resume ? "Uploaded" : "Not uploaded";

  } catch (err) {
    console.error(err);
    localStorage.clear();
    window.location.href = "index.html";
  }
}

<<<<<<< HEAD
// =====================
// LOGOUT
// =====================
document.querySelectorAll("a[href='index.html']").forEach(link => {
  link.addEventListener("click", () => {
    localStorage.clear();
  });
});
=======

>>>>>>> 2f6b58eb5746e0ba75b3e90e711e666ba909e7b5
