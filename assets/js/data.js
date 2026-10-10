/* ============ APNA STORE — Data Layer (فارسی) ============ */
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
/* تبدیل ارقام لاتین به فارسی (متن‌های نمایشی) */
const faNum = s => String(s).replace(/\d/g, d => FA_DIGITS[d]).replace(/\./g, "٫");

/* برچسب فارسی وضعیت سفارش (مقادیر داخلی لاتین می‌مانند) */
const STATUS_FA = {
  "Order Placed": "ثبت سفارش", "Confirmed": "تأیید شده", "Processing": "در حال پردازش",
  "Shipped": "ارسال شده", "Out for Delivery": "در حال تحویل", "Delivered": "تحویل شده", "Cancelled": "لغو شده",
};
const stFa = s => STATUS_FA[s] || s;

const CATEGORIES = [
  { id: "clothing",    name: "پوشاک",               slug: "clothing",    icon: "👕", grad: ["#EAF2FF", "#D7E6FB"], desc: "اساس‌های روزمره و استایل‌های خاص مد." },
  { id: "shoes",       name: "کفش",                 slug: "shoes",       icon: "👟", grad: ["#EFF4FA", "#DCE6F2"], desc: "کفش‌های دویدن، رسمی و اسپرت برای هر روز." },
  { id: "cosmetics",   name: "آرایشی و بهداشتی",     slug: "cosmetics",   icon: "💄", grad: ["#FDEFF5", "#F9DCE9"], desc: "مراقبت پوست و زیبایی از برندهای معتبر." },
  { id: "electronics", name: "لوازم الکترونیکی",     slug: "electronics", icon: "🎧", grad: ["#EDF1F7", "#D9E2EF"], desc: "صوت، ساعت هوشمند و گجت‌های کاربردی." },
  { id: "accessories", name: "اکسسوری",             slug: "accessories", icon: "🎒", grad: ["#F3F0FA", "#E4DEF2"], desc: "ساعت، کیف و همراهان روزمره شما." },
  { id: "jewelry",     name: "جواهرات",             slug: "jewelry",     icon: "💎", grad: ["#FDF6E9", "#F6E7C8"], desc: "طلا، نقره و جواهرات چشم‌نواز." },
];

const PRODUCTS = [
  // ---- پوشاک ----
  { id: 1, name: "هودی نخ پنبه پریمیوم", slug: "premium-cotton-hoodie", category: "clothing", subcategory: "هودی", brand: "Apna Basics",
    price: 49.99, salePrice: 39.99, discount: 20, images: ["🧥", "👕", "🧣"], rating: 4.8, reviews: 214, stock: 12, sku: "APN-CL-1001",
    colors: ["سرمه‌ای", "طوسی", "مشکی"], sizes: ["S", "M", "L", "XL"], featured: true, bestSeller: true, rank: 1, newArrival: false, flash: true,
    description: "هودی پنبه‌ای پریمیوم با جنس ۳۸۰ گرمی، آستر فلیس نرم، درزگیری مقاوم و فیت مدرن و راحت. پیش‌شسته و آنزیم‌شده برای نرمی ماندگار." },
  { id: 2, name: "ژاکت جین کلاسیک", slug: "classic-denim-jacket", category: "clothing", subcategory: "ژاکت", brand: "Apna Basics",
    price: 79.99, salePrice: null, discount: 0, images: ["🧥", "👖", "🎽"], rating: 4.6, reviews: 132, stock: 38, sku: "APN-CL-1002",
    colors: ["نیلی", "مشکی"], sizes: ["S", "M", "L", "XL"], featured: true, bestSeller: false, newArrival: true, flash: false,
    description: "ژاکت جین کلاسیک و بی‌زمان با پارچه ۱۲ اونسی، یراق مسی، دو جیب سینه و دوخت اختصاصی که زیر هر لباسی زیبا می‌نشیند." },
  { id: 3, name: "تی‌شرت طرح‌دار اوربان", slug: "urban-graphic-tee", category: "clothing", subcategory: "تی‌شرت", brand: "StreetLab",
    price: 24.99, salePrice: null, discount: 0, images: ["👕", "🧢", "🩳"], rating: 4.4, reviews: 98, stock: 120, sku: "APN-CL-1003",
    colors: ["سفید", "سرمه‌ای", "شنی"], sizes: ["S", "M", "L", "XL", "XXL"], featured: false, bestSeller: false, newArrival: true, flash: false,
    description: "تی‌شرت پنبه ارگانیک و خنک با چاپ نرم و یقه بدون برچسب برای راحتی تمام‌روز." },
  { id: 4, name: "پلیور مخلوط کشمیر", slug: "cashmere-blend-sweater", category: "clothing", subcategory: "بافت", brand: "Nord & Co",
    price: 89.99, salePrice: 69.99, discount: 22, images: ["🧶", "🧥", "👖"], rating: 4.7, reviews: 76, stock: 22, sku: "APN-CL-1004",
    colors: ["جوی", "ذغالی", "سبز جنگلی"], sizes: ["S", "M", "L"], featured: false, bestSeller: false, newArrival: true, flash: false,
    description: "بافت ظریف از مخلوط کشمیر با بافت کابلی، مچ محکم و فرمی که فصل به فصل شکل خود را حفظ می‌کند." },
  // ---- کفش ----
  { id: 5, name: "کتانی دویدن اوربان", slug: "urban-runner-sneakers", category: "shoes", subcategory: "کتانی", brand: "Velocity",
    price: 89.99, salePrice: 69.99, discount: 22, images: ["👟", "🏃", "🧦"], rating: 4.9, reviews: 341, stock: 8, sku: "APN-SH-2001",
    colors: ["سفید/آبی", "مشکی", "طوسی"], sizes: ["40", "41", "42", "43", "44"], featured: true, bestSeller: true, rank: 2, newArrival: false, flash: true,
    description: "رویه بافت سبک، میان‌کف فوم واکنش‌گرا و زیره لاستیکی چسبنده؛ مهندسی‌شده برای قدم‌زدن شهری و راحتی تمام‌روز." },
  { id: 6, name: "کفش چرم رسمی آکسفورد", slug: "formal-leather-oxfords", category: "shoes", subcategory: "رسمی", brand: "Ellington",
    price: 119.99, salePrice: null, discount: 0, images: ["👞", "🧦", "🧳"], rating: 4.5, reviews: 88, stock: 30, sku: "APN-SH-2002",
    colors: ["مشکی", "قهوه‌ای"], sizes: ["40", "41", "42", "43", "44"], featured: false, bestSeller: false, newArrival: false, flash: false,
    description: "کفش آکسفورد چرم طبیعی دست‌دوز با زیره گودی‌یر و کفی طبیعی نرم — آماده محیط‌های رسمی." },
  { id: 7, name: "کتانی ساق‌بلند کورت", slug: "court-high-tops", category: "shoes", subcategory: "کتانی", brand: "Velocity",
    price: 99.99, salePrice: 79.99, discount: 20, images: ["👟", "🏀", "🧦"], rating: 4.6, reviews: 154, stock: 44, sku: "APN-SH-2003",
    colors: ["سفید", "سرمه‌ای"], sizes: ["40", "41", "42", "43"], featured: false, bestSeller: false, newArrival: true, flash: false,
    description: "طرح کلاسیک کورت با یقه پدینگ‌دار، زیره ولکانیزه و رویه چرم پریمیوم بازسازی‌شده." },
  { id: 8, name: "کفش کانواس مینیمال", slug: "minimal-canvas-loafers", category: "shoes", subcategory: "روزمره", brand: "StreetLab",
    price: 45.99, salePrice: null, discount: 0, images: ["🥾", "👖", "🧦"], rating: 4.3, reviews: 64, stock: 60, sku: "APN-SH-2004",
    colors: ["شنی", "سرمه‌ای"], sizes: ["40", "41", "42", "43", "44"], featured: false, bestSeller: false, newArrival: false, flash: false,
    description: "لوفر کانواس آسان‌پوش با زیره انعطاف‌پذیر دوخت‌دار و پشتی فوم مموری برای استایل راحت تابستانی." },
  // ---- آرایشی و بهداشتی ----
  { id: 9, name: "ست لوکس مراقبت پوست", slug: "luxury-skin-care-set", category: "cosmetics", subcategory: "مراقبت پوست", brand: "Lumière",
    price: 59.99, salePrice: 44.99, discount: 25, images: ["🧴", "💄", "🧖"], rating: 4.8, reviews: 187, stock: 15, sku: "APN-CO-3001",
    colors: ["کلاسیک"], sizes: ["ست"], featured: true, bestSeller: true, rank: 3, newArrival: false, flash: true,
    description: "یک روتین چهارتکه: شوینده ملایم، سرم ویتامین C، مرطوب‌کننده هیالورونیک و ماسک شبانه. تست‌شده توسط متخصص پوست و بدون آزمایش حیوانی." },
  { id: 10, name: "رژ لب مخملی مات", slug: "velvet-matte-lipstick", category: "cosmetics", subcategory: "آرایش", brand: "Lumière",
    price: 19.99, salePrice: null, discount: 0, images: ["💄", "💋", "🪞"], rating: 4.5, reviews: 210, stock: 85, sku: "APN-CO-3002",
    colors: ["یاقوتی", "نود", "مرجانی"], sizes: ["3.5g"], featured: false, bestSeller: false, newArrival: true, flash: false,
    description: "پیگمنت مات مخملی و سبک با ماندگاری تا ۱۰ ساعت بدون خشکی — غنی‌شده با جوجوبا و ویتامین E." },
  { id: 11, name: "سرم کرم‌پودر درخشنده", slug: "glow-foundation-serum", category: "cosmetics", subcategory: "آرایش", brand: "Lumière",
    price: 34.99, salePrice: null, discount: 0, images: ["🧴", "✨", "🪞"], rating: 4.4, reviews: 122, stock: 50, sku: "APN-CO-3003",
    colors: ["روشن", "متوسط", "برنزه"], sizes: ["30ml"], featured: false, bestSeller: false, newArrival: false, flash: false,
    description: "کرم‌پودر حاوی مواد مراقبتی با پوشش متوسط و قابل تنظیم و فینیش طبیعی درخشان. دارای SPF 20." },
  { id: 12, name: "اسپری صورت گلاب", slug: "rose-water-face-mist", category: "cosmetics", subcategory: "مراقبت پوست", brand: "Herbalia",
    price: 16.99, salePrice: 12.99, discount: 24, images: ["🌹", "💧", "🧴"], rating: 4.6, reviews: 143, stock: 90, sku: "APN-CO-3004",
    colors: ["کلاسیک"], sizes: ["100ml"], featured: false, bestSeller: false, newArrival: false, flash: false,
    description: "گلاب تقطیرشده گل محمدی که در یک اسپری، پوست را آبرسانی، آرام و تثبیت می‌کند." },
  // ---- لوازم الکترونیکی ----
  { id: 13, name: "هدفون بی‌سیم پرو", slug: "wireless-headphones-pro", category: "electronics", subcategory: "صوتی", brand: "SonicWave",
    price: 129.99, salePrice: 99.99, discount: 23, images: ["🎧", "🎵", "📲"], rating: 4.9, reviews: 428, stock: 10, sku: "APN-EL-4001",
    colors: ["شبانه", "نقره‌ای", "آبی"], sizes: ["تک‌سایز"], featured: true, bestSeller: true, rank: 1, newArrival: false, flash: true,
    description: "حذف نویز فعال هیبریدی، باتری ۴۰ ساعته، بلوتوث 5.3 مولتی‌پوینت و کوسن فوم مموری برای ساعت‌ها گوش دادن." },
  { id: 14, name: "ساعت هوشمند سری X", slug: "smart-watch-series-x", category: "electronics", subcategory: "پوشیدنی", brand: "SonicWave",
    price: 199.99, salePrice: null, discount: 0, images: ["⌚", "❤️", "🏃"], rating: 4.7, reviews: 256, stock: 40, sku: "APN-EL-4002",
    colors: ["مشکی", "نقره‌ای"], sizes: ["42mm", "46mm"], featured: true, bestSeller: false, newArrival: true, flash: false,
    description: "نمایشگر AMOLED همیشه‌روشن، GPS دو‌باند، ضربان قلب و SpO2، باتری ۱۴ روزه و بیش از ۱۲۰ حالت ورزشی." },
  { id: 15, name: "دوربین ورزشی 4K", slug: "4k-action-camera", category: "electronics", subcategory: "دوربین", brand: "ApexGear",
    price: 149.99, salePrice: 119.99, discount: 20, images: ["📷", "🏄", "🏔️"], rating: 4.5, reviews: 97, stock: 25, sku: "APN-EL-4003",
    colors: ["مشکی"], sizes: ["تک‌سایز"], featured: false, bestSeller: false, newArrival: true, flash: false,
    description: "ضبط واقعی 4K60، لرزشگیر ۶ محوره، ضدآب تا ۱۰ متر بدون کاور و نمایشگر لمسی ۲.۴ اینچی." },
  { id: 16, name: "اسپیکر بلوتوث قابل‌حمل", slug: "portable-bluetooth-speaker", category: "electronics", subcategory: "صوتی", brand: "SonicWave",
    price: 59.99, salePrice: null, discount: 0, images: ["🔊", "🎶", "🏖️"], rating: 4.4, reviews: 176, stock: 70, sku: "APN-EL-4004",
    colors: ["مشکی", "آبی", "شنی"], sizes: ["تک‌سایز"], featured: false, bestSeller: false, newArrival: false, flash: false,
    description: "صدای ۳۶۰ درجه با بیس عمیق، ضدآب IPX7، ۲۰ ساعت پخش و اتصال استریو برای دو برابر شدن قدرت صدا." },
  // ---- اکسسوری ----
  { id: 17, name: "ساعت چرم کلاسیک", slug: "classic-leather-watch", category: "accessories", subcategory: "ساعت", brand: "Ellington",
    price: 149.99, salePrice: null, discount: 0, images: ["⌚", "⏱️", "🧳"], rating: 4.8, reviews: 165, stock: 28, sku: "APN-AC-5001",
    colors: ["قهوه‌ای/مشکی", "مشکی/مشکی"], sizes: ["40mm"], featured: true, bestSeller: false, newArrival: false, flash: false,
    description: "موتور کوارتز ژاپنی داخل قفل استیل مات، با بند چرم ایتالیایی دست‌دوز. مقاوم تا ۵ ATM." },
  { id: 18, name: "عینک آفتابی آویاتور", slug: "aviator-sunglasses", category: "accessories", subcategory: "عینک", brand: "StreetLab",
    price: 39.99, salePrice: 29.99, discount: 25, images: ["🕶️", "🌞", "🧳"], rating: 4.5, reviews: 118, stock: 55, sku: "APN-AC-5002",
    colors: ["طلایی/سبز", "نقره‌ای/طوسی"], sizes: ["تک‌سایز"], featured: false, bestSeller: false, newArrival: true, flash: false,
    description: "لنز پلاریزه UV400 در فریم فلزی فوق‌سبک با پد بینی سیلیکونی و کیف محکم." },
  { id: 19, name: "کیف چرم دوشی", slug: "leather-crossbody-bag", category: "accessories", subcategory: "کیف", brand: "Ellington",
    price: 79.99, salePrice: 59.99, discount: 25, images: ["👜", "👛", "🧳"], rating: 4.6, reviews: 84, stock: 20, sku: "APN-AC-5003",
    colors: ["برنزه", "مشکی"], sizes: ["تک‌سایز"], featured: true, bestSeller: false, newArrival: false, flash: false,
    description: "کیف دوشی چرم طبیعی با درب مغناطیسی، جای کارت و بند قابل تنظیم. جا برای تبلت ۸ اینچی." },
  { id: 20, name: "کوله‌پشتی کانواس", slug: "canvas-backpack", category: "accessories", subcategory: "کیف", brand: "Apna Basics",
    price: 49.99, salePrice: null, discount: 0, images: ["🎒", "📚", "🧳"], rating: 4.4, reviews: 141, stock: 65, sku: "APN-AC-5004",
    colors: ["سرمه‌ای", "زیتونی", "مشکی"], sizes: ["22L"], featured: false, bestSeller: false, newArrival: false, flash: false,
    description: "کانواس واکس‌کاری‌شده و ضدآب با محفظه لپ‌تاپ ۱۵ اینچی پدینگ‌دار، درب رول‌آپ و بندهای چرمی." },
  // ---- جواهرات ----
  { id: 21, name: "گردنبند طرح‌دار طلایی", slug: "gold-statement-necklace", category: "jewelry", subcategory: "گردنبند", brand: "Aurum",
    price: 79.99, salePrice: null, discount: 0, images: ["📿", "✨", "💎"], rating: 4.7, reviews: 92, stock: 18, sku: "APN-JW-6001",
    colors: ["طلایی", "رزگلد"], sizes: ["45cm"], featured: true, bestSeller: false, newArrival: false, flash: false,
    description: "زنجیر استیتمنت با آبکاری ۱۸ عیار طلا، قفل مطمئن و پوشش ضدسیاه‌شدگی — جسورانه و مناسب استفاده روزمره." },
  { id: 22, name: "گوشواره نقره استرلینگ", slug: "sterling-silver-earrings", category: "jewelry", subcategory: "گوشواره", brand: "Aurum",
    price: 34.99, salePrice: null, discount: 0, images: ["💎", "✨", "🎁"], rating: 4.6, reviews: 108, stock: 42, sku: "APN-JW-6002",
    colors: ["نقره‌ای"], sizes: ["تک‌سایز"], featured: false, bestSeller: false, newArrival: true, flash: false,
    description: "گوشواره آویز نقره ۹۲۵ با میله ضدحساسیت و پرداخت آینه‌ای براق." },
  { id: 23, name: "دستبند چارم", slug: "charm-bracelet", category: "jewelry", subcategory: "دستبند", brand: "Aurum",
    price: 29.99, salePrice: 24.99, discount: 17, images: ["🧿", "✨", "🎁"], rating: 4.3, reviews: 61, stock: 48, sku: "APN-JW-6003",
    colors: ["نقره‌ای", "طلایی"], sizes: ["18cm", "20cm"], featured: false, bestSeller: false, newArrival: false, flash: false,
    description: "دستبند حلقه‌ای ظریف با سه چارم جدا‌شدنی — هدیه‌ای خاطره‌انگیز که با داستان شما بزرگ می‌شود." },
  { id: 24, name: "ست آویز مروارید", slug: "pearl-pendant-set", category: "jewelry", subcategory: "ست", brand: "Aurum",
    price: 99.99, salePrice: 79.99, discount: 20, images: ["🤍", "💍", "🎁"], rating: 4.8, reviews: 73, stock: 14, sku: "APN-JW-6004",
    colors: ["طلای سفید"], sizes: ["تک‌سایز"], featured: true, bestSeller: false, newArrival: true, flash: false,
    description: "آویز مروارید آب شیرین همراه با گوشواره ست، در جعبه هدیه — ظرافتی ماندگار برای هر مناسبت." },
];

const TESTIMONIALS = [
  { name: "سارا میچل", initials: "SM", stars: 5, text: "بهترین تجربه خرید آنلاینی که تا حالا داشته‌ام. کیفیت هودی فوق‌العاده بود و بسته دو روز زودتر رسید. APNA STORE حالا انتخاب اول من است." },
  { name: "جیمز کارتر", initials: "JC", stars: 5, text: "هدفون بی‌سیم پرو را در حراج لحظه‌ای سفارش دادم — کالای اورجینال، بسته‌بندی شیک و پشتیبانی که ظرف چند دقیقه پاسخ داد." },
  { name: "آملیا رودریگز", initials: "AR", stars: 4, text: "ست مراقبت پوست ارزش هر ریالش را داشت. سیاست بازگشت آسان باعث شد با خیال راحت امتحانش کنم و حالا سفارش سومم را ثبت کرده‌ام." },
  { name: "دانیال کیم", initials: "DK", stars: 5, text: "سایت تمیز، پرداخت سریع و کتانی دقیقاً مطابق راهنمای سایز. خرید اینترنتی باید همین‌طور باشد." },
  { name: "پریا شارما", initials: "PS", stars: 5, text: "ست مروارید را کادو خریدم و در جعبه‌ای زیبا با یادداشت دست‌نویس رسید. همه‌جا حس پریمیوم می‌داد." },
  { name: "عمر حداد", initials: "OH", stars: 4, text: "قیمت‌های خوب بخش الکترونیکی و خط زمانی پیگیری سفارش که در هر مرحله خبرم کرد. فروشگاه فوق‌العاده‌ای است." },
];

const COUPONS = [
  { code: "SAVE10", pct: 10, active: true },
  { code: "WELCOME15", pct: 15, active: true },
  { code: "FLASH20", pct: 20, active: true },
];

const BRANDS = [...new Set(PRODUCTS.map(p => p.brand))];
const SIZES = [...new Set(PRODUCTS.flatMap(p => p.sizes))].filter(s => ["XS","S","M","L","XL","XXL"].includes(s));
const COLOR_NAMES = [...new Set(PRODUCTS.flatMap(p => p.colors))];
