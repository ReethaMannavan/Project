 const products = {
      new: [
        { name: "European Zesty Lemon", price: "₹80", img: "../images/new arrivals 1.png" },
        { name: "Apple from Kashmir", price: "₹240", img: "../images/new arrivals 2.png" },
        { name: "Coconuts", price: "₹320", img: "../images/new arrivals 3.png" },
      ],
      trending: [
         { name: "Organic Garlic", price: "₹150", img: "../images/trending 1.png" },
        { name: "Strawberries", price: "₹240", img: "../images/trending 2.png" },
        { name: "Spinach", price: "₹25", img: "../images/trending 3.png" },
      ],
      best: [
        { name: "Raddish", price: "₹80", img: "../images/best selling home 1.png" },
        { name: "Sardines in Fish", price: "₹100", img: "../images/best selling home 2.png" },
        { name: "Coriander Leaves", price: "₹15", img: "../images/best selling home 3.png" },
      ]
    };

   
    function showProducts(category) {
      const productArea = document.getElementById("productArea");
      const list = products[category]
        .map(
          (p) => `
            <div class="product product-linksjs">
              <img src="${p.img}" alt="${p.name}">
              <div class="product-details">
                <p class="product-name">${p.name}</p>
                <p class="product-price">${p.price}</p>
                <button class="add-to-cart" onclick="addToCart('${p.name}')">Add to Cart</button>
              </div>
            </div>
          `
        )
        .join("");
      productArea.innerHTML = list;
    }

 
    function addToCart(productName) {
      alert(productName + " added to cart!");
    }

    showProducts('new');





    // ----------------add to cart--------------

    

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