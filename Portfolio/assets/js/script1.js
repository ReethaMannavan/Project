const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const countryCode = document.getElementById("countryCode");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");
  const privacyPolicy = document.getElementById("privacyPolicy");

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const messageError = document.getElementById("messageError");
  const privacyError = document.getElementById("privacyError");

  // Clear errors and success message
  firstNameError.textContent = "";
  lastNameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  messageError.textContent = "";
  privacyError.textContent = "";
  successMsg.textContent = "";

  // Validation
  if (!/^[A-Za-z]{2,}$/.test(firstName.value.trim())) {
    firstNameError.textContent = "Enter a valid first name (min 2 letters)";
    isValid = false;
  }

  if (!/^[A-Za-z]{2,}$/.test(lastName.value.trim())) {
    lastNameError.textContent = "Enter a valid last name (min 2 letters)";
    isValid = false;
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value.trim())) {
    emailError.textContent = "Enter a valid email address";
    isValid = false;
  }

  if (!/^\d{7,14}$/.test(phone.value.trim())) {
    phoneError.textContent = "Enter a valid phone number (7–14 digits)";
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters";
    isValid = false;
  }

  if (!privacyPolicy.checked) {
    privacyError.textContent = "You must agree to the privacy policy";
    isValid = false;
  }

  // If valid, show thank-you message and redirect
  if (isValid) {
    const userDetails = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      phone: countryCode.value + phone.value.trim(),
      message: message.value.trim(),
      acceptedPrivacyPolicy: privacyPolicy.checked,
    };

    let allEntries = JSON.parse(localStorage.getItem('contactFormEntries')) || [];
    allEntries.push(userDetails);
    localStorage.setItem('contactFormEntries', JSON.stringify(allEntries));

    // Hide the form and show thank-you message
    form.style.display = "none";
    successMsg.innerHTML = `
      <div style="text-align: center;" id="thankYouMsg">
        <img src="./assets/images/thanku.jpg" alt="Thank You" style="max-width: 100%; border-radius: 10px;" />
        <br/><br/>
        <p>Your message has been received.</p>
        <h4>WE WILL REACH YOU SOON</h4>
      </div>
    `;

    // After 3 seconds, navigate to #home and reset form
    setTimeout(() => {
      form.reset();
      successMsg.innerHTML = "";
      form.style.display = "block";
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    }, 3000);
  }
});
