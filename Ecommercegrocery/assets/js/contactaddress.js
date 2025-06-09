document.getElementById("addressForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const contactDetails = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    street: document.getElementById("street").value.trim(),
    city: document.getElementById("city").value.trim(),
    state: document.getElementById("state").value.trim()
  };

  
  if (
    !contactDetails.name ||
    !contactDetails.phone ||
    !contactDetails.street ||
    !contactDetails.city ||
    !contactDetails.state
  ) {
    alert("Please fill out all fields.");
    return;
  }

  localStorage.setItem("contactAddress", JSON.stringify(contactDetails));

  alert("Address saved!");

  
  window.location.href = "../pages/payment.html";
});
