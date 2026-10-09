/* ============ APNA STORE — Shared UI components ============ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const param = n => new URLSearchParams(location.search).get(n);
const catOf = id => CATEGORIES.find(c => c.id === id);
const gradCss = c => `linear-gradient(135deg, ${c[0]}, ${c[1]})`;

/* ---------- stars ---------- */
function stars(rating) {
  const full = Math.round(rating);
  return `<span class="p-stars">${"★".repeat(full)}${"☆".repeat(5 - full)}</span>`;
}

/* ---------- product card ---------- */
function productCard(p, opts = {}) {
  const inWish = Store.wishHas(p.id);
  const off = p.discount ? `<span class="p-flag">-${p.discount}%</span>` : (p.newArrival ? `<span class="p-flag new">NEW</span>` : "");
  const list = opts.listView ? " list-view" : "";
  return `
  <article class="p-card${list}" data-id="${p.id}">
    <a class="p-media" style="background:${gradCss(catOf(p.category).grad)}" href="product.html?slug=${p.slug}" aria-label="${escapeHtml(p.name)}">
      <span class="p-emoji">${p.images[0]}</span>
      ${off}
      <span class="p-quick" data-quick="${p.id}" role="button" tabindex="0">Quick View</span>
    </a>
    <button class="p-wish ${inWish ? "active" : ""}" data-wish="${p.id}" aria-label="Toggle wishlist" aria-pressed="${inWish}">
      <svg viewBox="0 0 24 24"><path d="M12 21C7 16.6 3 13.3 3 9.2 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 0.9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.2 0 4.1-4 7.4-9 11.8z"/></svg>
    </button>
    <div class="p-body">
      <span class="p-cat">${catOf(p.category).name}</span>
      <h3 class="p-name"><a href="product.html?slug=${p.slug}">${escapeHtml(p.name)}</a></h3>
      <div class="p-rating">${stars(p.rating)} <span>${p.rating} (${p.reviews})</span></div>
      <div class="p-prices">
        <span class="p-price">${money(Store.effPrice(p))}</span>
        ${p.salePrice ? `<span class="p-old">${money(p.price)}</span>` : ""}
      </div>
      <button class="btn btn-primary btn-sm p-add" data-add="${p.id}">Add to Cart</button>
    </div>
  </article>`;
}

/* ---------- toasts ---------- */
function toast(msg, type = "") {
  const wrap = $("#toastWrap"); if (!wrap) return;
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${type === "success" ? "✓" : type === "error" ? "!" : "🛒"}</span>${escapeHtml(msg)}`;
  wrap.appendChild(t);
  setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 320); }, 2600);
}

/* ---------- badges ---------- */
function refreshBadges(popCart) {
  const c = $("#cartCount"), w = $("#wishCount");
  if (c) { c.textContent = Store.cartCount(); c.classList.toggle("hidden", Store.cartCount() === 0); if (popCart) { c.classList.add("pop"); setTimeout(() => c.classList.remove("pop"), 400); } }
  if (w) { const n = JSON.parse(localStorage.getItem("apna_wishlist") || "[]").length; w.textContent = n; w.classList.toggle("hidden", n === 0); }
  $$(".bottom-nav .badge-count").forEach(b => { if (b.dataset.kind === "cart") { b.textContent = Store.cartCount(); b.classList.toggle("hidden", Store.cartCount() === 0); } if (b.dataset.kind === "wish") { const n = JSON.parse(localStorage.getItem("apna_wishlist") || "[]").length; b.textContent = n; b.classList.toggle("hidden", n === 0); } });
}

/* ---------- header / footer chrome ---------- */
const NAV = [
  ["index.html", "Home", "home"], ["shop.html", "Shop", "shop"], ["categories.html", "Categories", "categories"],
  ["shop.html?filter=new", "New Arrivals", ""], ["shop.html?filter=best", "Best Sellers", ""],
  ["shop.html?filter=sale", "SALE", "sale-sale"], ["about.html", "About", ""], ["contact.html", "Contact", ""],
];
function renderChrome() {
  const active = document.body.dataset.page || "";
  const u = Store.currentUser();
  $("#chromeHeader").innerHTML = `
  <div class="announce">Free Shipping on Orders Over $50 &nbsp;|&nbsp; Secure Payments &nbsp;|&nbsp; Easy Returns</div>
  <header class="site-header">
    <div class="header-main container">
      <button class="icon-btn menu-btn" data-nav-open aria-label="Open menu"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      <a class="logo" href="index.html" aria-label="APNA STORE home">
        <span class="logo-mark">A</span><span class="logo-word">APNA<b>STORE</b></span>
      </a>
      <form class="search" id="searchForm" role="search" autocomplete="off">
        <input id="searchInput" type="search" placeholder="Search products, categories and brands..." aria-label="Search">
        <button type="submit" aria-label="Search"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></button>
        <div class="suggestions" id="suggestions" role="listbox"></div>
      </form>
      <div class="header-actions">
        <a class="icon-btn hide-m" href="${u ? "account.html" : "login.html"}" aria-label="Account"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></a>
        <a class="icon-btn" href="wishlist.html" aria-label="Wishlist"><svg viewBox="0 0 24 24"><path d="M12 21C7 16.6 3 13.3 3 9.2 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.2 0 4.1-4 7.4-9 11.8z"/></svg><span class="badge-count hidden" id="wishCount">0</span></a>
        <button class="icon-btn" id="cartBtn" aria-label="Open cart"><svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.7"/><circle cx="17" cy="20" r="1.7"/><path d="M2 3h3l2.6 12.2a1.6 1.6 0 0 0 1.6 1.3h8.9a1.6 1.6 0 0 0 1.6-1.2L21.5 8H6"/></svg><span class="badge-count hidden" id="cartCount">0</span></button>
      </div>
    </div>
    <nav class="main-nav" aria-label="Main">
      <div class="container nav-row">
        ${NAV.map(([href, label, key]) => `<a class="nav-link ${active.startsWith(key) && key ? "active" : ""} ${label === "SALE" ? "sale" : ""}" href="${href}">${label}</a>`).join("")}
      </div>
    </nav>
  </header>
  <div class="drawer-backdrop" id="navBackdrop"></div>
  <aside class="drawer" id="mobileDrawer" aria-label="Mobile menu">
    <div class="drawer-head">
      <a class="logo" href="index.html"><span class="logo-mark">A</span><span class="logo-word">APNA<b>STORE</b></span></a>
      <button class="icon-btn" data-nav-close aria-label="Close menu">✕</button>
    </div>
    <form class="search" id="drawerSearch" role="search"><input type="search" placeholder="Search products..." aria-label="Search"></form>
    ${NAV.map(([href, label]) => `<a class="drawer-link ${label === "SALE" ? "sale" : ""}" href="${href}">${label} <span>→</span></a>`).join("")}
    <hr>
    <a class="drawer-link" href="wishlist.html">Wishlist <span>→</span></a>
    <a class="drawer-link" href="track.html">Order Tracking <span>→</span></a>
    <a class="drawer-link" href="${u ? "account.html" : "login.html"}">${u ? "My Account" : "Login / Register"} <span>→</span></a>
  </aside>
  <nav class="bottom-nav" aria-label="Mobile">
    <a href="index.html" class="${active === "home" ? "active" : ""}"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>Home</a>
    <a href="categories.html" class="${active === "categories" ? "active" : ""}"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/></svg>Categories</a>
    <a href="shop.html" class="${active === "shop" ? "active" : ""}"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>Search</a>
    <a href="wishlist.html" class="${active === "wishlist" ? "active" : ""}"><svg viewBox="0 0 24 24"><path d="M12 21C7 16.6 3 13.3 3 9.2 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.2 0 4.1-4 7.4-9 11.8z"/></svg>Wishlist<span class="badge-count hidden" data-kind="wish">0</span></a>
    <a href="cart.html" class="${active === "cart" ? "active" : ""}"><svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.7"/><circle cx="17" cy="20" r="1.7"/><path d="M2 3h3l2.6 12.2a1.6 1.6 0 0 0 1.6 1.3h8.9a1.6 1.6 0 0 0 1.6-1.2L21.5 8H6"/></svg>Cart<span class="badge-count hidden" data-kind="cart">0</span></a>
  </nav>`;

  $("#chromeFooter").innerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="logo" href="index.html"><span class="logo-mark">A</span><span class="logo-word">APNA<b>STORE</b></span></a>
          <p>Premium products, honest prices and a checkout you can trust. Everything you need — all in one place.</p>
        </div>
        <div class="footer-col"><h5>Shop</h5>
          <a href="shop.html?filter=new">New Arrivals</a><a href="shop.html?filter=best">Best Sellers</a><a href="shop.html?filter=sale">Deals</a><a href="categories.html">Categories</a>
        </div>
        <div class="footer-col"><h5>Customer Service</h5>
          <a href="contact.html">Contact Us</a><a href="faq.html">FAQ</a><a href="shipping.html">Shipping</a><a href="shipping.html#returns">Returns</a><a href="track.html">Order Tracking</a>
        </div>
        <div class="footer-col"><h5>Company</h5>
          <a href="about.html">About Us</a><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a>
        </div>
        <div class="footer-col"><h5>Follow Us</h5>
          <div class="social-row">
            <a href="#" aria-label="Facebook" onclick="return false"><svg viewBox="0 0 24 24"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V5.1C16.1 5 15.2 5 14.2 5c-2 0-3.4 1.2-3.4 3.6V11H8.4v3h2.4v7h2.7z"/></svg></a>
            <a href="#" aria-label="Instagram" onclick="return false"><svg viewBox="0 0 24 24"><path d="M12 7.4A4.6 4.6 0 1 0 16.6 12 4.6 4.6 0 0 0 12 7.4zm0 7.6a3 3 0 1 1 3-3 3 3 0 0 1-3 3zM17 5.5a1.2 1.2 0 1 0 1.2 1.2A1.2 1.2 0 0 0 17 5.5zM16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3zm2.9 13.5a2.9 2.9 0 0 1-2.9 2.9h-9a2.9 2.9 0 0 1-2.9-2.9v-9a2.9 2.9 0 0 1 2.9-2.9h9a2.9 2.9 0 0 1 2.9 2.9z"/></svg></a>
            <a href="#" aria-label="TikTok" onclick="return false"><svg viewBox="0 0 24 24"><path d="M16.6 3c.3 2 1.6 3.5 3.9 3.7v2.8c-1.5 0-2.9-.5-3.9-1.3v5.7a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1v2.9a3 3 0 1 0 2 2.8V3h2.9z"/></svg></a>
            <a href="#" aria-label="YouTube" onclick="return false"><svg viewBox="0 0 24 24"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z"/></svg></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 APNA STORE. All Rights Reserved.</span>
        <div class="pay-badges"><span class="pay-chip">VISA</span><span class="pay-chip">MASTERCARD</span><span class="pay-chip">PAYPAL</span><span class="pay-chip">APPLE PAY</span><span class="pay-chip">G PAY</span></div>
      </div>
    </div>
  </footer>
  <div class="cart-backdrop" id="cartBackdrop"></div>
  <aside class="cart-drawer" id="cartDrawer" aria-label="Cart">
    <div class="cd-head"><h3>Added to your cart</h3><button class="icon-btn" data-cart-close aria-label="Close cart">✕</button></div>
    <div class="cd-body" id="cdBody"></div>
    <div class="cd-foot">
      <div class="cd-total"><span>Subtotal</span><span id="cdTotal">$0.00</span></div>
      <div class="cd-actions"><a class="btn btn-ghost" href="cart.html">VIEW CART</a><a class="btn btn-primary" href="checkout.html">CHECKOUT</a></div>
      <a class="cd-continue" href="shop.html" data-cart-close>Continue shopping</a>
    </div>
  </aside>
  <div class="modal-backdrop" id="qvBackdrop"><div class="qv" id="qvModal" role="dialog" aria-modal="true"></div></div>
  <div class="toast-wrap" id="toastWrap"></div>`;

  bindChrome();
  refreshBadges();
}

function bindChrome() {
  const drawer = $("#mobileDrawer"), backdrop = $("#navBackdrop");
  $$("[data-nav-open]").forEach(b => b.onclick = () => { drawer.classList.add("open"); backdrop.classList.add("show"); });
  $$("[data-nav-close]").forEach(b => b.onclick = closeNav);
  backdrop.onclick = closeNav;
  function closeNav() { drawer.classList.remove("open"); backdrop.classList.remove("show"); }

  const cd = $("#cartDrawer"), cback = $("#cartBackdrop");
  $("#cartBtn").onclick = () => { renderCartDrawer(); cd.classList.add("open"); cback.classList.add("show"); };
  $$("[data-cart-close]").forEach(b => b.onclick = () => { cd.classList.remove("open"); cback.classList.remove("show"); });
  cback.onclick = () => { cd.classList.remove("open"); cback.classList.remove("show"); };

  // search (header + drawer)
  const bindSearch = (formId, inputId, suggId) => {
    const form = $(formId); if (!form) return;
    const input = $(inputId), sugg = $(suggId);
    if (sugg) {
      input.addEventListener("input", () => liveSearch(input.value, sugg));
      input.addEventListener("blur", () => setTimeout(() => sugg.classList.remove("open"), 180));
    }
    form.onsubmit = e => { e.preventDefault(); if (!input.value.trim()) return; sugg && sugg.classList.remove("open"); location.href = "search.html?q=" + encodeURIComponent(input.value.trim()); };
  };
  bindSearch("#searchForm", "#searchInput", "#suggestions");
  bindSearch("#drawerSearch", "#drawerSearch input", null);

  document.addEventListener("click", e => {
    const add = e.target.closest("[data-add]");
    if (add) {
      const p = Store.byId(add.dataset.add);
      Store.cartAdd(p.id, 1, { color: p.colors[0], size: p.sizes[0] });
      refreshBadges(true);
      toast("Product added to your cart.", "success");
      renderCartDrawer(p);
      $("#cartDrawer").classList.add("open"); $("#cartBackdrop").classList.add("show");
      return;
    }
    const wish = e.target.closest("[data-wish]");
    if (wish) {
      const id = +wish.dataset.wish;
      const on = Store.wishToggle(id);
      $$(`[data-wish="${id}"]`).forEach(b => { b.classList.toggle("active", on); b.setAttribute("aria-pressed", on); });
      refreshBadges();
      toast(on ? "Added to wishlist ♥" : "Removed from wishlist");
      if (document.body.dataset.page === "wishlist") renderWishlistPage();
      return;
    }
    const quick = e.target.closest("[data-quick]");
    if (quick) { e.preventDefault(); e.stopPropagation(); openQuickView(Store.byId(quick.dataset.quick)); }
  });
}

/* ---------- live search suggestions ---------- */
function liveSearch(q, box) {
  q = q.trim().toLowerCase();
  if (q.length < 2) { box.classList.remove("open"); return; }
  const prods = Store.products().filter(p => (p.name + " " + p.brand + " " + p.subcategory + " " + catOf(p.category).name).toLowerCase().includes(q)).slice(0, 5);
  const cats = CATEGORIES.filter(c => c.name.toLowerCase().includes(q));
  const words = new Set();
  prods.forEach(p => p.name.split(" ").concat([p.brand]).forEach(w => { if (w.toLowerCase().includes(q) && w.length > 2) words.add(w); }));
  if (!prods.length && !cats.length && !words.size) { box.classList.remove("open"); return; }
  box.innerHTML = `
    ${cats.length ? `<div class="sg-group">Categories</div>` + cats.map(c => `<div class="sg-item" data-go="categories.html"><span class="sg-emoji" style="background:${gradCss(c.grad)}">${c.icon}</span><span class="sg-name">${c.name}</span></div>`).join("") : ""}
    ${words.size ? `<div class="sg-group">Suggestions</div>` + [...words].slice(0, 4).map(w => `<div class="sg-item" data-go="search.html?q=${encodeURIComponent(w)}"><span class="sg-emoji" style="background:var(--gray)">🔍</span><span class="sg-name">${escapeHtml(w)}</span></div>`).join("") : ""}
    ${prods.length ? `<div class="sg-group">Products</div>` + prods.map(p => `<div class="sg-item" data-go="product.html?slug=${p.slug}"><span class="sg-emoji" style="background:${gradCss(catOf(p.category).grad)}">${p.images[0]}</span><span><span class="sg-name">${escapeHtml(p.name)}</span><br><span class="sg-meta">${catOf(p.category).name}</span></span><span class="sg-price">${money(Store.effPrice(p))}</span></div>`).join("") : ""}`;
  box.classList.add("open");
  $$(".sg-item", box).forEach(i => i.onclick = () => { box.classList.remove("open"); location.href = i.dataset.go; });
}

/* ---------- cart drawer ---------- */
function renderCartDrawer(highlight) {
  const body = $("#cdBody"); if (!body) return;
  const lines = Store.cartLines();
  $("#cdTotal").textContent = money(Store.cartTotals(Store.getPromo()?.pct || 0).subtotal);
  if (!lines.length) {
    body.innerHTML = `<div class="cd-empty"><div class="empty-emoji">🛒</div><p>Your cart is empty.</p><a class="btn btn-primary btn-sm" href="shop.html">START SHOPPING</a></div>`;
    return;
  }
  body.innerHTML = lines.map(l => `
    <div class="cd-item" data-key="${l.key}">
      <span class="cd-thumb" style="background:${gradCss(catOf(l.product.category).grad)}">${l.product.images[0]}</span>
      <div class="cd-info">
        <div class="n">${escapeHtml(l.product.name)}</div>
        <div class="p">${money(Store.effPrice(l.product))} × ${l.qty}</div>
        <div class="cd-qty"><button data-d="-1" aria-label="Decrease">−</button><span>${l.qty}</span><button data-d="1" aria-label="Increase">+</button></div>
      </div>
      <button class="cd-remove" aria-label="Remove">✕</button>
    </div>`).join("");
  $$("[data-d]", body).forEach(b => b.onclick = () => { Store.cartQty(b.closest("[data-key]").dataset.key, +b.dataset.d); refreshBadges(); renderCartDrawer(); });
  $$("[data-key] .cd-remove", body).forEach(b => b.onclick = () => { Store.cartRemove(b.closest("[data-key]").dataset.key); refreshBadges(); renderCartDrawer(); if (document.body.dataset.page === "cart") renderCartPage(); });
  if (highlight) {
    const p = Store.byId(highlight.id ?? highlight);
    const first = $(".cd-item", body);
    if (first && p && first.textContent.includes(p.name.split(" ")[0])) { first.style.background = "#F4F8FE"; setTimeout(() => first.style.background = "", 900); }
  }
}

/* ---------- quick view ---------- */
function openQuickView(p) {
  const modal = $("#qvModal"), back = $("#qvBackdrop");
  const inWish = Store.wishHas(p.id);
  let color = p.colors[0], size = p.sizes[0], qty = 1, img = 0;
  modal.innerHTML = `
    <button class="qv-close" aria-label="Close">✕</button>
    <div class="qv-grid">
      <div>
        <div class="qv-media" id="qvMedia" style="background:${gradCss(catOf(p.category).grad)}">${p.images[0]}</div>
        <div class="qv-thumbs">${p.images.map((e, i) => `<div class="qv-thumb ${i === 0 ? "active" : ""}" data-i="${i}" style="background:${gradCss(catOf(p.category).grad)}">${e === "chrono" ? "⏱️" : e}</div>`).join("")}</div>
      </div>
      <div>
        <span class="p-cat">${catOf(p.category).name} · ${escapeHtml(p.brand)}</span>
        <h2>${escapeHtml(p.name)}</h2>
        <div class="p-rating">${stars(p.rating)} <span>${p.rating} · ${p.reviews} reviews</span></div>
        <div class="pd-price-row"><span class="pd-price">${money(Store.effPrice(p))}</span>${p.salePrice ? `<span class="pd-old">${money(p.price)}</span><span class="pd-save">Save ${p.discount}%</span>` : ""}</div>
        <div class="${p.stock < 20 ? "stock-low" : "stock-ok"}">${p.stock < 20 ? `Only ${p.stock} left in stock` : `In stock · ${p.stock} available`}</div>
        <div class="opt-lbl">COLOR</div><div class="chip-row" id="qvColors">${p.colors.map((c, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-v="${c}">${c}</button>`).join("")}</div>
        <div class="opt-lbl">SIZE</div><div class="chip-row" id="qvSizes">${p.sizes.map((s, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-v="${s}">${s}</button>`).join("")}</div>
        <div class="qty-row"><span class="opt-lbl" style="margin:0">QTY</span>
          <div class="qty-ctl"><button id="qvMinus">−</button><input id="qvQty" value="1" readonly aria-label="Quantity"><button id="qvPlus">+</button></div></div>
        <div class="qv-actions">
          <button class="btn btn-primary" id="qvAdd">ADD TO CART</button>
          <button class="btn btn-navy" id="qvBuy">BUY NOW</button>
        </div>
        <button class="btn btn-ghost btn-block" id="qvWish" style="margin-top:10px">${inWish ? "♥ In Wishlist" : "♡ Add to Wishlist"}</button>
      </div>
    </div>`;
  back.classList.add("show");
  $(".qv-close", modal).onclick = () => back.classList.remove("show");
  back.onclick = e => { if (e.target === back) back.classList.remove("show"); };
  $$(".qv-thumb", modal).forEach(t => t.onclick = () => { img = +t.dataset.i; $("#qvMedia").innerHTML = p.images[img] === "chrono" ? "⏱️" : p.images[img]; $$(".qv-thumb", modal).forEach(x => x.classList.remove("active")); t.classList.add("active"); });
  const pick = (rowSel, set) => $$(rowSel + " .chip", modal).forEach(c => c.onclick = () => { $$(rowSel + " .chip", modal).forEach(x => x.classList.remove("active")); c.classList.add("active"); set(c.dataset.v); });
  pick("#qvColors", v => color = v); pick("#qvSizes", v => size = v);
  $("#qvMinus").onclick = () => { qty = Math.max(1, qty - 1); $("#qvQty").value = qty; };
  $("#qvPlus").onclick = () => { qty = Math.min(p.stock, qty + 1); $("#qvQty").value = qty; };
  const add = () => { Store.cartAdd(p.id, qty, { color, size }); refreshBadges(true); toast("Product added to your cart.", "success"); back.classList.remove("show"); renderCartDrawer({ id: p.id }); $("#cartDrawer").classList.add("open"); $("#cartBackdrop").classList.add("show"); };
  $("#qvAdd").onclick = add;
  $("#qvBuy").onclick = () => { Store.cartAdd(p.id, qty, { color, size }); refreshBadges(); back.classList.remove("show"); location.href = "checkout.html"; };
  $("#qvWish").onclick = () => { const on = Store.wishToggle(p.id); $("#qvWish").textContent = on ? "♥ In Wishlist" : "♡ Add to Wishlist"; refreshBadges(); toast(on ? "Added to wishlist ♥" : "Removed from wishlist"); };
}

/* ---------- reveal on scroll ---------- */
function initReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .12 });
  $$(".reveal").forEach(el => io.observe(el));
}

/* ---------- skeleton helper ---------- */
function skeletonGrid(sel, n = 8) {
  const el = $(sel); if (!el) return;
  el.innerHTML = Array(n).fill('<div class="skel"></div>').join("");
}
function clearSkeleton(sel, html) {
  const el = $(sel); if (!el) return;
  setTimeout(() => { el.innerHTML = html; initReveal(); }, 350);
}
