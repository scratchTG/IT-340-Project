// LOGIN FORM
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Login attempted (connect backend later).");
  });
}

// SIGNUP FORM
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Signup attempted (connect backend later).");
  });
}

