document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const job = document.getElementById("job").value;
  const resume = document.getElementById("resume").files[0];

  // TEMP: store profile data locally
  localStorage.setItem("name", name);
  localStorage.setItem("age", age);
  localStorage.setItem("job", job);

  alert("Profile updated! Resume uploaded.");

  // Go back to profile page
  window.location.href = "userpage.html";
});
