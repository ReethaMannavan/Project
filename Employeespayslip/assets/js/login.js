 const loginForm = document.getElementById("loginForm");
  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");
  const nameError = document.getElementById("nameError");
  const passwordError = document.getElementById("passwordError");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;
    nameError.textContent = "";
    passwordError.textContent = "";

    // Name validation
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Name is required.";
      valid = false;
    }

    // Password validation
    const password = passwordInput.value;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;

    if (!passwordPattern.test(password)) {
      passwordError.textContent = "Password must include 1 letter, 1 number, 1 special character.";
      valid = false;
    }

    if (valid) {
      alert("Login Successful!");
      // Proceed with login logic (e.g., redirect or store session)
    }
  });

document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");

  const isPassword = passwordInput.getAttribute("type") === "password";
  passwordInput.setAttribute("type", isPassword ? "text" : "password");

  // Toggle icon
  eyeIcon.classList.toggle("fa-eye");
  eyeIcon.classList.toggle("fa-eye-slash");
});