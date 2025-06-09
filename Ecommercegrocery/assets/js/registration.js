document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const icon = document.getElementById("eye-icon");
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    icon.classList.toggle("bi-eye");
    icon.classList.toggle("bi-eye-slash");
  });

document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const nameErr = document.getElementById("fullname-error");
    const emailErr = document.getElementById("email-error");
    const passErr = document.getElementById("password-error");

    nameErr.textContent = "";
    emailErr.textContent = "";
    passErr.textContent = "";

    let isValid = true;

    if (fullname.length < 3) {
      nameErr.textContent = "Full name must be at least 3 characters long.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailErr.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      passErr.textContent =
        "Password must be 6+ characters, include upper/lowercase and a number.";
      isValid = false;
    }

    if (isValid) {
      const user = { fullname, email, password };
      // localStorage.setItem('user', JSON.stringify(user));
      // alert('Registration successful!');
      // window.location.href = '../pages/5loginpage.html';

      const newUser = { fullname, email, password };

     
      let users = JSON.parse(localStorage.getItem("users")) || [];

      const emailExists = users.some((user) => user.email === email);
      if (emailExists) {
        emailErr.textContent = "Email already registered.";
        return;
      }

     
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

     
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("loggedIn", "true");

      alert("Registration successful!");
      window.location.href = "../pages/5loginpage.html";
    }
  });

   // -----------update cart count-----------

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;

    cart.forEach(item => {
      const qty = parseInt(item.quantity);
      if (!isNaN(qty)) {
        totalItems += qty;
      }
    });

    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = totalItems;
    }
  }

  updateCartCount();


