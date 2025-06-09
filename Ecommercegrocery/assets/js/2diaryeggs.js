 
 
 const products = [
    { name: "Fresh Eggs", price: 80, image: "../images/diary cate 1.png", rating: 5 },
    { name: "Fresh Milk", price: 60, image: "../images/diary cate 2.png", rating: 5 },
    { name: "Organic Eggs", price: 120, image: "../images/diary cate 3.png", rating: 5 },
    { name: "Fresh Cheese", price: 90, image: "../images/diary cate 4.png", rating: 5 },
    { name: "Eggs", price: 50, image: "../images/diary cate 5.png", rating: 5 },
    { name: "Cheddar Cheese", price: 140, image: "../images/diary cate 6.png", rating: 5 },
    { name: "Parmesan Cheese", price: 110, image: "../images/diary cate 7.png", rating: 5 },
    { name: "Organic Fresh Eggs", price: 100, image: "../images/diary cate 8.png", rating: 5 }
  ];

  function getStarImages(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += `<img src="../images/star icon.png" alt="★"/>`;
      } else {
        stars += `<img src="../images/star-empty.png" alt="☆"/>`;
      }
    }
    return stars;
  }

  const productList = document.getElementById('productRow');
  const priceRange = document.getElementById('priceRange');
  const priceLabel = document.getElementById('priceLabel');
  const sortBy = document.getElementById('sortBy');

  function displayProducts(productsToShow) {
    productList.innerHTML = '';
    if (productsToShow.length === 0) {
      productList.innerHTML = '<p>No products found in this price range.</p>';
      return;
    }

    productsToShow.forEach((p, index) => {
      const stars = getStarImages(p.rating);
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-4 mb-4";
      col.innerHTML = `<a class="bestbutton-link" href="" >
          <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <div class="bestveg">
            <div class="product-title">${p.name}</div>
            <div class="product-price">₹${p.price}</div>
            </div>
      <div class=" stars star-rating mt-1 mb-2">${stars}</div>
            <button class="bestaddcartbtn mt-2" onclick="addToCart(${index})">Add to Cart</button>
          </div>
          </a>
      `;
      productList.appendChild(col);
    });
  }

 function addToCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const selectedProduct = products[index];
  const existingProductIndex = cart.findIndex(item => item.name === selectedProduct.name);

  if (existingProductIndex !== -1) {
   
    cart[existingProductIndex].quantity += 1;
  } else {
  
    cart.push({ ...selectedProduct, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${selectedProduct.name} added to cart!`);
  updateCartCount(); 
}

  function applyFiltersAndSort() {
    const maxPrice = parseInt(priceRange.value);
    priceLabel.textContent = `₹0 - ₹${maxPrice}`;
    let filtered = products.filter(p => p.price <= maxPrice);

    const sortValue = sortBy.value;

    switch (sortValue) {
      case 'az':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'lowhigh':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'highlow':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'best':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        
        break;
    }

    displayProducts(filtered);
  }

 
  priceRange.addEventListener('input', applyFiltersAndSort);
  sortBy.addEventListener('change', applyFiltersAndSort);

  
  window.onload = applyFiltersAndSort;


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