// SNEAKER DATABASE
const SNEAKERS = [
  {
    id: 'nike-impact-4',
    name: 'Nike Flyknit Lunar 3 (Bright Crimson)',
    category: 'Running',
    price: 150,
    modelCode: '698181-600',
    rating: '4.7 / 5.0',
    image: 'Nike Flyknit Lunar 3 (Bright Crimson).png',
    colors: [
      { name: 'Volt Lime', hex: '#84cc16' },
      { name: 'Crimson Ember', hex: '#ef4444' },
      { name: 'Hyper Violet', hex: '#a855f7' },
      { name: 'Triple White', hex: '#f8fafc' },
      { name: 'Stealth Black', hex: '#0f172a' }
    ]
  },
  {
    id: 'nike-air-max-solo',
    name: 'Air Jordan 4 Retro (Zen Master)',
    category: 'Basketball / Lifestyle',
    price: 210,
    modelCode: 'DH7138-506',
    rating: '4.8 / 5.0',
    image: 'Air Jordan 4 Retro (Zen Master).png',
    colors: [
      { name: 'Solar Gold', hex: '#eab308' },
      { name: 'Infrared Pulse', hex: '#f97316' },
      { name: 'Pure Platinum', hex: '#e2e8f0' },
      { name: 'Midnight Onyx', hex: '#18181b' }
    ]
  },
  {
    id: 'nike-impact-45',
    name: 'Air Jordan 12 Retro (Reverse Flu Game)',
    category: 'Basketball / Retro',
    price: 190,
    modelCode: 'CT8013-602',
    rating: '4.9 / 5.0',
    image: 'Air Jordan 12 Retro (Reverse Flu Game).png',
    colors: [
      { name: 'Dusty Rose', hex: '#f43f5e' },
      { name: 'Magenta Orbit', hex: '#d946ef' },
      { name: 'Glacier Silver', hex: '#cbd5e1' },
      { name: 'Obsidian Black', hex: '#09090b' }
    ]
  },
  {
    id: 'nike-air-max-intrlk',
    name: 'Air Jordan 4 Retro Off-White (Sail)',
    category: 'High-End Collaboration / Lifestyle',
    price: 200,
    modelCode: 'CV9388-100',
    rating: '4.9 / 5.0',
    image: 'Air Jordan 4 Retro Off-White (Sail).png',
    colors: [
      { name: 'Royal Blue', hex: '#3b82f6' },
      { name: 'Cyan Glow', hex: '#06b6d4' },
      { name: 'Pure White', hex: '#f1f5f9' },
      { name: 'Dark Navy', hex: '#1e293b' }
    ]
  },
  {
    id: 'nike-air-max-1',
    name: 'Nike Air Max 1 Anniversary (Magma Orange)',
    category: 'High-End Collaboration / Lifestyle',
    price: 140,
    modelCode: 'DC1454-101',
    rating: '4.6 / 5.0',
    image: 'Nike Air Max 1 Anniversary (Magma Orange).png',
    colors: [
      { name: 'Monarch Orange', hex: '#d97706' },
      { name: 'Pale Vanilla', hex: '#fef3c7' },
      { name: 'Neutral Gray', hex: '#78716c' },
      { name: 'Anthracite Black', hex: '#1c1917' }
    ]
  },
  {
    id: 'nike-air',
    name: 'Nike Air Zoom Generation QS (SVSM)',
    category: 'Performance Basketball / Retro',
    price: 179,
    modelCode: 'AO2367-100',
    rating: '4.8 / 5.0',
    image: 'Nike Air Zoom Generation QS (SVSM).png',
    colors: [
      { name: 'Triple White', hex: '#f8fafc' },
      { name: 'Slate Gray', hex: '#334155' },
      { name: 'Midnight Navy', hex: '#0f172a' }
    ]
  }
];

// APPLICATION STATE
let currentIndex = 0;
let selectedColorObj = SNEAKERS[0].colors[0];
let selectedSize = 6;
let cartItems = [];
let activeCollectionCategory = 'all';
let activeTopic = 'Order Inquiry';

// INITIALIZE APP
document.addEventListener('DOMContentLoaded', () => {
  renderArcList();
  renderCollections();
  renderOffers();
  renderCurrentShoe();
  updateCartUI();
  startOffersTimer();
  setupScrollListeners();
});

// PAGE SWITCHING
function switchPage(pageId) {
  document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    
    const scrollContent = targetPage.querySelector('.page-scroll-content');
    if (scrollContent) {
      scrollContent.scrollTop = 0;
    }
  }

  const navButton = Array.from(document.querySelectorAll('.nav-item')).find(
    btn => btn.textContent.trim().toLowerCase() === pageId.toLowerCase()
  );
  if (navButton) navButton.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  updateFloatingScrollBtn(pageId);
}

// SETUP SCROLL LISTENERS
function setupScrollListeners() {
  const scrollContainers = document.querySelectorAll('.page-scroll-content');
  scrollContainers.forEach(container => {
    container.addEventListener('scroll', () => {
      const activePage = document.querySelector('.page-view.active');
      if (activePage) {
        const pageId = activePage.id.replace('page-', '');
        updateFloatingScrollBtn(pageId);
      }
    });
  });
}

// UPDATE FLOATING SCROLL BUTTON
function updateFloatingScrollBtn(pageId) {
  const floatingBtn = document.getElementById('floatingScrollBtn');
  const scrollText = document.getElementById('floatingScrollText');
  const scrollIcon = document.getElementById('floatingScrollIcon');
  if (!floatingBtn) return;

  const scrollablePages = ['collections', 'offers', 'contact'];
  if (!scrollablePages.includes(pageId)) {
    floatingBtn.style.display = 'none';
    return;
  }

  const activePage = document.getElementById('page-' + pageId);
  const scrollContent = activePage ? activePage.querySelector('.page-scroll-content') : null;

  if (scrollContent && scrollContent.scrollHeight > scrollContent.clientHeight) {
    floatingBtn.style.display = 'flex';
    const isAtBottom = scrollContent.scrollTop + scrollContent.clientHeight >= scrollContent.scrollHeight - 30;

    if (isAtBottom) {
      if (scrollText) scrollText.textContent = 'Back to top';
      if (scrollIcon) scrollIcon.style.transform = 'rotate(180deg)';
    } else {
      if (scrollText) scrollText.textContent = 'Scroll for details';
      if (scrollIcon) scrollIcon.style.transform = 'rotate(0deg)';
    }
  } else {
    floatingBtn.style.display = 'none';
  }
}

// HANDLE FLOATING SCROLL BUTTON CLICK
function handleFloatingScroll() {
  const activePage = document.querySelector('.page-view.active');
  if (!activePage) return;

  const scrollContent = activePage.querySelector('.page-scroll-content');
  if (!scrollContent) return;

  const isAtBottom = scrollContent.scrollTop + scrollContent.clientHeight >= scrollContent.scrollHeight - 30;

  if (isAtBottom) {
    scrollContent.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    scrollContent.scrollBy({ top: 350, behavior: 'smooth' });
  }
}

function renderCurrentShoe() {
  const shoe = SNEAKERS[currentIndex];
  if (!shoe) return;

  selectedColorObj = shoe.colors[0];
  selectedSize = 6;

  const titleEl = document.getElementById('shoeTitle');
  const priceEl = document.getElementById('shoePrice');
  const codeEl = document.getElementById('modelCode');
  const ratingEl = document.getElementById('ratingVal');

  if (titleEl) titleEl.textContent = shoe.name;
  if (priceEl) priceEl.textContent = '$' + shoe.price.toFixed(2);
  if (codeEl) codeEl.textContent = shoe.modelCode;
  if (ratingEl) ratingEl.textContent = '★ ' + shoe.rating;

  const mainImg = document.getElementById('mainShoeImg');
  const sub1 = document.getElementById('subThumb1');
  const sub2 = document.getElementById('subThumb2');

  // Trigger smooth transition
  if (mainImg) {
    mainImg.classList.add('shoe-changing');
    setTimeout(() => {
      mainImg.src = shoe.image;
      if (sub1) sub1.src = shoe.image;
      if (sub2) sub2.src = shoe.image;
      mainImg.classList.remove('shoe-changing');
    }, 350); // Matches the 0.35s duration in your CSS
  } else {
    if (sub1) sub1.src = shoe.image;
    if (sub2) sub2.src = shoe.image;
  }

  document.querySelectorAll('.size-pill').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === '6');
  });

  const colorPicker = document.getElementById('colorPicker');
  if (colorPicker) {
    colorPicker.innerHTML = '';
    shoe.colors.forEach((col, idx) => {
      const dot = document.createElement('div');
      dot.className = 'color-dot' + (idx === 0 ? ' active' : '');
      dot.style.backgroundColor = col.hex;
      dot.title = col.name;
      dot.onclick = () => {
        document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        selectedColorObj = col;
        const backdrop = document.getElementById('shoeBackdropGlow');
        if (backdrop) backdrop.style.backgroundColor = col.hex;
      };
      colorPicker.appendChild(dot);
    });
  }

  const backdrop = document.getElementById('shoeBackdropGlow');
  if (backdrop) backdrop.style.backgroundColor = selectedColorObj.hex;

  document.querySelectorAll('.arc-item').forEach((item, idx) => {
    item.classList.toggle('active', idx === currentIndex);
  });
}

// SIZE SELECTION
function selectSize(size, el) {
  selectedSize = size;
  document.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
}

// ARC CAROUSEL
function renderArcList() {
  const container = document.getElementById('arcList');
  if (!container) return;
  container.innerHTML = '';
  SNEAKERS.forEach((shoe, idx) => {
    const item = document.createElement('div');
    item.className = 'arc-item' + (idx === 0 ? ' active' : '');
    item.onclick = () => {
      currentIndex = idx;
      renderCurrentShoe();
    };
    item.innerHTML = `<img src="${shoe.image}" alt="${shoe.name}">`;
    container.appendChild(item);
  });
}

function nextShoe() {
  currentIndex = (currentIndex + 1) % SNEAKERS.length;
  renderCurrentShoe();
}

function prevShoe() {
  currentIndex = (currentIndex - 1 + SNEAKERS.length) % SNEAKERS.length;
  renderCurrentShoe();
}

// TOGGLE CART DRAWER
function toggleCart() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (!overlay) return;
  overlay.classList.toggle('open');
  
  const cartStep = document.getElementById('cartViewStep');
  const checkoutStep = document.getElementById('checkoutViewStep');
  const orderStep = document.getElementById('orderSuccessStep');

  if (cartStep) cartStep.style.display = 'block';
  if (checkoutStep) checkoutStep.style.display = 'none';
  if (orderStep) orderStep.style.display = 'none';
}

function closeCart(e) {
  if (e.target.id === 'cartDrawerOverlay') {
    const overlay = document.getElementById('cartDrawerOverlay');
    if (overlay) overlay.classList.remove('open');
  }
}

// BUY CURRENT ITEM
function buyCurrentItem() {
  const shoe = SNEAKERS[currentIndex];
  addToCart(shoe, selectedColorObj, selectedSize);

  const buyBtn = document.getElementById('buyBtn');
  if (buyBtn) {
    buyBtn.innerHTML = '<span>Added!</span>';
    setTimeout(() => {
      buyBtn.innerHTML = '<span>Buy</span>';
      const overlay = document.getElementById('cartDrawerOverlay');
      if (overlay && !overlay.classList.contains('open')) {
        toggleCart();
      }
    }, 400);
  }
}

// ADD TO CART FUNCTION
function addToCart(shoe, color, size) {
  const existingKey = shoe.id + '-' + color.name + '-' + size;
  const existing = cartItems.find(i => i.id === existingKey);

  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({
      id: existingKey,
      sneaker: shoe,
      color: color,
      size: size,
      quantity: 1
    });
  }
  updateCartUI();
}

// UPDATE CART DRAWER UI
function updateCartUI() {
  const totalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = cartItems.reduce((acc, i) => acc + i.sneaker.price * i.quantity, 0);
  const shipping = totalCount > 0 ? (subtotal >= 100 ? 0 : 15.00) : 0;
  const total = subtotal + shipping;

  const countBadge = document.getElementById('cartCount');
  const selectedCount = document.getElementById('cartItemsSelectedCount');
  
  if (countBadge) countBadge.textContent = totalCount;
  if (selectedCount) selectedCount.textContent = totalCount + ' items selected';

  const container = document.getElementById('cartItemsContainer');
  const cartFooter = document.getElementById('cartFooter');

  if (container) {
    if (cartItems.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px 10px;color:rgba(255,255,255,0.4)">
          <p style="font-size:14px;font-weight:600;">Your cart is empty</p>
          <p style="font-size:11px;margin-top:6px;">Select your favorite sneakers to get started.</p>
        </div>
      `;
      if (cartFooter) cartFooter.style.display = 'none';
    } else {
      if (cartFooter) cartFooter.style.display = 'flex';
      container.innerHTML = cartItems.map((item) => `
        <div class="cart-item-card">
          <div class="cart-item-img">
            <img src="${item.sneaker.image}" alt="${item.sneaker.name}" />
          </div>
          <div class="cart-item-info">
            <div class="cart-item-title">${item.sneaker.name}</div>
            <div class="cart-item-meta">
              <span>Size: ${item.size}</span>
              <span>•</span>
              <span class="dot-color" style="background-color:${item.color.hex}"></span>
              <span>${item.color.name}</span>
            </div>
            <div class="cart-item-price">$${(item.sneaker.price * item.quantity).toFixed(2)}</div>
          </div>
          <div class="cart-item-actions">
            <button class="trash-btn" onclick="removeFromCart('${item.id}')" title="Remove">✕</button>
            <div class="qty-pill">
              <button onclick="changeQty('${item.id}', -1)">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button onclick="changeQty('${item.id}', 1)">+</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  const subtotalVal = document.getElementById('cartSubtotalVal');
  const shippingVal = document.getElementById('cartShippingVal');
  const totalVal = document.getElementById('cartTotalVal');
  const checkoutTotalVal = document.getElementById('checkoutTotalVal');

  if (subtotalVal) subtotalVal.textContent = '$' + subtotal.toFixed(2);
  if (shippingVal) shippingVal.textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
  if (totalVal) totalVal.textContent = '$' + total.toFixed(2);
  if (checkoutTotalVal) checkoutTotalVal.textContent = '$' + total.toFixed(2);
}

function changeQty(itemId, delta) {
  const item = cartItems.find(i => i.id === itemId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(itemId);
  } else {
    updateCartUI();
  }
}

function removeFromCart(itemId) {
  cartItems = cartItems.filter(i => i.id !== itemId);
  updateCartUI();
}

// CHECKOUT NAVIGATION & ORDER PLACEMENT
function openCheckout() {
  if (cartItems.length === 0) return;
  const cartStep = document.getElementById('cartViewStep');
  const checkoutStep = document.getElementById('checkoutViewStep');
  if (cartStep) cartStep.style.display = 'none';
  if (checkoutStep) checkoutStep.style.display = 'flex';
}

function backToCart() {
  const checkoutStep = document.getElementById('checkoutViewStep');
  const cartStep = document.getElementById('cartViewStep');
  if (checkoutStep) checkoutStep.style.display = 'none';
  if (cartStep) cartStep.style.display = 'block';
}

function selectPaymentTab(el, type) {
  document.querySelectorAll('.pay-option').forEach(tab => tab.classList.remove('active'));
  if (el) el.classList.add('active');
  const cardFields = document.getElementById('cardFields');
  if (cardFields) cardFields.style.display = type === 'card' ? 'flex' : 'none';
}

function handlePlaceOrder(e) {
  e.preventDefault();
  const nameInput = document.getElementById('custName');
  const name = nameInput ? nameInput.value : 'Customer';
  const subtotal = cartItems.reduce((acc, i) => acc + i.sneaker.price * i.quantity, 0);
  const total = subtotal;

  const btnText = document.getElementById('placeOrderBtnText');
  if (btnText) btnText.textContent = 'Processing...';

  setTimeout(() => {
    if (btnText) btnText.textContent = 'PLACE ORDER';
    
    const checkoutStep = document.getElementById('checkoutViewStep');
    const successStep = document.getElementById('orderSuccessStep');
    if (checkoutStep) checkoutStep.style.display = 'none';
    if (successStep) successStep.style.display = 'flex';

    const orderIdEl = document.getElementById('receiptOrderId');
    const custNameEl = document.getElementById('receiptCustName');
    const totalValEl = document.getElementById('receiptTotalVal');

    if (orderIdEl) orderIdEl.textContent = '#NK-' + Math.floor(100000 + Math.random() * 900000);
    if (custNameEl) custNameEl.textContent = name;
    if (totalValEl) totalValEl.textContent = '$' + total.toFixed(2);

    cartItems = [];
    updateCartUI();
  }, 1000);
}

function finishOrder() {
  toggleCart();
}

// COLLECTIONS PAGE FILTER & ENHANCED RENDER
function filterCollection(category, btnEl) {
  activeCollectionCategory = category;
  document.querySelectorAll('.collection-tab-pill').forEach(t => t.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const filtered = activeCollectionCategory === 'all' 
    ? SNEAKERS 
    : SNEAKERS.filter(s => s.category === activeCollectionCategory);

  const countBadge = document.getElementById('collectionCountBadge');
  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} Model${filtered.length === 1 ? '' : 's'}`;
  }

  renderCollections();
}

function renderCollections() {
  const grid = document.getElementById('collectionsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = activeCollectionCategory === 'all' 
    ? SNEAKERS 
    : SNEAKERS.filter(s => s.category === activeCollectionCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.4); padding: 40px;">No sneakers found in this category.</div>`;
    return;
  }

  filtered.forEach(s => {
    const card = document.createElement('div');
    card.className = 'grid-card';

    card.innerHTML = `
      <div class="card-category-tag">${s.category}</div>
      <div class="card-rating-tag">★ ${s.rating.split(' ')[0]}</div>
      
      <div class="card-image-wrap">
        <img src="${s.image}" alt="${s.name}" />
      </div>

      <h4>${s.name}</h4>

      <div class="card-meta-row">
        <span>${s.modelCode}</span>
        <span style="color:#10b981;font-weight:700;">$${s.price.toFixed(2)}</span>
      </div>

      <div class="card-actions-row">
        <button class="grid-btn" onclick="addToCartFromGrid('${s.id}')">
          Add to Cart
        </button>
        <button class="view-3d-btn" onclick="inspectInShowcase('${s.id}')" title="View 3D Angle">
          3D View
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function inspectInShowcase(shoeId) {
  const idx = SNEAKERS.findIndex(s => s.id === shoeId);
  if (idx !== -1) {
    currentIndex = idx;
    switchPage('home');
    renderCurrentShoe();
  }
}

function addToCartFromGrid(shoeId) {
  const s = SNEAKERS.find(x => x.id === shoeId);
  if (s) {
    addToCart(s, s.colors[0], 6);
    toggleCart();
  }
}

// ENHANCED OFFERS PAGE RENDER
function renderOffers() {
  const grid = document.getElementById('offersGrid');
  if (!grid) return;
  grid.innerHTML = '';

  // Select top 3 sneakers to feature as flash deals
  const featuredOffers = SNEAKERS.slice(0, 3);
  const discountPercentages = [25, 30, 20];
  const stockCounts = [4, 7, 2];

  featuredOffers.forEach((s, idx) => {
    const discount = discountPercentages[idx % discountPercentages.length];
    const discountedPrice = (s.price * ((100 - discount) / 100)).toFixed(2);
    const stockLeft = stockCounts[idx % stockCounts.length];
    const stockPercentage = Math.min((stockLeft / 10) * 100, 100);

    const card = document.createElement('div');
    card.className = 'grid-card offer-card';
    card.innerHTML = `
      <div class="card-discount-tag">SAVE ${discount}%</div>
      <div class="card-image-wrap">
        <img src="${s.image}" alt="${s.name}" />
      </div>
      <h4>${s.name}</h4>
      <div class="offer-pricing">
        <span class="current-price">$${discountedPrice}</span>
        <span class="old-price">$${s.price.toFixed(2)}</span>
      </div>
      <div class="stock-meter">
        <div class="stock-fill" style="width: ${stockPercentage}%"></div>
      </div>
      <span class="stock-text">Only ${stockLeft} pairs left at this price</span>
      <button class="grid-btn offer-claim-btn" onclick="claimOfferDeal('${s.id}', ${discountedPrice})">
        Claim Deal
      </button>
    `;
    grid.appendChild(card);
  });
}

// CLAIM OFFER DEAL WITH DISCOUNTED PRICE
function claimOfferDeal(shoeId, promoPrice) {
  const shoe = SNEAKERS.find(x => x.id === shoeId);
  if (!shoe) return;

  // Create temporary discounted shoe object for cart
  const discountedShoe = {
    ...shoe,
    price: parseFloat(promoPrice)
  };

  addToCart(discountedShoe, shoe.colors[0], 6);
  toggleCart();
}

// LIVE COUNTDOWN TIMER
function startOffersTimer() {
  let duration = 8 * 3600 + 42 * 60 + 19; // 8 hrs 42 mins 19 secs
  const timerInterval = setInterval(() => {
    if (duration <= 0) {
      clearInterval(timerInterval);
      return;
    }
    duration--;
    
    const hrs = Math.floor(duration / 3600);
    const mins = Math.floor((duration % 3600) / 60);
    const secs = duration % 60;

    const hrsEl = document.getElementById('timer-hrs');
    const minEl = document.getElementById('timer-min');
    const secEl = document.getElementById('timer-sec');

    if (hrsEl) hrsEl.textContent = String(hrs).padStart(2, '0');
    if (minEl) minEl.textContent = String(mins).padStart(2, '0');
    if (secEl) secEl.textContent = String(secs).padStart(2, '0');
  }, 1000);
}

// CONTACT TOPIC SELECTOR
function selectContactTopic(chipEl, topic) {
  activeTopic = topic;
  document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
  if (chipEl) chipEl.classList.add('active');
}

// ENHANCED CONTACT FORM SUBMISSION
function handleContactSubmit(e) {
  e.preventDefault();
  const alertEl = document.getElementById('contactSuccessMsg');
  const submitBtn = e.target.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.textContent = 'SENDING...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.textContent = 'SEND MESSAGE';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
    }

    if (alertEl) {
      alertEl.style.display = 'block';
      alertEl.textContent = `Thank you! Your message regarding "${activeTopic}" has been received. Our team will reach out shortly.`;
      setTimeout(() => { 
        alertEl.style.display = 'none'; 
      }, 5000);
    }

    e.target.reset();
  }, 600);
}

// SEARCH FUNCTIONALITY
function handleSearch(query) {
  const clearBtn = document.getElementById('searchClearBtn');
  const dropdown = document.getElementById('searchResultsDropdown');
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    if (clearBtn) clearBtn.style.display = 'none';
    if (dropdown) dropdown.style.display = 'none';
    return;
  }

  if (clearBtn) clearBtn.style.display = 'inline-block';

  const matches = SNEAKERS.filter(s =>
    s.name.toLowerCase().includes(trimmed) ||
    s.modelCode.toLowerCase().includes(trimmed) ||
    s.price.toString().includes(trimmed)
  );

  const firstIndex = SNEAKERS.findIndex(s =>
    s.name.toLowerCase().includes(trimmed) ||
    s.modelCode.toLowerCase().includes(trimmed) ||
    s.price.toString().includes(trimmed)
  );

  if (firstIndex !== -1) {
    currentIndex = firstIndex;
    renderCurrentShoe();
  }

  if (dropdown) {
    dropdown.style.display = 'block';
    if (matches.length === 0) {
      dropdown.innerHTML = `<div class="search-empty">No sneakers found for "${query}"</div>`;
    } else {
      dropdown.innerHTML = `
        <div class="search-dropdown-header">Found ${matches.length} Sneaker${matches.length > 1 ? 's' : ''}</div>
        ${matches.map(s => `
          <button class="search-item" onclick="selectSearchResult('${s.id}')">
            <img class="search-item-img" src="${s.image}" alt="${s.name}" />
            <div class="search-item-info">
              <div class="search-item-title">${s.name}</div>
              <div class="search-item-meta">
                <span>$${s.price.toFixed(2)}</span>
                <span>•</span>
                <span class="search-item-code">${s.modelCode}</span>
              </div>
            </div>
          </button>
        `).join('')}
      `;
    }
  }
}

function handleSearchKey(event) {
  if (event.key === 'Enter') {
    const input = document.getElementById('searchInput');
    const query = input ? input.value.trim().toLowerCase() : '';
    if (!query) return;

    const firstIndex = SNEAKERS.findIndex(s =>
      s.name.toLowerCase().includes(query) ||
      s.modelCode.toLowerCase().includes(query) ||
      s.price.toString().includes(query)
    );

    if (firstIndex !== -1) {
      currentIndex = firstIndex;
      switchPage('home');
      renderCurrentShoe();
      const dropdown = document.getElementById('searchResultsDropdown');
      if (dropdown) dropdown.style.display = 'none';
    }
  }
}

function handleSearchFocus() {
  const input = document.getElementById('searchInput');
  if (input && input.value.trim()) {
    handleSearch(input.value);
  }
}

function selectSearchResult(shoeId) {
  const matchIndex = SNEAKERS.findIndex(s => s.id === shoeId);
  if (matchIndex !== -1) {
    currentIndex = matchIndex;
    switchPage('home');
    renderCurrentShoe();
    const dropdown = document.getElementById('searchResultsDropdown');
    if (dropdown) dropdown.style.display = 'none';
  }
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';
  const dropdown = document.getElementById('searchResultsDropdown');
  if (dropdown) dropdown.style.display = 'none';
}

// CLOSE SEARCH DROPDOWN ON OUTSIDE CLICK
document.addEventListener('click', (e) => {
  const container = document.querySelector('.search-container');
  if (container && !container.contains(e.target)) {
    const dropdown = document.getElementById('searchResultsDropdown');
    if (dropdown) dropdown.style.display = 'none';
  }
});

// EXPORT TO WINDOW SCOPE
window.switchPage = switchPage;
window.selectSize = selectSize;
window.nextShoe = nextShoe;
window.prevShoe = prevShoe;
window.toggleCart = toggleCart;
window.closeCart = closeCart;
window.buyCurrentItem = buyCurrentItem;
window.addToCart = addToCart;
window.addToCartFromGrid = addToCartFromGrid;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;
window.openCheckout = openCheckout;
window.backToCart = backToCart;
window.selectPaymentTab = selectPaymentTab;
window.handlePlaceOrder = handlePlaceOrder;
window.finishOrder = finishOrder;
window.filterCollection = filterCollection;
window.inspectInShowcase = inspectInShowcase;
window.selectContactTopic = selectContactTopic;
window.handleContactSubmit = handleContactSubmit;
window.handleSearch = handleSearch;
window.handleSearchKey = handleSearchKey;
window.handleSearchFocus = handleSearchFocus;
window.selectSearchResult = selectSearchResult;
window.clearSearch = clearSearch;
window.handleFloatingScroll = handleFloatingScroll;
window.claimOfferDeal = claimOfferDeal;