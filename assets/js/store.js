/* ============ APNA STORE — State (cart / wishlist / orders / auth) ============ */
const Store = (() => {
  const read = (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch { return fb; } };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  // --- products (admin overrides seed) ---
  const products = () => read("apna_products", null) || PRODUCTS;
  const saveProducts = list => write("apna_products", list);
  const resetProducts = () => localStorage.removeItem("apna_products");
  const bySlug = slug => products().find(p => p.slug === slug);
  const byId = id => products().find(p => String(p.id) === String(id));
  const effPrice = p => p.salePrice ?? p.price;

  // --- cart ---
  let cart = read("apna_cart", []);
  const cartSave = () => { write("apna_cart", cart); document.dispatchEvent(new CustomEvent("cart:changed")); };
  const cartAdd = (id, qty = 1, opts = {}) => {
    const p = byId(id); if (!p) return;
    const key = [id, opts.color || "", opts.size || ""].join("|");
    const line = cart.find(l => l.key === key);
    if (line) { line.qty = Math.min(line.qty + qty, p.stock); } 
    else cart.push({ key, id: p.id, qty, color: opts.color || p.colors[0], size: opts.size || p.sizes[0] });
    cartSave();
  };
  const cartQty = (key, d) => {
    const line = cart.find(l => l.key === key); if (!line) return;
    const p = byId(line.id);
    line.qty = Math.max(1, Math.min(line.qty + d, p ? p.stock : 99));
    cartSave();
  };
  const cartRemove = key => { cart = cart.filter(l => l.key !== key); cartSave(); };
  const cartClear = () => { cart = []; cartSave(); };
  const cartCount = () => cart.reduce((s, l) => s + l.qty, 0);
  const cartLines = () => cart.map(l => ({ ...l, product: byId(l.id) })).filter(l => l.product);
  const cartTotals = (pct = 0, shipOverride = null) => {
    const subtotal = cartLines().reduce((s, l) => s + effPrice(l.product) * l.qty, 0);
    const discount = +(subtotal * pct / 100).toFixed(2);
    const base = subtotal >= 50 ? 0 : 5.99;
    const shipping = shipOverride ?? base;
    const tax = +((subtotal - discount) * 0.08).toFixed(2);
    const total = +(subtotal - discount + shipping + tax).toFixed(2);
    return { subtotal: +subtotal.toFixed(2), discount, shipping, tax, total };
  };

  // --- wishlist ---
  let wishlist = read("apna_wishlist", []);
  const wishToggle = id => {
    wishlist.includes(id) ? wishlist = wishlist.filter(x => x !== id) : wishlist.push(id);
    write("apna_wishlist", wishlist);
    document.dispatchEvent(new CustomEvent("wish:changed"));
    return wishlist.includes(id);
  };
  const wishHas = id => wishlist.includes(id);

  // --- promo ---
  let promo = read("apna_promo", null);
  const setPromo = p => { promo = p; write("apna_promo", p); };
  const getPromo = () => promo;

  // --- orders ---
  let orders = read("apna_orders", null);
  if (!orders) {
    orders = [
      { id: "APN-10234", user: "guest@apnastore.com", name: "Alex Morgan",
        items: [{ id: 13, qty: 1, color: "شبانه", size: "تک‌سایز" }, { id: 5, qty: 1, color: "سفید/آبی", size: "42" }],
        subtotal: 169.98, discount: 0, shipping: 0, tax: 13.6, total: 183.58, paymentMethod: "Credit/Debit Card",
        shippingMethod: "Express", status: "Shipped", createdAt: "2026-10-04", address: "221B Market Street, Springfield, IL 62704, USA" },
      { id: "APN-10235", user: "guest@apnastore.com", name: "Alex Morgan",
        items: [{ id: 1, qty: 2, color: "سرمه‌ای", size: "L" }],
        subtotal: 79.98, discount: 8, shipping: 0, tax: 5.76, total: 77.74, paymentMethod: "PayPal",
        shippingMethod: "Standard", status: "Delivered", createdAt: "2026-09-21", address: "221B Market Street, Springfield, IL 62704, USA" },
      { id: "APN-10236", user: "guest@apnastore.com", name: "Alex Morgan",
        items: [{ id: 9, qty: 1, color: "کلاسیک", size: "ست" }],
        subtotal: 44.99, discount: 0, shipping: 5.99, tax: 3.6, total: 54.58, paymentMethod: "Cash on Delivery",
        shippingMethod: "Standard", status: "Processing", createdAt: "2026-10-07", address: "221B Market Street, Springfield, IL 62704, USA" },
    ];
    write("apna_orders", orders);
  }
  const allOrders = () => read("apna_orders", []);
  const addOrder = o => { const list = allOrders(); list.unshift(o); write("apna_orders", list); return o; };
  const setOrderStatus = (id, status) => {
    const list = allOrders(); const o = list.find(x => x.id === id);
    if (o) { o.status = status; write("apna_orders", list); }
  };

  // --- auth ---
  let user = read("apna_user", null);
  const users = () => read("apna_users", [{ name: "Alex Morgan", email: "demo@apnastore.com", phone: "+1 555 010 2030", password: "demo1234", address: "221B Market Street, Springfield, IL 62704, USA" }]);
  const saveUsers = u => write("apna_users", u);
  const login = (email, password) => {
    const u = users().find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
    if (!u) return null;
    user = { name: u.name, email: u.email, phone: u.phone, address: u.address };
    write("apna_user", user); return user;
  };
  const register = data => {
    const list = users();
    if (list.some(u => u.email.toLowerCase() === data.email.toLowerCase())) return { error: "با این ایمیل قبلاً حساب کاربری ساخته شده است." };
    list.push(data); saveUsers(list);
    user = { name: data.name, email: data.email, phone: data.phone, address: data.address };
    write("apna_user", user); return { ok: true };
  };
  const logout = () => { user = null; localStorage.removeItem("apna_user"); };
  const currentUser = () => read("apna_user", null);
  const updateUser = patch => {
    const list = users(); const u = list.find(x => x.email === user.email);
    if (u) Object.assign(u, patch); saveUsers(list);
    user = { ...user, ...patch }; write("apna_user", user);
  };

  // --- settings ---
  const settings = () => read("apna_settings", { name: "APNA STORE", currency: "USD", freeShip: 50 });
  const saveSettings = s => write("apna_settings", s);

  return { products, saveProducts, resetProducts, bySlug, byId, effPrice,
    cartAdd, cartQty, cartRemove, cartClear, cartCount, cartLines, cartTotals,
    wishToggle, wishHas, setPromo, getPromo,
    allOrders, addOrder, setOrderStatus,
    login, register, logout, currentUser, updateUser, users,
    settings, saveSettings };
})();

/* قالب‌بندی مبلغ با ارقام فارسی (واحد: تومان) */
const money = n => faNum(Number(n).toFixed(2)) + " تومان";
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
