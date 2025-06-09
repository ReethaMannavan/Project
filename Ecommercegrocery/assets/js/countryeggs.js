const weightOptions = document.querySelectorAll('.weight-option');
        const addToCartBtn = document.getElementById('add-to-cart');
        const cartCount = document.getElementById('cart-count');
        const notification = document.getElementById('notification');
        
        
        let selectedWeight = '250';
        
      
        updateCartCount();
        
     
        weightOptions.forEach(option => {
            option.addEventListener('click', () => {
              
                weightOptions.forEach(opt => opt.classList.remove('active'));
             
                option.classList.add('active');
              
                selectedWeight = option.getAttribute('data-weight');
            });
        });
        
   
        addToCartBtn.addEventListener('click', () => {
         
            const product = {
                id: 'countryeggs-001',
                name: 'Country Eggs',
                price: 120,
                weight: selectedWeight,
                quantity: 1,
               image: "../images/dairy des 3.png"
            };
         
            addToCart(product);
            
          
            showNotification();
            
           
            updateCartCount();
        });
        
       
        function addToCart(product) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
           
            const existingProductIndex = cart.findIndex(
                item => item.id === product.id && item.weight === product.weight
            );
            
            if (existingProductIndex !== -1) {
              
                cart[existingProductIndex].quantity += 1;
            } else {
                
                cart.push(product);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        
        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            let totalItems = 0;
            
            cart.forEach(item => {
                totalItems += item.quantity;
            });
            
            cartCount.textContent = totalItems;
        }
        
        function showNotification() {
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
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