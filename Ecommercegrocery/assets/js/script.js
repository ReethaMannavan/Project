 const currentPage = location.pathname.split("/").pop();
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (href === "home.html" && currentPage === "")) {
      link.classList.add("active");
    }
  });


  // ------------login/logout------------


  //  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const accountLink = document.getElementById('account-link');

  //   if (isLoggedIn && user) {
  //     accountLink.textContent = 'My Account';
  //     accountLink.href = '#'; 
  //   }

  const accountLink = document.getElementById('account-link');
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
   const user = JSON.parse(localStorage.getItem('user'));

  if (isLoggedIn) {
    accountLink.textContent = 'My Account';
    accountLink.href = '#'; 

  
    const logoutBtn = document.createElement('a');
    logoutBtn.href = '#';
    logoutBtn.classList.add('nav-link');
    logoutBtn.textContent = 'Logout';
    logoutBtn.style.cursor = 'pointer';

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('user'); 
      location.reload(); 
    });

   
    const logoutNavItem = document.createElement('li');
    logoutNavItem.classList.add('nav-item');
    logoutNavItem.appendChild(logoutBtn);

    
    accountLink.parentElement.after(logoutNavItem);
  }


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


  // -----------search bar--------------------


  document.querySelector('.search-button').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();


    let productId;

    if (query === 'strawberry') {
        productId = 'strawberry-001';  
    } else if (query === 'apple') {
        productId = 'apple-001';
    } else {
        alert('Product not found!');
        return;
    }

   
    window.location.href = `../pages/descstrawberry.html?id=${productId}`;
});
