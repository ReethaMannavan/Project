(() => {
  const form = document.getElementById('contactForm');
  const formSection = document.getElementById('form-section');
  const thankYou = document.getElementById('thank-you');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    
    const existingData = JSON.parse(localStorage.getItem(email)) || [];
    existingData.push({ name, phone, message, date: new Date().toISOString() });
    localStorage.setItem(email, JSON.stringify(existingData));

   
    form.reset();
    form.classList.remove('was-validated');
    formSection.style.display = 'none';
    thankYou.style.display = 'block';

    
    setTimeout(() => {
      thankYou.style.display = 'none';
      formSection.style.display = 'block';
    }, 4000);
  });
})();