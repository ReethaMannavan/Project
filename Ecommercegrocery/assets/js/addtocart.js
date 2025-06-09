window.onload = function () {
  renderCart();
};

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cartItems');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    updateSummary(0);
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    
    if (!item.quantity || item.quantity < 1) {
      item.quantity = 1;
    }

    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const div = document.createElement('div');
    div.className = 'card mb-3';

    div.innerHTML = `
      <div class="row g-0 align-items-center cardrow">
        <div class="col-md-4">
          <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">₹${item.price.toFixed(2)}</p>

            <div class="d-flex align-items-center mb-2">
              <button class="btn btn-outline-danger btn-sm me-2" onclick="changeQuantity(${index}, -1)">➖</button>
              <span id="qty-${index}" class="mx-2">${item.quantity}</span>
              <button class="btn btn-outline-success btn-sm" onclick="changeQuantity(${index}, 1)">➕</button>
            </div>

           
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
          </div>
        </div>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  localStorage.setItem('cart', JSON.stringify(cart)); 
  updateSummary(subtotal);
}

function changeQuantity(index, delta) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart[index].quantity) {
    cart[index].quantity = 1;
  }
  cart[index].quantity += delta;

  if (cart[index].quantity < 1) cart[index].quantity = 1;

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function updateSummary(subtotal) {
  const delivery = 0;
  const discount = subtotal >= 500 ? 50 : 0;
  const total = subtotal - discount + delivery;

  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('delivery').textContent = delivery.toFixed(2);
  document.getElementById('discount').textContent = discount.toFixed(2);
  document.getElementById('totalPrice').textContent = total.toFixed(2);
}

window.addEventListener('storage', function(event) {
  if (event.key === 'cart') {
    renderCart();  
  }
});

// ---------------checkout------------


function goToCheckout() {
  if (localStorage.getItem('loggedIn') === 'true') {
    window.location.href = '../pages/payment.html';
  } else {
    alert('You must log in to proceed to checkout.');
    localStorage.setItem('redirectAfterLogin', '../pages/5loginpage.html');
    window.location.href = '../pages/5loginpage.html';
  }
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

