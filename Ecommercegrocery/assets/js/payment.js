 window.onload = function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let subtotal = 0;
    cart.forEach(item => {
      const qty = parseInt(item.quantity) || 1;
      subtotal += item.price * qty;
    });

    const delivery = 0;
    const discount = subtotal >= 500 ? 50 : 0;
    const total = subtotal - discount + delivery;

    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('delivery').textContent = delivery.toFixed(2);
    document.getElementById('discount').textContent = discount.toFixed(2);
    document.getElementById('totalPrice').textContent = total.toFixed(2);
  };