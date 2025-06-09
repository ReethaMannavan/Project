const products = [
  {
    name: "Organic Tomatoes",
    price: 80,
    image: "../images/fruits cate 1.png",
    rating: 5,
  },
   {
    name: "Apple",
    price: 100,
    image: "../images/fruits cate 2.png",
    rating: 5,
  },
   {
    name: "Bananas",
    price: 150,
    image: "../images/fruits cate 3.png",
    rating: 5,
  },
   {
    name: "Organic Tomatoes",
    price: 200,
    image: "../images/fruits cate 4.png",
    rating: 5,
  },
   {
    name: "Organic Tomatoes",
    price: 80,
    image: "../images/fruits cate 5.png",
    rating: 5,
  },
    {
    name: "Organic Tomatoes",
    price: 80,
    image: "../images/fruits cate 6.png",
    rating: 5,
  },
    {
    name: "Organic Tomatoes",
    price: 80,
    image: "../images/fruits cate 7.png",
    rating: 5,
  },
    {
    name: "Organic Tomatoes",
    price: 80,
    image: "../images/fruits cate 8.png",
    rating: 5,
  },
];

const imageHtml = p.hasDetailPage
  ? `<a href="product-detail.html?index=${index}"><img src="${p.image}" alt="${p.name}" /></a>`
  : `<img src="${p.image}" alt="${p.name}" />`;

const titleHtml = p.hasDetailPage
  ? `<a href="product-detail.html?index=${index}" class="product-title">${p.name}</a>`
  : `<div class="product-title">${p.name}</div>`;





function getStarImages(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += `<img src="../images/star icon.png" alt="★" width="35"/>`;
    } else {
      stars += `<img src="images/star-empty.png" alt="☆" width="35"/>`;
    }
  }
  return stars;
}

const productList = document.getElementById('productRow');
const priceRange = document.getElementById('priceRange');
const priceLabel = document.getElementById('priceLabel');


let maxPrice = priceRange.value;


function displayProducts(productsToShow) {

 

  const row = document.getElementById("productRow");

    row.innerHTML = '';

  if (productsToShow.length === 0) {
    productList.innerHTML = '<p>No products found in this price range.</p>';
    return;
  }

  

  productsToShow.forEach((p, index) => {
    const stars = getStarImages(p.rating);
    const col = document.createElement("div");
    col.className = "col-lg-4";
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
  cart.push(products[index]);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${products[index].name} added to cart!`);
}




// -------------filter----------------

// function filterByPrice() {
//   maxPrice = parseInt(priceRange.value);
//   priceLabel.textContent = `₹0 - ₹${maxPrice}`;
//   const filteredprice = products.filter(p => p.price <= maxPrice);
//  displayProducts(filteredprice);
// }

function filterByPrice() {
  applyFiltersAndSort(); // combined logic
}

priceRange.addEventListener('input', filterByPrice);


displayProducts(products);

// window.onload = function () {
//   displayProducts(products);
//   const range = document.getElementById('priceRange');
//   range.addEventListener('input', () => {
//     filterByPrice(parseInt(range.value));
//   });
// };

window.onload = function () {
  applyFiltersAndSort();
};


const sortBy = document.getElementById('sortBy');

sortBy.addEventListener('change', () => {
  applyFiltersAndSort();
});

function applyFiltersAndSort() {
  maxPrice = parseInt(priceRange.value);
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
      // leave the order as is (original)
      break;
  }

applyFiltersAndSort();
}





