let products = [];
let filteredProducts = [];

const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort');

// Simulyasiya olunmuş API çağırışı
async function fetchProducts() {
  // Burada əsl API linkini yerləşdirə bilərsən
  const response = await fetch('https://fakestoreapi.com/products'); 
  const data = await response.json();

  // Sadəcə uyğunlaşdırmaq üçün dəyişirik
  products = data.map(item => ({
    title: item.title,
    description: item.description,
    price: item.price,
    oldPrice: item.price * 1.5,
    image: item.image,
    badge: Math.random() > 0.5 ? "New" : "30%",
    liked: Math.random() > 0.5
  }));

  filteredProducts = [...products];
  renderProducts(filteredProducts);
}

function renderProducts(productArray) {
  productList.innerHTML = '';
  productArray.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';

    if (product.badge) {
      const badge = document.createElement('div');
      badge.className = 'badge';
      badge.textContent = product.badge;
      badge.classList.add(product.badge === 'New' ? 'new' : 'discount');
      card.appendChild(badge);
    }

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = product.liked
    card.appendChild(heart);

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    card.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = product.title;
    card.appendChild(title);

    const desc = document.createElement('div');
    desc.className = 'description';
    desc.textContent = product.description;
    card.appendChild(desc);

    const priceWrapper = document.createElement('div');
    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = `$${product.price.toFixed(2)}`;
    const oldPrice = document.createElement('span');
    oldPrice.className = 'old-price';
    oldPrice.textContent = `From $${product.oldPrice.toFixed(2)}`;
    priceWrapper.appendChild(price);
    priceWrapper.appendChild(oldPrice);
    card.appendChild(priceWrapper);

    const button = document.createElement('button');
    button.className = 'btn';
    button.textContent = 'Add to card';
    card.appendChild(button);

    productList.appendChild(card);
  });
}

// 🔍 Axtarış funksiyası
function handleSearch(query) {
  filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
  applySort();
}

// ↕ Sort funksiyası
function applySort() {
  const sortType = sortSelect.value;
  if (sortType === 'az') {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortType === 'za') {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortType === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  renderProducts(filteredProducts);
}

// 🔘 Event-lər
searchButton.addEventListener('click', () => {
  handleSearch(searchInput.value);
});

searchInput.addEventListener('input', () => {
  handleSearch(searchInput.value);
});

sortSelect.addEventListener('change', () => {
  applySort();
});

// ▶ Start
fetchProducts();
