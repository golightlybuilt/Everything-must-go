// Gumroad checkout link for the Garage Sale & Clearance Kit.
const CHECKOUT_URL = 'https://golightly0.gumroad.com/l/ecxkp';

const productGrid = document.querySelector('#productGrid');
const categoryList = document.querySelector('#categoryList');
const searchInput = document.querySelector('#searchInput');
const emptyState = document.querySelector('#emptyState');
const cartButton = document.querySelector('#cartButton');
const closeCart = document.querySelector('#closeCart');
const cartDrawer = document.querySelector('#cartDrawer');
const cartBackdrop = document.querySelector('#cartBackdrop');
const cartItems = document.querySelector('#cartItems');
const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');

let products = [];
let activeCategory = 'All';
let cart = JSON.parse(localStorage.getItem('emg-cart') || '[]');

const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

async function loadProducts() {
  try {
    const response = await fetch('products.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load inventory');
    products = await response.json();
    renderCategories();
    renderProducts();
    renderCart();
  } catch (error) {
    emptyState.hidden = false;
    emptyState.textContent = 'Inventory could not be loaded. Check that products.json is present.';
  }
}

function renderCategories() {
  const categories = ['All', ...new Set(products.map(product => product.category))];
  categoryList.innerHTML = categories.map(category => `
    <button class="category-button ${category === activeCategory ? 'active' : ''}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>
  `).join('');
}

function visibleProducts() {
  const query = searchInput.value.trim().toLowerCase();
  return products.filter(product => {
    const categoryMatches = activeCategory === 'All' || product.category === activeCategory;
    const text = `${product.name} ${product.description} ${product.category}`.toLowerCase();
    return categoryMatches && (!query || text.includes(query));
  });
}

function renderProducts() {
  const visible = visibleProducts();
  emptyState.hidden = visible.length > 0;
  productGrid.innerHTML = visible.map(product => `
    <article class="product-card">
      <img class="product-image" src="${escapeAttribute(product.image)}" alt="" loading="lazy">
      <div class="product-info">
        <h3>${escapeHtml(product.name)}</h3>
        <p class="product-description">${escapeHtml(product.description)}</p>
        <div class="product-bottom">
          <span class="price">${money(product.price)}</span>
          <button class="add-button" type="button" data-add="${escapeAttribute(product.id)}" ${product.available ? '' : 'disabled'}>
            ${product.available ? 'Add to cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderCart() {
  const items = cart.map(id => products.find(product => product.id === id)).filter(Boolean);
  cartCount.textContent = items.length;
  cartTotal.textContent = money(items.reduce((sum, product) => sum + product.price, 0));
  cartItems.innerHTML = items.length ? items.map(product => `
    <div class="cart-row">
      <img src="${escapeAttribute(product.image)}" alt="">
      <div><strong>${escapeHtml(product.name)}</strong><span>${money(product.price)}</span></div>
      <button class="remove-button" type="button" data-remove="${escapeAttribute(product.id)}">Remove</button>
    </div>
  `).join('') : '<p>Your cart is empty.</p>';

  const checkoutButton = document.querySelector('#checkoutButton');
  if (CHECKOUT_URL) {
    checkoutButton.href = CHECKOUT_URL;
    checkoutButton.textContent = 'Proceed to checkout';
  } else {
    checkoutButton.href = '#checkout';
    checkoutButton.textContent = 'Checkout setup required';
  }
}

function openCart() {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartButton.setAttribute('aria-expanded', 'true');
  cartBackdrop.hidden = false;
  closeCart.focus();
}

function hideCart() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartButton.setAttribute('aria-expanded', 'false');
  cartBackdrop.hidden = true;
  cartButton.focus();
}

categoryList.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderProducts();
});

searchInput.addEventListener('input', renderProducts);

productGrid.addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const product = products.find(item => item.id === button.dataset.add);
  if (!product || !product.available) return;
  cart.push(product.id);
  localStorage.setItem('emg-cart', JSON.stringify(cart));
  renderCart();
  openCart();
});

cartItems.addEventListener('click', event => {
  const button = event.target.closest('[data-remove]');
  if (!button) return;
  const index = cart.indexOf(button.dataset.remove);
  if (index >= 0) cart.splice(index, 1);
  localStorage.setItem('emg-cart', JSON.stringify(cart));
  renderCart();
});

cartButton.addEventListener('click', openCart);
closeCart.addEventListener('click', hideCart);
cartBackdrop.addEventListener('click', hideCart);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && cartDrawer.classList.contains('open')) hideCart();
});

document.querySelector('#year').textContent = new Date().getFullYear();

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[character]);
}
function escapeAttribute(value) { return escapeHtml(value); }

loadProducts();
