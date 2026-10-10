/* ============ APNA STORE — Admin dashboard (فارسی) ============ */
function renderAdmin(initialView) {
  let view = initialView || param("tab") || "dashboard";
  const main = $("#adminMain");
  const links = [["dashboard", "پیشخوان"], ["products", "محصولات"], ["orders", "سفارش‌ها"], ["customers", "مشتریان"], ["coupons", "کدهای تخفیف"], ["analytics", "تحلیل‌ها"], ["settings", "تنظیمات"]];
  $("#adminSide").innerHTML = links.map(([k, n]) => `<button class="acc-link ${view === k ? "active" : ""}" data-view="${k}">${n}</button>`).join("");
  $$("[data-view]").forEach(b => b.onclick = () => { renderAdmin(b.dataset.view); });
  $("#adminTitle").textContent = links.find(l => l[0] === view)[1];

  const orders = Store.allOrders();
  const P = Store.products();

  const views = {
    dashboard: () => {
      const revenue = orders.reduce((s, o) => s + o.total, 0);
      const customers = new Set(orders.map(o => o.user)).size;
      main.innerHTML = `
        <div class="metric-grid">
          <div class="metric"><div class="m-num">${money(revenue)}</div><div class="m-lbl">درآمد کل</div></div>
          <div class="metric"><div class="m-num">${faNum(orders.length)}</div><div class="m-lbl">سفارش‌ها</div></div>
          <div class="metric"><div class="m-num">${faNum(customers)}</div><div class="m-lbl">مشتریان</div></div>
          <div class="metric"><div class="m-num">${faNum(P.length)}</div><div class="m-lbl">محصولات</div></div>
        </div>
        <div class="admin-card"><h3>نمای کلی فروش — ۸ هفته اخیر</h3><div class="bar-chart">${[42, 58, 50, 74, 66, 88, 79, 96].map((v, i) =>
          `<div class="bar-col"><div class="bar" style="height:${v}%"></div><span class="bar-lbl">هفته ${faNum(i + 1)}</span></div>`).join("")}</div></div>
        <div class="admin-card"><h3>محصولات برتر</h3>
          <table class="data-table"><thead><tr><th>#</th><th>محصول</th><th>دسته‌بندی</th><th>نظرات</th><th>امتیاز</th></tr></thead><tbody>
          ${P.filter(p => p.bestSeller).sort((a, b) => (a.rank || 9) - (b.rank || 9)).concat(P.slice(0, 2)).slice(0, 5).map((p, i) =>
            `<tr><td><b>${faNum(i + 1)}</b></td><td>${escapeHtml(p.name)}</td><td>${catOf(p.category).name}</td><td>${faNum(p.reviews)}</td><td>${faNum(p.rating)} ★</td></tr>`).join("")}
          </tbody></table></div>
        <div class="admin-card"><h3>عملکرد دسته‌بندی‌ها</h3>
          ${CATEGORIES.map(c => { const n = P.filter(p => p.category === c.id).reduce((s, p) => s + p.reviews, 0); const max = Math.max(...CATEGORIES.map(cc => P.filter(p => p.category === cc.id).reduce((s, p) => s + p.reviews, 0))); return `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600"><span>${c.name}</span><span>${faNum(n)} نظر</span></div><div class="stock-bar" style="margin-top:5px"><div class="stock-fill" style="width:${Math.round(n / max * 100)}%"></div></div></div>`; }).join("")}
        </div>`;
    },
    products: () => {
      main.innerHTML = `
        <div class="admin-top"><h1 id="adminCrumb" style="font-size:20px">محصولات (${faNum(P.length)})</h1>
          <div style="display:flex;gap:10px"><input id="admSearch" placeholder="جستجوی محصولات..." style="border:1.5px solid var(--border);border-radius:10px;padding:10px 14px"><button class="btn btn-primary btn-sm" id="admAdd">+ افزودن محصول</button></div></div>
        <table class="data-table"><thead><tr><th>محصول</th><th>دسته‌بندی</th><th>قیمت</th><th>موجودی</th><th>برچسب‌ها</th><th style="text-align:left">عملیات</th></tr></thead><tbody id="admProdRows"></tbody></table>
        <div id="admModal"></div>`;
      const drawRows = q => {
        $("#admProdRows").innerHTML = P.filter(p => !q || p.name.toLowerCase().includes(q)).map(p => `
          <tr><td><b>${escapeHtml(p.name)}</b><div style="font-size:12px;color:var(--muted)">${p.sku}</div></td>
          <td>${catOf(p.category).name}</td>
          <td><b>${money(Store.effPrice(p))}</b>${p.salePrice ? `<div style="font-size:12px;color:var(--muted);text-decoration:line-through">${money(p.price)}</div>` : ""}</td>
          <td>${faNum(p.stock)}</td>
          <td>${[p.featured && "ویژه", p.bestSeller && "پرفروش", p.newArrival && "جدید"].filter(Boolean).join("، ") || "—"}</td>
          <td style="text-align:left"><button class="btn btn-ghost btn-sm" data-edit="${p.id}">ویرایش</button> <button class="btn btn-sm" style="color:var(--danger)" data-del="${p.id}">حذف</button></td></tr>`).join("");
        $$("[data-edit]").forEach(b => b.onclick = () => productForm(Store.byId(b.dataset.edit)));
        $$("[data-del]").forEach(b => b.onclick = () => {
          const id = +b.dataset.del;
          Store.saveProducts(P.filter(p => p.id !== id)); toast("محصول حذف شد.", "success"); renderAdmin("products");
        });
      };
      drawRows("");
      $("#admSearch").oninput = e => drawRows(e.target.value.toLowerCase());
      $("#admAdd").onclick = () => productForm(null);
    },
    orders: () => {
      main.innerHTML = `<h1 style="font-size:20px;margin-bottom:18px">سفارش‌ها (${faNum(orders.length)})</h1>
        <table class="data-table"><thead><tr><th>سفارش</th><th>مشتری</th><th>تاریخ</th><th>مبلغ</th><th>وضعیت</th><th>پیگیری</th></tr></thead><tbody>
        ${orders.map(o => `<tr><td><b>${o.id}</b></td><td>${escapeHtml(o.name || "مهمان")}<div style="font-size:12px;color:var(--muted)">${escapeHtml(o.user || "")}</div></td>
          <td>${faNum(o.createdAt)}</td><td><b>${money(o.total)}</b></td>
          <td><select data-status="${o.id}" style="border:1.5px solid var(--border);border-radius:8px;padding:7px 10px;font-size:13px">${TRACK_STEPS.slice(0, 4).concat(["Out for Delivery", "Delivered", "Cancelled"]).map(s => `<option value="${s}" ${s === o.status ? "selected" : ""}>${stFa(s)}</option>`).join("")}</select></td>
          <td><a class="btn btn-ghost btn-sm" href="track.html?order=${o.id}">پیگیری</a></td></tr>`).join("")}
        </tbody></table>`;
      $$("[data-status]").forEach(s => s.onchange = () => { Store.setOrderStatus(s.dataset.status, s.value); toast(`سفارش ${s.dataset.status} → ${stFa(s.value)}`, "success"); });
    },
    customers: () => {
      const map = {};
      orders.forEach(o => { const k = o.user || "guest"; (map[k] = map[k] || { email: k, name: o.name || "مهمان", count: 0, spend: 0 }).count++; map[k].spend += o.total; });
      const rows = Object.values(map);
      main.innerHTML = `<h1 style="font-size:20px;margin-bottom:18px">مشتریان (${faNum(rows.length)})</h1>
        <table class="data-table"><thead><tr><th>نام</th><th>ایمیل</th><th>سفارش‌ها</th><th>مجموع خرید</th></tr></thead><tbody>
        ${rows.map(c => `<tr><td><b>${escapeHtml(c.name)}</b></td><td>${escapeHtml(c.email)}</td><td>${faNum(c.count)}</td><td>${money(c.spend)}</td></tr>`).join("")}
        </tbody></table>`;
    },
    coupons: () => {
      let coupons = COUPONS.slice();
      main.innerHTML = `<h1 style="font-size:20px;margin-bottom:18px">کدهای تخفیف</h1>
        <div class="admin-card">
          <div class="promo-row"><input id="cpCode" placeholder="کد (مثلاً SPRING25)" style="text-transform:uppercase"><input id="cpPct" type="number" min="1" max="90" placeholder="٪" style="width:90px"><button class="btn btn-primary" id="cpAdd">افزودن کد</button></div>
          <table class="data-table"><thead><tr><th>کد</th><th>تخفیف</th><th>وضعیت</th></tr></thead><tbody id="cpRows"></tbody></table>
        </div>`;
      const draw = () => { $("#cpRows").innerHTML = coupons.map((c, i) => `<tr><td><b>${c.code}</b></td><td>${faNum(c.pct)}٪</td><td><span class="status-pill status-delivered">فعال</span></td></tr>`).join(""); };
      draw();
      $("#cpAdd").onclick = () => {
        const code = $("#cpCode").value.trim().toUpperCase(), pct = +$("#cpPct").value;
        if (!code || !pct) { toast("کد و درصد تخفیف را وارد کنید.", "error"); return; }
        coupons.push({ code, pct, active: true }); toast("کد تخفیف ساخته شد.", "success"); draw();
      };
    },
    analytics: () => {
      main.innerHTML = `
        <div class="metric-grid">
          <div class="metric"><div class="m-num">${faNum("3.8")}٪</div><div class="m-lbl">نرخ تبدیل</div></div>
          <div class="metric"><div class="m-num">${money(86.4)}</div><div class="m-lbl">میانگین ارزش سفارش</div></div>
          <div class="metric"><div class="m-num">${faNum("2.1")}٪</div><div class="m-lbl">نرخ مرجوعی</div></div>
          <div class="metric"><div class="m-num">${faNum(42)} ثانیه</div><div class="m-lbl">میانگین زمان تسویه</div></div>
        </div>
        <div class="admin-card"><h3>درآمد هفتگی</h3><div class="bar-chart">${[620, 780, 700, 940, 860, 1120, 1010, 1240].map((v, i) =>
          `<div class="bar-col"><div class="bar" style="height:${Math.round(v / 1240 * 100)}%"></div><span class="bar-lbl">هفته ${faNum(i + 1)}</span></div>`).join("")}</div></div>
        <div class="admin-card"><h3>سفارش‌ها بر اساس دسته‌بندی</h3>
          ${CATEGORIES.map(c => { const n = P.filter(p => p.category === c.id).reduce((s, p) => s + p.reviews, 0); const max = Math.max(...CATEGORIES.map(cc => P.filter(p => p.category === cc.id).reduce((s, p) => s + p.reviews, 0))); return `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600"><span>${c.icon} ${c.name}</span><span>${faNum(Math.round(n / 10))} سفارش</span></div><div class="stock-bar" style="margin-top:5px"><div class="stock-fill" style="width:${Math.round(n / max * 100)}%"></div></div></div>`; }).join("")}
        </div>`;
    },
    settings: () => {
      const s = Store.settings();
      main.innerHTML = `<div class="admin-card" style="max-width:560px"><h3>تنظیمات فروشگاه</h3>
        <div class="field"><label>نام فروشگاه</label><input id="stName" value="${escapeHtml(s.name)}"></div>
        <div class="field"><label>واحد پول</label><select id="stCur"><option>USD</option><option>EUR</option><option>GBP</option></select></div>
        <div class="field"><label>حد ارسال رایگان (تومان)</label><input id="stShip" type="number" value="${s.freeShip}"></div>
        <button class="btn btn-primary" id="stSave">ذخیره تنظیمات</button></div>`;
      $("#stCur").value = s.currency;
      $("#stSave").onclick = () => { Store.saveSettings({ name: $("#stName").value, currency: $("#stCur").value, freeShip: +$("#stShip").value }); toast("تنظیمات ذخیره شد.", "success"); };
    },
  };

  function productForm(existing) {
    const p = existing || { id: Date.now(), name: "", slug: "", description: "", category: "clothing", subcategory: "", brand: "Apna Basics", price: 0, salePrice: null, discount: 0, images: ["📦", "📦", "📦"], rating: 0, reviews: 0, stock: 10, sku: "APN-NEW-" + Math.floor(Math.random() * 9000 + 1000), colors: ["پیش‌فرض"], sizes: ["تک‌سایز"], featured: false, bestSeller: false, newArrival: true, flash: false };
    const back = document.createElement("div");
    back.className = "modal-backdrop show";
    back.innerHTML = `<div class="qv" style="max-width:760px"><button class="qv-close" aria-label="بستن">✕</button>
      <h2 style="margin-bottom:18px">${existing ? "ویرایش" : "افزودن"} محصول</h2>
      <div class="modal-form-grid">
        <div class="field full"><label>نام محصول *</label><input id="pf" value="${escapeHtml(p.name)}"></div>
        <div class="field full"><label>توضیحات</label><textarea id="pfd" rows="3">${escapeHtml(p.description)}</textarea></div>
        <div class="field"><label>دسته‌بندی</label><select id="pfc">${CATEGORIES.map(c => `<option value="${c.id}" ${c.id === p.category ? "selected" : ""}>${c.name}</option>`).join("")}</select></div>
        <div class="field"><label>برند</label><input id="pfb" value="${escapeHtml(p.brand)}"></div>
        <div class="field"><label>کد کالا</label><input id="pfs" value="${escapeHtml(p.sku)}"></div>
        <div class="field"><label>قیمت (تومان)</label><input id="pfp" type="number" step="0.01" value="${p.price}"></div>
        <div class="field"><label>قیمت حراج (تومان)</label><input id="pfsp" type="number" step="0.01" value="${p.salePrice ?? ""}" placeholder="—"></div>
        <div class="field"><label>موجودی</label><input id="pfst" type="number" value="${p.stock}"></div>
        <div class="field"><label>درصد تخفیف</label><input id="pfdis" type="number" value="${p.discount}"></div>
        <div class="field"><label>ایموجی‌های تصویر (با کاما جدا کنید)</label><input id="pfi" value="${p.images.join(",")}"></div>
        <div class="field"><label>رنگ‌ها (با کاما جدا کنید)</label><input id="pfco" value="${p.colors.join(",")}"></div>
        <div class="field"><label>سایزها (با کاما جدا کنید)</label><input id="pfz" value="${p.sizes.join(",")}"></div>
        <div class="field full"><label style="display:flex;gap:18px;font-size:13.5px">
          <label class="check-row"><input type="checkbox" id="pffe" ${p.featured ? "checked" : ""}> ویژه</label>
          <label class="check-row"><input type="checkbox" id="pfbe" ${p.bestSeller ? "checked" : ""}> پرفروش</label>
          <label class="check-row"><input type="checkbox" id="pfna" ${p.newArrival ? "checked" : ""}> جدید</label>
        </label></div>
      </div>
      <button class="btn btn-primary btn-block" id="pfSave">${existing ? "ذخیره تغییرات" : "ساخت محصول"}</button></div>`;
    document.body.appendChild(back);
    back.querySelector(".qv-close").onclick = () => back.remove();
    back.onclick = e => { if (e.target === back) back.remove(); };
    $("#pfSave", back).onclick = () => {
      const v = id => $("#" + id, back).value;
      const name = v("pf").trim();
      if (!name) { toast("نام محصول الزامی است.", "error"); return; }
      const price = +v("pfp") || 0, sp = v("pfsp") ? +v("pfsp") : null, dis = sp ? Math.round((1 - sp / price) * 100) : 0;
      const updated = {
        ...p, name, slug: p.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        description: v("pfd"), category: v("pfc"), brand: v("pfb"), sku: v("pfs"),
        price, salePrice: sp, discount: dis, stock: +v("pfst") || 0,
        images: v("pfi").split(",").map(x => x.trim()).filter(Boolean).slice(0, 3),
        colors: v("pfco").split(",").map(x => x.trim()).filter(Boolean),
        sizes: v("pfz").split(",").map(x => x.trim()).filter(Boolean),
        featured: $("#pffe", back).checked, bestSeller: $("#pfbe", back).checked, newArrival: $("#pfna", back).checked,
      };
      const list = Store.products();
      if (existing) { const i = list.findIndex(x => x.id === existing.id); list[i] = updated; }
      else list.unshift(updated);
      Store.saveProducts(list);
      toast(existing ? "محصول به‌روزرسانی شد." : "محصول ساخته شد.", "success");
      back.remove(); renderAdmin("products");
    };
  }

  views[view]();
}
