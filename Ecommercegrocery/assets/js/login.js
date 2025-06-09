document.getElementById('toggleLoginPassword').addEventListener('click', function () {
  const passwordInput = document.getElementById('login-password');
  const icon = this.querySelector('i');
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  icon.classList.toggle('bi-eye');
  icon.classList.toggle('bi-eye-slash');
});

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  const emailErr = document.getElementById('login-email-error');
  const passErr = document.getElementById('login-password-error');
  emailErr.textContent = '';
  passErr.textContent = '';

  let isValid = true;

  if (!email) {
    emailErr.textContent = 'Email is required.';
    isValid = false;
  }

  if (!password) {
    passErr.textContent = 'Password is required.';
    isValid = false;
  }

  if (!isValid) return;

  

 const users = JSON.parse(localStorage.getItem('users')) || [];


const matchedUser = users.find(user => user.email === email && user.password === password);

if (matchedUser) {
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('user', JSON.stringify(matchedUser));

  alert('Login successful!');

  const redirect = localStorage.getItem('redirectAfterLogin') || '../pages/contactaddress.html';
  localStorage.removeItem('redirectAfterLogin');
  window.location.href = redirect;

} else {
  passErr.textContent = 'Invalid email or password.';
}
});

function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('user');
  window.location.href = '../pages/5loginpage.html';
}