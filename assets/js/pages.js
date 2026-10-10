/* ============ APNA STORE — Page renderers (فارسی) ============ */
document.body.classList.add("page-enter");

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  const page = document.body.dataset.page;
  const dispatch = { home: renderHome, categories: renderCategories, shop: renderShop, search: renderSearch,
     product: renderProduct, cart: renderCartPage, checkout: renderCheckout, wishlist: renderWishlistPage,
     account: renderAccount, login: initAuth, register: initAuth, track: initTrack };
  (dispatch[page] || window.renderAdmin || (() => {}))();
  initReveal();
});

/* ================= HOME ================= */
function renderHome() {
  const P = Store.products();
  // categories
  $("#homeCats").innerHTML = CATEGORIES.map(c => `
    <a class="cat-card reveal" href="shop.html?cat=${c.slug}">
      <div class="cat-art" style="background:${gradCss(c.grad)}">${c.icon}</div>
      <div class="cat-body">
        <div class="cat-ico">${c.icon}</div>
        <div class="cat-name">${c.name}</div>
        <div class="cat-count">${faNum(P.filter(p => p.category === c.id).length)} محصول</div>
        <span class="cat-shop">خرید کنید ←</span>
      </div>
    </a>`).join("");
  // featured tabs
  const tabs = [["all", "همه"], ...CATEGORIES.slice(0, 5).map(c => [c.id, c.name])];
  $("#featTabs").innerHTML = tabs.map(([id, n], i) => `<button class="tab ${i === 0 ? "active" : ""}" data-tab="${id}">${n}</button>`).join("");
  const renderFeat = cat => {
    const list = (cat === "all" ? P.filter(p => p.featured) : P.filter(p => p.category === cat && p.featured).concat(P.filter(p => p.category === cat && !p.featured))).slice(0, 8);
    $("#featGrid").innerHTML = list.map(p => productCard(p)).join("");
  };
  renderFeat("all");
  $$("#featTabs .tab").forEach(t => t.onclick = () => {
    $$("#featTabs .tab").forEach(x => x.classList.remove("active")); t.classList.add("active"); renderFeat(t.dataset.tab);
  });
  // flash sale
  const flash = P.filter(p => p.flash);
  $("#flashGrid").innerHTML = flash.map(p => `
    <div class="f-card">
      <div class="f-media" style="background:${gradCss(catOf(p.category).grad)}">${p.images[0]}<span class="f-off">-${faNum(p.discount)}٪</span></div>
      <div class="f-name">${escapeHtml(p.name)}</div>
      <div class="f-prices"><span class="f-price">${money(Store.effPrice(p))}</span><span class="f-old">${money(p.price)}</span></div>
      <div class="stock-bar"><div class="stock-fill" style="width:${Math.max(8, 100 - p.stock * 2)}%"></div></div>
      <div class="stock-txt">فقط ${faNum(p.stock)} عدد باقی مانده</div>
      <button class="btn btn-primary btn-sm" data-add="${p.id}">افزودن به سبد</button>
    </div>`).join("");
  // countdown to next midnight
  const tick = () => {
    const now = new Date(); const end = new Date(now); end.setHours(23, 59, 59, 999);
    let s = Math.max(0, Math.floor((end - now) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); const sec = s % 60;
    [["cdD", d], ["cdH", h], ["cdM", m], ["cdS", sec]].forEach(([id, v]) => { const el = $("#" + id); if (el) el.textContent = faNum(String(v).padStart(2, "0")); });
  };
  tick(); setInterval(tick, 1000);
  // new arrivals
  $("#newGrid").innerHTML = P.filter(p => p.newArrival).slice(0, 8).map(p => productCard(p)).join("");
  // best sellers
  $("#bestRow").innerHTML = P.filter(p => p.bestSeller).sort((a, b) => (a.rank || 9) - (b.rank || 9)).slice(0, 3).map((p, i) => `
    <div class="bs-card reveal">
      <span class="bs-rank">#${faNum(i + 1)}</span>
      <a class="bs-media" style="background:${gradCss(catOf(p.category).grad)}" href="product.html?slug=${p.slug}">${p.images[0]}</a>
      <div style="flex:1">
        <span class="p-cat">${catOf(p.category).name}</span>
        <h3 class="p-name" style="margin:2px 0 4px"><a href="product.html?slug=${p.slug}">${escapeHtml(p.name)}</a></h3>
        <div class="p-rating">${stars(p.rating)} <span>${faNum(p.reviews)} نظر</span></div>
        <div class="p-prices"><span class="p-price">${money(Store.effPrice(p))}</span>${p.salePrice ? `<span class="p-old">${money(p.price)}</span>` : ""}</div>
        <button class="btn btn-primary btn-sm" style="margin-top:10px" data-add="${p.id}">افزودن به سبد</button>
      </div>
    </div>`).join("");
  // newsletter
  const nf = $("#newsForm");
  nf.onsubmit = e => {
    e.preventDefault();
    const em = $("#newsEmail"), msg = $("#newsMsg");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) { msg.textContent = "لطفاً یک ایمیل معتبر وارد کنید."; msg.className = "news-msg bad"; return; }
    msg.textContent = "شما عضو شدید! کد تخفیف ۱۰٪ را در ایمیل خود بررسی کنید."; msg.className = "news-msg ok";
    em.value = ""; toast("عضویت انجام شد — کد تخفیف ۱۰٪ فعال شد!", "success");
  };
}

/* ================= CATEGORIES PAGE ================= */
function renderCategories() {
  const P = Store.products();
  $("#catGrid").innerHTML = CATEGORIES.map(c => `
    <a class="cat-card reveal" href="shop.html?cat=${c.slug}">
      <div class="cat-art" style="background:${gradCss(c.grad)};height:150px;font-size:64px">${c.icon}</div>
      <div class="cat-body">
        <div class="cat-ico">${c.icon}</div>
        <div class="cat-name">${c.name}</div>
        <div class="cat-count">${faNum(P.filter(p => p.category === c.id).length)} محصول</div>
        <p style="font-size:12px;color:var(--muted);margin-top:6px">${c.desc}</p>
        <span class="cat-shop">خرید کنید ←</span>
      </div>
    </a>`).join("");
}

/* ================= SHOP ================= */
function renderShop() {
  const P = Store.products();
  const urlCat = param("cat"), urlQ = param("q"), urlFilter = param("filter");
  const state = { cats: urlCat ? [urlCat] : [], brands: [], rating: 0, sizes: [], colors: [], avail: false, disc: false,
    max: 200, sort: "featured", view: "grid", q: urlQ || "", filter: urlFilter || "" };

  // sidebar
  $("#filterBox").innerHTML = `
    <div class="filter-box"><h4>دسته‌بندی</h4>${CATEGORIES.map(c => `
      <label class="check-row"><input type="checkbox" data-f="cats" value="${c.id}" ${state.cats.includes(c.id) ? "checked" : ""}> ${c.name} <span class="cnt">${faNum(P.filter(p => p.category === c.id).length)}</span></label>`).join("")}
    </div>
    <div class="filter-box"><h4>محدوده قیمت</h4>
      <div class="price-inputs"><input id="fMin" type="number" min="0" placeholder="۰" value="0" aria-label="کمترین قیمت"><span>—</span><input id="fMax" type="number" min="0" placeholder="۲۰۰" value="200" aria-label="بیشترین قیمت"></div>
      <button class="btn btn-ghost btn-sm btn-block" id="fPriceApply" style="margin-top:10px">اعمال قیمت</button>
    </div>
    <div class="filter-box"><h4>برند</h4>${BRANDS.map(b => `<label class="check-row"><input type="checkbox" data-f="brands" value="${b}"> ${b} <span class="cnt">${faNum(P.filter(p => p.brand === b).length)}</span></label>`).join("")}
    </div>
    <div class="filter-box"><h4>امتیاز</h4>${[4.5, 4, 3.5].map(r => `<label class="check-row"><input type="radio" name="fRating" data-f="rating" value="${r}"> ${"★".repeat(Math.round(r))} و بالاتر</label>`).join("")}
      <label class="check-row"><input type="radio" name="fRating" data-f="rating" value="0" checked> هر امتیازی</label>
    </div>
    <div class="filter-box"><h4>سایز</h4><div class="chip-row">${SIZES.map(s => `<button class="chip" data-f="sizes" data-v="${s}">${s}</button>`).join("")}</div></div>
    <div class="filter-box"><h4>موجودی و تخفیف</h4>
      <label class="check-row"><input type="checkbox" data-f="avail"> فقط کالاهای موجود</label>
      <label class="check-row"><input type="checkbox" data-f="disc"> فقط کالاهای تخفیف‌دار</label>
    </div>
    <button class="btn btn-outline btn-sm btn-block" id="fClear">حذف همه فیلترها</button>`;

  const chipToggle = (sel, arr) => $$(sel).forEach(c => c.onclick = () => {
    const v = c.dataset.v; arr.includes(v) ? arr.splice(arr.indexOf(v), 1) : arr.push(v); c.classList.toggle("active"); apply();
  });

  $$('[data-f="cats"]').forEach(c => c.onchange = () => { state.cats = $$('[data-f="cats"]:checked').map(x => x.value); apply(); });
  $$('[data-f="brands"]').forEach(c => c.onchange = () => { state.brands = $$('[data-f="brands"]:checked').map(x => x.value); apply(); });
  $$('[data-f="rating"]').forEach(c => c.onchange = () => { state.rating = +c.value; apply(); });
  $('[data-f="avail"]').onchange = e => { state.avail = e.target.checked; apply(); };
  $('[data-f="disc"]').onchange = e => { state.disc = e.target.checked; apply(); };
  chipToggle('[data-f="sizes"]', state.sizes);
  $("#fPriceApply").onclick = () => { state.max = +$("#fMax").value || 9999; apply(); };
  $("#fClear").onclick = () => location.href = "shop.html";
  $(".filter-toggle").onclick = () => $("#filterBox").classList.toggle("open");
  $("#sortSel").onchange = e => { state.sort = e.target.value; apply(); };
  $$("#viewToggle button").forEach(b => b.onclick = () => {
    state.view = b.dataset.view; $$("#viewToggle button").forEach(x => x.classList.toggle("active", x === b)); apply();
  });

  function apply() {
    let list = P.slice();
    if (state.q) list = list.filter(p => (p.name + p.brand + p.subcategory).toLowerCase().includes(state.q.toLowerCase()));
    if (state.filter === "new") list = list.filter(p => p.newArrival);
    if (state.filter === "best") list = list.filter(p => p.bestSeller);
    if (state.filter === "sale") list = list.filter(p => p.salePrice);
    if (state.cats.length) list = list.filter(p => state.cats.includes(p.category));
    if (state.brands.length) list = list.filter(p => state.brands.includes(p.brand));
    if (state.rating) list = list.filter(p => p.rating >= state.rating);
    if (state.sizes.length) list = list.filter(p => p.sizes.some(s => state.sizes.includes(s)));
    if (state.avail) list = list.filter(p => p.stock > 0);
    if (state.disc) list = list.filter(p => !!p.salePrice);
    list = list.filter(p => Store.effPrice(p) <= state.max);
    const sorters = { "price-asc": (a, b) => Store.effPrice(a) - Store.effPrice(b), "price-desc": (a, b) => Store.effPrice(b) - Store.effPrice(a),
      rating: (a, b) => b.rating - a.rating, newest: (a, b) => (b.newArrival === true) - (a.newArrival === true), featured: (a, b) => (b.featured === true) - (a.featured === true) };
    list.sort(sorters[state.sort] || sorters.featured);
    $("#resultCount").innerHTML = `نمایش <b>${faNum(list.length)}</b> محصول`;
    $("#shopGrid").innerHTML = list.length
      ? list.map(p => productCard(p, { listView: state.view === "list" })).join("")
      : `<div class="empty-state" style="grid-column:1/-1"><div class="empty-emoji">🔍</div><h3>محصولی یافت نشد</h3><p>فیلترها را تغییر دهید یا از دسته‌بندی‌ها دیدن کنید.</p><a class="btn btn-primary" href="shop.html">حذف فیلترها</a></div>`;
    initReveal();
  }

  // heading
  if (urlFilter === "new") { $("#shopTitle").textContent = "جدیدترین‌ها"; }
  else if (urlFilter === "best") { $("#shopTitle").textContent = "پرفروش‌ترین‌ها"; }
  else if (urlFilter === "sale") { $("#shopTitle").textContent = "تخفیف‌های لحظه‌ای"; }
  else if (urlCat) { const c = CATEGORIES.find(c => c.slug === urlCat); $("#shopTitle").textContent = c ? c.name : "فروشگاه"; $("#crumbTrail").innerHTML = `<a href="index.html">خانه</a> / <a href="categories.html">دسته‌بندی‌ها</a> / ${c ? c.name : "فروشگاه"}`; }
  else if (urlQ) { $("#shopTitle").textContent = `نتایج جستجو برای «${urlQ}»`; }
  $("#crumbTrail").innerHTML = $("#crumbTrail").innerHTML || `<a href="index.html">خانه</a> / فروشگاه`;
  apply();
}

/* ================= SEARCH PAGE ================= */
function renderSearch() {
  const q = (param("q") || "").trim();
  $("#searchQ").textContent = q ? `نتایج جستجو برای «${q}»` : "جستجو";
  if (!q) { $("#searchGrid").innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-emoji">🔍</div><h3>به چه چیزی نیاز دارید؟</h3><p>با استفاده از نوار جستجوی بالا، محصولات، دسته‌بندی‌ها و برندها را پیدا کنید.</p></div>`; return; }
  const list = Store.products().filter(p => (p.name + " " + p.brand + " " + p.subcategory + " " + p.description + " " + catOf(p.category).name).toLowerCase().includes(q.toLowerCase()));
  $("#searchGrid").innerHTML = list.length
    ? list.map(p => productCard(p)).join("")
    : `<div class="empty-state" style="grid-column:1/-1"><div class="empty-emoji">🔎</div><h3>محصولی یافت نشد</h3><p>عبارت دیگری جستجو کنید یا از دسته‌بندی‌ها دیدن کنید.</p><a class="btn btn-primary" href="categories.html">مشاهده دسته‌بندی‌ها</a></div>`;
}

/* ================= PRODUCT PAGE ================= */
function renderProduct() {
  const p = Store.bySlug(param("slug")) || Store.products()[0];
  const cat = catOf(p.category);
  document.title = `${p.name} — APNA STORE`;
  let color = p.colors[0], size = p.sizes[0], qty = 1, img = 0;
  const inWish = () => Store.wishHas(p.id);
  $("#pdTop").innerHTML = `
    <div class="pd-layout">
      <div class="pd-gallery">
        <div class="pd-main" id="pdMain" style="background:${gradCss(cat.grad)}" title="برای بزرگ‌نمایی نشانگر را نگه دارید"><span class="p-emoji">${p.images[0]}</span></div>
        <div class="pd-thumbs">${p.images.map((e, i) => `<div class="qv-thumb ${i === 0 ? "active" : ""}" data-i="${i}" style="background:${gradCss(cat.grad)}">${e === "chrono" ? "⏱️" : e}</div>`).join("")}</div>
      </div>
      <div class="pd-info">
        <span class="p-cat">${cat.name} · ${escapeHtml(p.subcategory)}</span>
        <h1>${escapeHtml(p.name)}</h1>
        <div class="pd-meta">${stars(p.rating)} <span style="color:var(--muted)">${faNum(p.rating)} · ${faNum(p.reviews)} نظر</span> <span>·</span> <span>کد کالا: ${p.sku}</span></div>
        <div class="pd-price-row">
          <span class="pd-price">${money(Store.effPrice(p))}</span>
          ${p.salePrice ? `<span class="pd-old">${money(p.price)}</span><span class="pd-save">${faNum(p.discount)}٪ تخفیف</span>` : ""}
        </div>
        <div class="${p.stock < 20 ? "stock-low" : "stock-ok"}" style="font-size:13.5px;font-weight:700;margin-bottom:10px">${p.stock < 20 ? `عجله کنید — فقط ${faNum(p.stock)} عدد در انبار باقی مانده` : "✓ موجود و آماده ارسال"}</div>
        <p class="pd-desc">${p.description}</p>
        <div class="opt-lbl">رنگ — <span id="pdColorName">${color}</span></div>
        <div class="chip-row" id="pdColors">${p.colors.map((c, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-v="${c}">${c}</button>`).join("")}</div>
        <div class="opt-lbl">سایز — <span id="pdSizeName">${size}</span></div>
        <div class="chip-row" id="pdSizes">${p.sizes.map((s, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-v="${s}">${s}</button>`).join("")}</div>
        <div class="qty-row"><span class="opt-lbl" style="margin:0">تعداد</span>
          <div class="qty-ctl"><button id="pdMinus">−</button><input id="pdQty" value="۱" readonly aria-label="تعداد"><button id="pdPlus">+</button></div></div>
        <div class="pd-actions">
          <button class="btn btn-primary" id="pdAdd">افزودن به سبد</button>
          <button class="btn btn-navy" id="pdBuy">خرید فوری</button>
          <button class="icon-btn" id="pdWish" style="border:1.5px solid var(--border)" aria-label="علاقه‌مندی‌ها"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 21C7 16.6 3 13.3 3 9.2 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.2 0 4.1-4 7.4-9 11.8z" fill="${inWish() ? "#E02D3C" : "none"}" stroke="${inWish() ? "#E02D3C" : "currentColor"}"/></svg></button>
        </div>
        <div class="pd-trust">
          <span>🚚 ارسال رایگان بالای ۵۰ تومان</span><span>↩️ ۳۰ روز مهلت بازگشت</span><span>🔒 پرداخت امن</span><span>🏷️ ۲ سال گارانتی</span>
        </div>
      </div>
    </div>
    <div class="tabs-line">
      <button class="active" data-t="desc">توضیحات</button><button data-t="spec">مشخصات</button>
      <button data-t="rev">نظرات (${faNum(p.reviews)})</button><button data-t="ship">ارسال و بازگشت</button>
    </div>
    <div class="tab-panel" id="pdPanel"></div>
    <section class="section">
      <div class="section-head"><span class="eyebrow">ادامه کاوش</span><h2>شاید این‌ها را هم بپسندید</h2></div>
      <div class="products" id="relatedGrid"></div>
    </section>`;

  $("#crumbTrail").innerHTML = `<a href="index.html">خانه</a> / <a href="shop.html?cat=${cat.slug}">${cat.name}</a> / ${escapeHtml(p.name)}`;
  $("#crumbTitle").textContent = p.name;

  $$(".qv-thumb", $("#pdTop")).forEach(t => t.onclick = () => { img = +t.dataset.i; $("#pdMain .p-emoji").textContent = p.images[img] === "chrono" ? "⏱️" : p.images[img]; $$(".pd-thumbs .qv-thumb").forEach(x => x.classList.remove("active")); t.classList.add("active"); });
  const pick = (sel, nameSel, set) => $$(sel + " .chip").forEach(c => c.onclick = () => { $$(sel + " .chip").forEach(x => x.classList.remove("active")); c.classList.add("active"); set(c.dataset.v); $(nameSel).textContent = c.dataset.v; });
  pick("#pdColors", "#pdColorName", v => color = v); pick("#pdSizes", "#pdSizeName", v => size = v);
  $("#pdMinus").onclick = () => { qty = Math.max(1, qty - 1); $("#pdQty").value = faNum(qty); };
  $("#pdPlus").onclick = () => { qty = Math.min(p.stock, qty + 1); $("#pdQty").value = faNum(qty); };
  const addAct = goCheckout => { Store.cartAdd(p.id, qty, { color, size }); refreshBadges(true); toast("محصول به سبد خرید شما اضافه شد.", "success"); if (goCheckout) location.href = "checkout.html"; else { renderCartDrawer({ id: p.id }); $("#cartDrawer").classList.add("open"); $("#cartBackdrop").classList.add("show"); } };
  $("#pdAdd").onclick = () => addAct(false);
  $("#pdBuy").onclick = () => addAct(true);
  $("#pdWish").onclick = () => { const on = Store.wishToggle(p.id); toast(on ? "به علاقه‌مندی‌ها اضافه شد ♥" : "از علاقه‌مندی‌ها حذف شد"); $("#pdWish svg path").setAttribute("fill", on ? "#E02D3C" : "none"); };
  const panels = {
    desc: `<p>${p.description}</p><p style="margin-top:10px">هر سفارش در بسته‌بندی بازیافتنی و بدون پلاستیک ارسال می‌شود و شامل ۳۰ روز ضمانت رضایت ماست.</p>`,
    spec: `<table class="spec-table">
      <tr><td>برند</td><td>${escapeHtml(p.brand)}</td></tr>
      <tr><td>دسته‌بندی</td><td>${cat.name} — ${escapeHtml(p.subcategory)}</td></tr>
      <tr><td>کد کالا</td><td>${p.sku}</td></tr>
      <tr><td>رنگ‌ها</td><td>${p.colors.join("، ")}</td></tr>
      <tr><td>سایزها</td><td>${p.sizes.join("، ")}</td></tr>
      <tr><td>موجودی</td><td>${faNum(p.stock)} عدد</td></tr>
      <tr><td>گارانتی</td><td>۲ سال</td></tr></table>`,
    rev: TESTIMONIALS.slice(0, 3).map(t => `<div class="t-card" style="margin-bottom:12px"><div class="t-head"><span class="t-ava">${t.initials}</span><div><div class="t-name">${t.name}</div><div class="t-verified">✓ خریدار تأییدشده</div></div></div><div class="t-stars">${"★".repeat(t.stars)}${"☆".repeat(5 - t.stars)}</div><p class="t-text">${t.text}</p></div>`).join(""),
    ship: `<p><b>ارسال عادی</b> (۳ تا ۵ روز کاری) برای سفارش‌های بالای ۵۰ تومان رایگان است، در غیر این صورت ${money(5.99)} است. <b>ارسال فوری</b> (۱ تا ۲ روز کاری) ${money(14.99)} است.</p><p style="margin-top:10px">بازگشت کالا تا ۳۰ روز پس از تحویل پذیرفته می‌شود. کالا باید استفاده‌نشده و در بسته‌بندی اصلی باشد. مبلغ بازگشتی ظرف ۳ تا ۵ روز کاری به روش پرداخت اصلی واریز می‌شود.</p>`,
  };
  const showTab = k => { $("#pdPanel").innerHTML = panels[k]; $$(".tabs-line button").forEach(b => b.classList.toggle("active", b.dataset.t === k)); };
  showTab("desc");
  $$(".tabs-line button").forEach(b => b.onclick = () => showTab(b.dataset.t));
  // related
  $("#relatedGrid").innerHTML = Store.products().filter(x => x.category === p.category && x.id !== p.id).slice(0, 4).map(x => productCard(x)).join("");
}

/* ================= CART PAGE ================= */
function renderCartPage() {
  const lines = Store.cartLines();
  const wrap = $("#cartWrap");
  if (!lines.length) {
    wrap.innerHTML = `<div class="empty-state"><div class="empty-emoji">🛒</div><h3>سبد خرید شما خالی است</h3><p>به نظر می‌رسد هنوز چیزی اضافه نکرده‌اید.</p><a class="btn btn-primary" href="shop.html">شروع خرید</a></div>`;
    return;
  }
  const promo = Store.getPromo();
  const t = Store.cartTotals(promo?.pct || 0);
  wrap.innerHTML = `
    <div class="cart-layout">
      <div class="admin-card" style="padding:0;overflow:hidden">
        <table class="cart-table">
          <thead><tr><th>محصول</th><th class="hide-m">قیمت</th><th>تعداد</th><th class="hide-m">جمع جزء</th><th></th></tr></thead>
          <tbody>${lines.map(l => `
            <tr data-key="${l.key}">
              <td><div class="cart-prod"><span class="thumb" style="background:${gradCss(catOf(l.product.category).grad)}">${l.product.images[0]}</span>
                <div><div class="n"><a href="product.html?slug=${l.product.slug}">${escapeHtml(l.product.name)}</a></div><div class="c">${l.color} · ${l.size}</div></div></div></td>
              <td class="td-price hide-m">${money(Store.effPrice(l.product))}</td>
              <td><div class="qty-ctl"><button data-d="-1">−</button><input value="${faNum(l.qty)}" readonly aria-label="تعداد"><button data-d="1">+</button></div></td>
              <td class="td-total hide-m">${money(Store.effPrice(l.product) * l.qty)}</td>
              <td><button class="remove-btn" aria-label="حذف کالا">✕</button></td>
            </tr>`).join("")}</tbody>
        </table>
      </div>
      <div class="summary">
        <h3>خلاصه سفارش</h3>
        <div class="promo-row"><input id="promoInput" placeholder="کد تخفیف (مثلاً SAVE10)" value="${promo ? promo.code : ""}"><button class="btn btn-ghost" id="promoApply">اعمال</button></div>
        <div class="sum-row"><span>جمع سبد</span><span>${money(t.subtotal)}</span></div>
        ${t.discount ? `<div class="sum-row"><span>تخفیف (${faNum(promo.pct)}٪)</span><span style="color:#0E9F6E">−${money(t.discount)}</span></div>` : ""}
        <div class="sum-row"><span>هزینه ارسال</span><span>${t.shipping === 0 ? '<span class="free">رایگان</span>' : money(t.shipping)}</span></div>
        <div class="sum-row"><span>مالیات (۸٪)</span><span>${money(t.tax)}</span></div>
        <div class="sum-row total"><span>مبلغ نهایی</span><span>${money(t.total)}</span></div>
        <a class="btn btn-primary btn-block" href="checkout.html" style="margin-top:14px">تسویه حساب</a>
        <a class="cd-continue" href="shop.html" style="display:block;margin-top:12px">ادامه خرید</a>
      </div>
    </div>`;
  $$("[data-key]", wrap).forEach(row => {
    const key = row.dataset.key;
    $$("[data-d]", row).forEach(b => b.onclick = () => { Store.cartQty(key, +b.dataset.d); refreshBadges(); renderCartPage(); });
    $(".remove-btn", row).onclick = () => { Store.cartRemove(key); refreshBadges(); renderCartPage(); toast("کالا از سبد خرید حذف شد."); };
  });
  $("#promoApply").onclick = () => {
    const code = $("#promoInput").value.trim().toUpperCase();
    const c = COUPONS.find(c => c.code === code && c.active);
    if (c) { Store.setPromo(c); toast(`کد تخفیف اعمال شد — ${faNum(c.pct)}٪ تخفیف!`, "success"); renderCartPage(); }
    else { Store.setPromo(null); toast("کد تخفیف نامعتبر یا منقضی است.", "error"); renderCartPage(); }
  };
}

/* ================= CHECKOUT ================= */
const PAY_FA = { "Credit/Debit Card": "کارت بانکی", "PayPal": "پی‌پال", "Cash on Delivery": "پرداخت در محل" };
const SHIP_FA = { "Standard": "ارسال عادی", "Express": "ارسال فوری" };
function renderCheckout() {
  const lines = Store.cartLines();
  if (!lines.length) { $("#checkoutWrap").innerHTML = `<div class="empty-state"><div class="empty-emoji">🛒</div><h3>سبد خرید شما خالی است</h3><p>پیش از تسویه حساب، چند محصول به سبد اضافه کنید.</p><a class="btn btn-primary" href="shop.html">شروع خرید</a></div>`; return; }
  const u = Store.currentUser();
  const state = { step: 1, ship: "Standard", pay: "Credit/Debit Card" };
  const fmtItem = l => `<div class="cd-item"><span class="cd-thumb" style="background:${gradCss(catOf(l.product.category).grad)}">${l.product.images[0]}</span>
    <div class="cd-info"><div class="n">${escapeHtml(l.product.name)} × ${faNum(l.qty)}</div><div class="p">${money(Store.effPrice(l.product) * l.qty)}</div></div></div>`;
  const totals = () => Store.cartTotals(Store.getPromo()?.pct || 0, state.ship === "Express" ? 14.99 : null);

  function draw() {
    const t = totals();
    $("#checkoutWrap").innerHTML = `
      <div class="checkout-layout">
        <div>
          <div class="steps">
            ${["اطلاعات", "ارسال", "پرداخت", "بازبینی"].map((n, i) => `
              <div class="step ${state.step === i + 1 ? "active" : ""} ${state.step > i + 1 ? "done" : ""}">
                <span class="dot">${state.step > i + 1 ? "✓" : faNum(i + 1)}</span> ${n}
              </div>`).join("")}
          </div>
          <div class="admin-card">
            ${state.step === 1 ? `
            <h3>اطلاعات تماس و آدرس</h3>
            <div class="form-grid">
              <div class="field"><label>نام *</label><input id="fName" value="${u ? u.name.split(" ")[0] : ""}"><span class="err">الزامی</span></div>
              <div class="field"><label>نام خانوادگی *</label><input id="lName" value="${u ? u.name.split(" ")[1] || "" : ""}"><span class="err">الزامی</span></div>
              <div class="field"><label>ایمیل *</label><input id="fEmail" type="email" value="${u ? u.email : ""}"><span class="err">یک ایمیل معتبر وارد کنید</span></div>
              <div class="field"><label>شماره تماس *</label><input id="fPhone" value="${u ? u.phone : ""}"><span class="err">الزامی</span></div>
              <div class="field full"><label>آدرس کامل *</label><input id="fAddr" value="${u ? u.address : ""}"><span class="err">الزامی</span></div>
              <div class="field"><label>شهر *</label><input id="fCity"><span class="err">الزامی</span></div>
              <div class="field"><label>استان *</label><input id="fState"><span class="err">الزامی</span></div>
              <div class="field"><label>کد پستی *</label><input id="fZip"><span class="err">الزامی</span></div>
              <div class="field"><label>کشور *</label><select id="fCountry"><option>ایران</option><option>امارات متحده عربی</option><option>کانادا</option><option>آلمان</option><option>بریتانیا</option><option>سایر</option></select></div>
            </div>` : ""}
            ${state.step === 2 ? `
            <h3>روش ارسال</h3>
            <div class="ship-opts">
              <div class="ship-opt ${state.ship === "Standard" ? "active" : ""}" data-ship="Standard"><input type="radio" name="ship" checked style="accent-color:var(--bright)"><div style="flex:1"><b>ارسال عادی</b><div style="font-size:12.5px;color:var(--muted)">۳ تا ۵ روز کاری</div></div><b>${t.subtotal >= 50 ? "رایگان" : money(5.99)}</b></div>
              <div class="ship-opt ${state.ship === "Express" ? "active" : ""}" data-ship="Express"><input type="radio" name="ship" style="accent-color:var(--bright)"><div style="flex:1"><b>ارسال فوری</b><div style="font-size:12.5px;color:var(--muted)">۱ تا ۲ روز کاری</div></div><b>${money(14.99)}</b></div>
            </div>` : ""}
            ${state.step === 3 ? `
            <h3>روش پرداخت</h3>
            <div class="pay-opts">
              ${["Credit/Debit Card", "PayPal", "Cash on Delivery"].map(m => `
                <div class="pay-opt ${state.pay === m ? "active" : ""}" data-pay="${m}"><input type="radio" name="pay" ${state.pay === m ? "checked" : ""} style="accent-color:var(--bright)"><div style="flex:1"><b>${PAY_FA[m]}</b>${m === "Credit/Debit Card" ? `<div style="font-size:12.5px;color:var(--muted)">ویزا، مسترکارت، امریکن اکسپرس</div>` : m === "PayPal" ? `<div style="font-size:12.5px;color:var(--muted)">انتقال به پی‌پال</div>` : `<div style="font-size:12.5px;color:var(--muted)">پرداخت هنگام دریافت سفارش</div>`}</div><span>${m === "Credit/Debit Card" ? "💳" : m === "PayPal" ? "🅿️" : "💵"}</span></div>`).join("")}
            </div>
            ${state.pay === "Credit/Debit Card" ? `
            <div class="form-grid" style="margin-top:16px">
              <div class="field full"><label>شماره کارت *</label><input id="fCard" placeholder="4242 4242 4242 4242" maxlength="19"><span class="err">شماره کارت ۱۶ رقمی وارد کنید</span></div>
              <div class="field"><label>تاریخ انقضا *</label><input id="fExp" placeholder="MM/YY" maxlength="5"><span class="err">قالب MM/YY</span></div>
              <div class="field"><label>CVC *</label><input id="fCvc" placeholder="123" maxlength="4"><span class="err">۳ تا ۴ رقم</span></div>
            </div>` : ""}
            <div class="secure-note">🔒 پرداخت‌ها به‌صورت رمزنگاری‌شده و امن پردازش می‌شوند. این فروشگاه نسخه نمایشی است — هیچ مبلغ واقعی کسر نمی‌شود.</div>` : ""}
            ${state.step === 4 ? `
            <h3>بازبینی سفارش</h3>
            <div class="order-review">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:13.5px">
                <div><b>آدرس تحویل</b><div style="color:var(--muted)" id="rvAddr"></div></div>
                <div><b>روش ارسال و پرداخت</b><div style="color:var(--muted)">${SHIP_FA[state.ship]} · ${PAY_FA[state.pay]}</div></div>
              </div>
            </div>
            <div style="margin-top:14px">${lines.map(fmtItem).join("")}</div>` : ""}
          </div>
          <div class="checkout-nav">
            ${state.step > 1 ? `<button class="btn btn-outline" id="ckBack">بازگشت</button>` : `<a class="btn btn-outline" href="cart.html">سبد خرید</a>`}
            <button class="btn btn-primary" id="ckNext" style="flex:1">${state.step === 4 ? "ثبت سفارش" : "ادامه"}</button>
          </div>
        </div>
        <div class="summary">
          <h3>خلاصه سفارش</h3>
          ${lines.map(fmtItem).join("")}
          <div class="sum-row" style="margin-top:10px"><span>جمع سبد</span><span>${money(t.subtotal)}</span></div>
          ${t.discount ? `<div class="sum-row"><span>تخفیف</span><span style="color:#0E9F6E">−${money(t.discount)}</span></div>` : ""}
          <div class="sum-row"><span>هزینه ارسال</span><span>${t.shipping === 0 ? '<span class="free">رایگان</span>' : money(t.shipping)}</span></div>
          <div class="sum-row"><span>مالیات (۸٪)</span><span>${money(t.tax)}</span></div>
          <div class="sum-row total"><span>مبلغ نهایی</span><span>${money(t.total)}</span></div>
          <div class="pay-badges" style="margin-top:16px"><span class="pay-chip">VISA</span><span class="pay-chip">MC</span><span class="pay-chip">PAYPAL</span><span class="pay-chip">SSL</span></div>
        </div>
      </div>`;
    // bindings
    $$("[data-ship]").forEach(o => o.onclick = () => { state.ship = o.dataset.ship; draw(); });
    $$("[data-pay]").forEach(o => o.onclick = () => { state.pay = o.dataset.pay; draw(); });
    const back = $("#ckBack"); if (back) back.onclick = () => { state.step--; draw(); };
    $("#ckNext").onclick = () => {
      if (state.step === 1 && !validate(["fName", "lName", "fEmail", "fPhone", "fAddr", "fCity", "fState", "fZip"])) return;
      if (state.step === 1) state.info = { first: $("#fName").value, last: $("#lName").value, email: $("#fEmail").value, phone: $("#fPhone").value, addr: $("#fAddr").value, city: $("#fCity").value, st: $("#fState").value, zip: $("#fZip").value, country: $("#fCountry").value };
      if (state.step === 3 && state.pay === "Credit/Debit Card" && !validate(["fCard", "fExp", "fCvc"])) return;
      if (state.step < 4) { state.step++; draw(); if (state.step === 4 && state.info) $("#rvAddr").textContent = `${state.info.first} ${state.info.last}، ${state.info.addr}، ${state.info.city}، ${state.info.st} ${state.info.zip}، ${state.info.country}`; return; }
      placeOrder();
    };
  }
  function validate(ids) {
    let ok = true;
    ids.forEach(id => {
      const el = $("#" + id), f = el.closest(".field");
      const v = el.value.trim();
      let good = v.length > 0;
      if (id === "fEmail") good = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (id === "fCard") good = /^\d{16}$/.test(v.replace(/\s/g, ""));
      if (id === "fExp") good = /^(0[1-9]|1[0-2])\/\d{2}$/.test(v);
      if (id === "fCvc") good = /^\d{3,4}$/.test(v);
      f.classList.toggle("invalid", !good);
      if (!good) ok = false;
    });
    if (!ok) toast("لطفاً فیلدهای مشخص‌شده را اصلاح کنید.", "error");
    return ok;
  }
  function placeOrder() {
    const btn = $("#ckNext"); btn.classList.add("loading"); btn.disabled = true;
    setTimeout(() => {
      const t = totals();
      const id = "APN-" + Math.floor(10000 + Math.random() * 90000);
      const order = {
        id, user: (state.info?.email || Store.currentUser()?.email || "guest@apnastore.com"),
        name: (state.info ? `${state.info.first} ${state.info.last}`.trim() : Store.currentUser()?.name || "مهمان"),
        items: lines.map(l => ({ id: l.id, qty: l.qty, color: l.color, size: l.size })),
        subtotal: t.subtotal, discount: t.discount, shipping: t.shipping, tax: t.tax, total: t.total,
        paymentMethod: state.pay, shippingMethod: state.ship, status: "Confirmed",
        createdAt: new Date().toISOString().slice(0, 10),
        address: state.info ? `${state.info.addr}، ${state.info.city}، ${state.info.st} ${state.info.zip}، ${state.info.country}` : (Store.currentUser()?.address || "—"),
      };
      Store.addOrder(order); Store.cartClear(); Store.setPromo(null); refreshBadges();
      $("#checkoutWrap").innerHTML = `
        <div class="success-panel">
          <div class="success-ico">✓</div>
          <h1 style="font-size:30px">از سفارش شما سپاسگزاریم!</h1>
          <p style="color:var(--muted);margin:10px 0 6px">سفارش <b style="color:var(--navy)">${order.id}</b> با موفقیت ثبت شد.</p>
          <p style="color:var(--muted)">ایمیل تأیید به‌زودی برای شما ارسال می‌شود.</p>
          <div style="display:flex;gap:12px;justify-content:center;margin-top:26px;flex-wrap:wrap">
            <a class="btn btn-primary" href="track.html?order=${order.id}">پیگیری سفارش</a>
            <a class="btn btn-outline" href="shop.html">ادامه خرید</a>
          </div>
        </div>`;
      toast("سفارش با موفقیت ثبت شد!", "success");
    }, 900);
  }
  draw();
}

/* ================= WISHLIST ================= */
function renderWishlistPage() {
  const ids = JSON.parse(localStorage.getItem("apna_wishlist") || "[]");
  const list = ids.map(id => Store.byId(id)).filter(Boolean);
  const el = $("#wishWrap");
  if (!list.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-emoji">💛</div><h3>لیست علاقه‌مندی‌های شما منتظر است</h3><p>روی قلب هر محصول بزنید تا برای بعد اینجا ذخیره شود.</p><a class="btn btn-primary" href="shop.html">کشف محصولات</a></div>`;
    return;
  }
  el.innerHTML = `<div class="products" style="grid-template-columns:repeat(4,1fr)">${list.map(p => productCard(p)).join("")}</div>`;
}

/* ================= ACCOUNT ================= */
function renderAccount() {
  const u = Store.currentUser();
  if (!u) { location.href = "login.html"; return; }
  const orders = Store.allOrders().filter(o => (o.user || "").toLowerCase() === u.email.toLowerCase() || o.user === "guest@apnastore.com");
  const view = param("tab") || "dashboard";
  const wishN = JSON.parse(localStorage.getItem("apna_wishlist") || "[]").length;
  $("#accSide").innerHTML = `
    <div class="acc-user"><span class="acc-ava">${u.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}</span>
      <div><b style="font-size:14px">${escapeHtml(u.name)}</b><div style="font-size:12px;color:var(--muted)">${escapeHtml(u.email)}</div></div></div>
    ${[["dashboard", "پیشخوان"], ["orders", "سفارش‌ها"], ["wishlist", "علاقه‌مندی‌ها"], ["profile", "پروفایل"], ["settings", "تنظیمات"]].map(([k, n]) =>
      `<button class="acc-link ${view === k ? "active" : ""}" data-view="${k}">${n}</button>`).join("")}
    <button class="acc-link" id="accLogout" style="color:var(--danger)">خروج از حساب</button>`;
  const main = $("#accMain");
  const views = {
    dashboard: () => {
      const pending = orders.filter(o => !["Delivered", "Cancelled"].includes(o.status)).length;
      const done = orders.filter(o => o.status === "Delivered").length;
      main.innerHTML = `<h2 style="font-size:22px;margin-bottom:18px">پیشخوان</h2>
        <div class="metric-grid">
          <div class="metric"><div class="m-num">${faNum(orders.length)}</div><div class="m-lbl">کل سفارش‌ها</div></div>
          <div class="metric"><div class="m-num">${faNum(pending)}</div><div class="m-lbl">سفارش‌های در جریان</div></div>
          <div class="metric"><div class="m-num">${faNum(done)}</div><div class="m-lbl">سفارش‌های تحویل‌شده</div></div>
          <div class="metric"><div class="m-num">${faNum(wishN)}</div><div class="m-lbl">کالاهای موردعلاقه</div></div>
        </div>
        <h3 style="font-size:16px;margin-bottom:12px">سفارش‌های اخیر</h3>
        <table class="data-table"><thead><tr><th>سفارش</th><th>تاریخ</th><th>مبلغ</th><th>وضعیت</th><th></th></tr></thead><tbody>
          ${orders.slice(0, 5).map(o => `<tr><td><b>${o.id}</b></td><td>${faNum(o.createdAt)}</td><td>${money(o.total)}</td><td><span class="status-pill status-${o.status.toLowerCase().replace(/\s/g, "")}">${stFa(o.status)}</span></td><td><a class="btn btn-ghost btn-sm" href="track.html?order=${o.id}">پیگیری</a></td></tr>`).join("")}
        </tbody></table>`;
    },
    orders: () => {
      main.innerHTML = `<h2 style="font-size:22px;margin-bottom:18px">سفارش‌های من</h2>
        ${orders.length ? `<table class="data-table"><thead><tr><th>سفارش</th><th>تاریخ</th><th>اقلام</th><th>مبلغ</th><th>وضعیت</th><th></th></tr></thead><tbody>
        ${orders.map(o => `<tr><td><b>${o.id}</b></td><td>${faNum(o.createdAt)}</td><td>${faNum(o.items.reduce((s, i) => s + i.qty, 0))}</td><td>${money(o.total)}</td><td><span class="status-pill status-${o.status.toLowerCase().replace(/\s/g, "")}">${stFa(o.status)}</span></td><td><a class="btn btn-ghost btn-sm" href="track.html?order=${o.id}">پیگیری</a></td></tr>`).join("")}
        </tbody></table>` : `<div class="empty-state"><div class="empty-emoji">📦</div><h3>هنوز سفارشی ندارید</h3><p>سفارش‌های شما پس از تسویه حساب اینجا نمایش داده می‌شوند.</p><a class="btn btn-primary" href="shop.html">شروع خرید</a></div>`}`;
    },
    wishlist: () => { main.innerHTML = `<h2 style="font-size:22px;margin-bottom:18px">علاقه‌مندی‌های من</h2><div id="wishWrap"></div>`; renderWishlistPage(); },
    profile: () => {
      main.innerHTML = `<h2 style="font-size:22px;margin-bottom:18px">پروفایل</h2>
        <div class="admin-card" style="max-width:520px">
          <div class="field"><label>نام و نام خانوادگی</label><input id="pfName" value="${escapeHtml(u.name)}"></div>
          <div class="field"><label>ایمیل</label><input value="${escapeHtml(u.email)}" disabled></div>
          <div class="field"><label>شماره تماس</label><input id="pfPhone" value="${escapeHtml(u.phone || "")}"></div>
          <div class="field"><label>آدرس</label><input id="pfAddr" value="${escapeHtml(u.address || "")}"></div>
          <button class="btn btn-primary" id="pfSave">ذخیره تغییرات</button>
        </div>`;
      $("#pfSave").onclick = () => { Store.updateUser({ name: $("#pfName").value, phone: $("#pfPhone").value, address: $("#pfAddr").value }); toast("پروفایل به‌روزرسانی شد.", "success"); renderAccount(); };
    },
    settings: () => {
      main.innerHTML = `<h2 style="font-size:22px;margin-bottom:18px">تنظیمات</h2>
        <div class="admin-card" style="max-width:520px">
          <label class="check-row"><input type="checkbox" checked> اطلاع‌رسانی ایمیلی سفارش‌ها</label>
          <label class="check-row"><input type="checkbox" checked> پیشنهادها و تخفیف‌های ویژه</label>
          <label class="check-row"><input type="checkbox"> پیامک اطلاع‌رسانی</label>
          <button class="btn btn-primary" style="margin-top:14px" onclick="toast('تنظیمات ذخیره شد.','success')">ذخیره تنظیمات</button>
        </div>
        <div class="admin-card" style="max-width:520px">
          <h3>منطقه خطر</h3>
          <button class="btn btn-outline" style="color:var(--danger);border-color:#F4B7BD" id="accLogout2">خروج از حساب</button>
        </div>`;
      $("#accLogout2").onclick = doLogout;
    },
  };
  const doLogout = () => { Store.logout(); toast("از حساب خود خارج شدید."); location.href = "login.html"; };
  views[view]();
  $$("[data-view]").forEach(b => b.onclick = () => location.href = "account.html?tab=" + b.dataset.view);
  $("#accLogout").onclick = doLogout;
}

/* ================= AUTH ================= */
function initAuth() {
  const isLogin = document.body.dataset.page === "login";
  const form = $("#authForm");
  form.onsubmit = e => {
    e.preventDefault();
    $$(".field", form).forEach(f => f.classList.remove("invalid"));
    const get = id => $("#" + id).value.trim();
    let ok = true;
    const mark = (id, bad) => { $("#" + id).closest(".field").classList.toggle("invalid", bad); if (bad) ok = false; };
    const email = get("aEmail"), pass = get("aPass");
    mark("aEmail", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    mark("aPass", pass.length < 6);
    if (isLogin) {
      if (!ok) return;
      const btn = form.querySelector("button[type=submit]"); btn.classList.add("loading");
      setTimeout(() => {
        btn.classList.remove("loading");
        const u = Store.login(email, pass);
        if (u) { toast(`خوش آمدید، ${u.name.split(" ")[0]}!`, "success"); location.href = "account.html"; }
        else { mark("aPass", true); $(".err", $("#aPass").closest(".field")).textContent = "ایمیل یا رمز عبور نادرست است."; toast("ورود ناموفق بود. اطلاعات خود را بررسی کنید.", "error"); }
      }, 700);
    } else {
      const name = get("aName"), phone = get("aPhone"), pass2 = get("aPass2");
      mark("aName", name.length < 2); mark("aPhone", phone.length < 6);
      mark("aPass2", pass2 !== pass || pass2.length < 6);
      if (!ok) { toast("لطفاً فیلدهای مشخص‌شده را اصلاح کنید.", "error"); return; }
      const btn = form.querySelector("button[type=submit]"); btn.classList.add("loading");
      setTimeout(() => {
        btn.classList.remove("loading");
        const r = Store.register({ name, email, phone, password: pass, address: "" });
        if (r.error) { toast(r.error, "error"); return; }
        toast("حساب کاربری ساخته شد — خوش آمدید!", "success"); location.href = "account.html";
      }, 700);
    }
  };
}

/* ================= TRACK ================= */
const TRACK_STEPS = ["Order Placed", "Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"];
const TRACK_META = [
  ["📦", "سفارش شما را دریافت کردیم."], ["✓", "پرداخت تأیید و سفارش بررسی شد."],
  ["⚙️", "کالاهای شما در حال آماده‌سازی و کنترل کیفیت است."], ["🚚", "بسته شما از انبار خارج شد."],
  ["🛵", "پیک در مسیر آدرس شماست."], ["🏠", "تحویل شد — از خرید با ما سپاسگزاریم!"],
];
function initTrack() {
  const go = () => {
    const id = ($("#trackInput").value || param("order") || "").trim().toUpperCase();
    if (!id) return;
    const order = Store.allOrders().find(o => o.id.toUpperCase() === id);
    const box = $("#trackResult");
    if (!order) {
      box.innerHTML = `<div class="empty-state"><div class="empty-emoji">🔎</div><h3>سفارشی یافت نشد</h3><p>شماره سفارش را دوباره بررسی کنید.<br>با یک سفارش نمونه امتحان کنید: <b>APN-10234</b>، APN-10235، APN-10236</p></div>`;
      return;
    }
    const idx = TRACK_STEPS.indexOf(order.status);
    box.innerHTML = `
      <div class="admin-card">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;align-items:center">
          <div><b style="font-size:17px">${order.id}</b><div style="font-size:13px;color:var(--muted)">ثبت‌شده در ${faNum(order.createdAt)} · ${SHIP_FA[order.shippingMethod] || order.shippingMethod}</div></div>
          <span class="status-pill status-${order.status.toLowerCase().replace(/\s/g, "")}">${stFa(order.status)}</span>
        </div>
      </div>
      <div class="timeline">
        ${TRACK_STEPS.map((s, i) => `
          <div class="tl-item ${i < idx ? "done" : ""} ${i === idx ? "current" : ""} ${i > idx ? "pending" : ""}">
            <span class="tl-dot">${TRACK_META[i][0]}</span>
            <div><h4>${stFa(s)}</h4><p>${i <= idx ? TRACK_META[i][1] : "در انتظار"}</p></div>
          </div>`).join("")}
      </div>`;
  };
  $("#trackBtn").onclick = go;
  $("#trackInput").addEventListener("keydown", e => e.key === "Enter" && go());
  if (param("order")) { $("#trackInput").value = param("order"); go(); }
}
