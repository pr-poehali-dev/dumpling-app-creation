import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/e71a65ff-0d66-4b51-aef0-ef1c1d52adc9/files/15ac7936-4a62-4159-8ad0-c98d8cac3bda.jpg";

const MENU_ITEMS = [
  {
    id: 1,
    category: "Позы",
    name: "Позы классические",
    desc: "Сочная говядина со свининой, тесто ручной работы",
    price: 420,
    weight: "300г / 4 шт",
    emoji: "🥟",
    badge: "Хит",
  },
  {
    id: 2,
    category: "Позы",
    name: "Позы с бараниной",
    desc: "Нежная баранина с луком и специями по-восточному",
    price: 480,
    weight: "300г / 4 шт",
    emoji: "🥟",
    badge: null,
  },
  {
    id: 3,
    category: "Вареники",
    name: "Вареники с картошкой",
    desc: "Картофельное пюре с жареным лучком, сметана в подарок",
    price: 290,
    weight: "250г / 8 шт",
    emoji: "🫔",
    badge: "Новинка",
  },
  {
    id: 4,
    category: "Вареники",
    name: "Вареники с вишней",
    desc: "Спелая вишня с сахаром, подаются с домашней сметаной",
    price: 310,
    weight: "250г / 8 шт",
    emoji: "🍒",
    badge: null,
  },
  {
    id: 5,
    category: "Пельмени",
    name: "Пельмени домашние",
    desc: "Фарш три вида мяса, тесто раскатано вручную",
    price: 350,
    weight: "350г / 12 шт",
    emoji: "⭕",
    badge: "Хит",
  },
  {
    id: 6,
    category: "Пельмени",
    name: "Пельмени сибирские",
    desc: "Говяжий фарш с кедровым орехом, сибирский рецепт",
    price: 390,
    weight: "350г / 12 шт",
    emoji: "⭕",
    badge: null,
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Анна М.",
    text: "Позы просто восхитительные! Тесто тонкое, начинка сочная. Привезли быстро и горячими.",
    rating: 5,
    date: "28 марта",
  },
  {
    id: 2,
    name: "Дмитрий К.",
    text: "Заказываю каждую неделю. Пельмени как у бабушки — настоящие, домашние. Рекомендую!",
    rating: 5,
    date: "25 марта",
  },
  {
    id: 3,
    name: "Светлана В.",
    text: "Вареники с вишней — просто песня! Дети в восторге. Спасибо за домашнюю еду с душой.",
    rating: 5,
    date: "20 марта",
  },
];

const TRACKING_STEPS = [
  { id: 1, label: "Принят", icon: "ClipboardCheck", done: true, active: false },
  { id: 2, label: "Готовим", icon: "ChefHat", done: true, active: false },
  { id: 3, label: "В пути", icon: "Bike", done: false, active: true },
  { id: 4, label: "Доставлен", icon: "Home", done: false, active: false },
];

type Page = "home" | "menu" | "about" | "cart" | "reviews" | "contacts" | "profile" | "history";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<{ item: typeof MENU_ITEMS[0]; qty: number }[]>([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const categories = ["Все", "Позы", "Вареники", "Пельмени"];

  const filteredMenu =
    activeCategory === "Все"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.category === activeCategory);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.item.price * c.qty, 0);

  const addToCart = (item: typeof MENU_ITEMS[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) return prev.map((c) => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === id);
      if (existing && existing.qty > 1) return prev.map((c) => c.item.id === id ? { ...c, qty: c.qty - 1 } : c);
      return prev.filter((c) => c.item.id !== id);
    });
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setPage("history");
  };

  return (
    <div className="min-h-screen bg-background folk-pattern flex flex-col max-w-md mx-auto relative">
      {/* Шапка */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <div onClick={() => setPage("home")} className="cursor-pointer">
          <div className="handwritten text-2xl text-primary font-bold leading-none">Бабушкина</div>
          <div className="text-xs text-muted-foreground font-body tracking-widest uppercase">кухня</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage("cart")}
            className="relative p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <Icon name="ShoppingBag" size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setPage("profile")} className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Icon name="User" size={22} />
          </button>
        </div>
      </header>

      {/* Контент */}
      <main className="flex-1 overflow-y-auto pb-24">

        {/* === ГЛАВНАЯ === */}
        {page === "home" && (
          <div className="animate-fade-in">
            <div className="relative overflow-hidden">
              <img
                src={HERO_IMAGE}
                alt="Домашняя еда"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <div className="handwritten text-4xl font-bold leading-tight">
                  С душой и<br />любовью 🤍
                </div>
                <p className="font-body text-sm mt-1 opacity-80">Домашние позы, вареники и пельмени</p>
              </div>
            </div>

            <div className="px-4 py-5">
              <div className="handwritten text-xl text-primary mb-4">Что приготовить сегодня?</div>
              <div className="grid grid-cols-3 gap-3">
                {(["Позы", "Вареники", "Пельмени"] as const).map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => { setPage("menu"); setActiveCategory(cat); }}
                    className="rounded-2xl p-4 flex flex-col items-center gap-2 border border-border bg-card hover:border-primary transition-all"
                    style={{ opacity: 0, animation: `fade-in 0.5s ease-out ${i * 0.1 + 0.2}s forwards` }}
                  >
                    <span className="text-3xl">{cat === "Позы" ? "🥟" : cat === "Вареники" ? "🫔" : "⭕"}</span>
                    <span className="font-body text-sm font-medium">{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pb-5">
              <div className="flex items-center justify-between mb-4">
                <div className="handwritten text-xl text-primary">Хиты продаж</div>
                <button onClick={() => setPage("menu")} className="text-xs text-primary underline font-body">Всё меню</button>
              </div>
              <div className="space-y-3">
                {MENU_ITEMS.filter(i => i.badge === "Хит").map((item) => (
                  <div key={item.id} className="menu-card bg-card rounded-2xl border border-border overflow-hidden flex">
                    <div className="w-24 h-24 bg-secondary flex items-center justify-center text-5xl flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <div className="font-body font-semibold text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.desc}</div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <span className="handwritten text-lg text-primary font-bold">{item.price} ₽</span>
                          <span className="text-xs text-muted-foreground ml-1">{item.weight}</span>
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                          <Icon name="Plus" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-4 mb-5 rounded-2xl bg-primary p-5 text-primary-foreground">
              <div className="handwritten text-2xl mb-1">Бесплатная доставка</div>
              <p className="font-body text-sm opacity-80">При заказе от 800 ₽ доставим прямо к вашей двери</p>
              <button onClick={() => setPage("menu")} className="mt-3 bg-primary-foreground text-primary text-sm font-body font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
                Заказать
              </button>
            </div>

            <div className="px-4 pb-5">
              <div className="handwritten text-xl text-primary mb-4">Что говорят гости</div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-accent text-sm">★</span>)}
                  <span className="text-xs text-muted-foreground ml-1 font-body">5.0 · 128 отзывов</span>
                </div>
                <p className="font-body text-sm text-foreground/80 italic serif-display">"{REVIEWS[0].text}"</p>
                <div className="mt-2 text-xs text-muted-foreground font-body">— {REVIEWS[0].name}</div>
              </div>
              <button onClick={() => setPage("reviews")} className="mt-3 w-full text-center text-sm text-primary underline font-body">
                Читать все отзывы
              </button>
            </div>
          </div>
        )}

        {/* === МЕНЮ === */}
        {page === "menu" && (
          <div className="animate-fade-in">
            <div className="px-4 pt-5 pb-3">
              <h1 className="handwritten text-3xl text-primary">Наше меню</h1>
              <p className="font-body text-sm text-muted-foreground mt-1">Всё готовится с любовью вручную</p>
            </div>
            <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="px-4 space-y-4 pb-4">
              {filteredMenu.map((item, i) => (
                <div
                  key={item.id}
                  className="menu-card bg-card rounded-2xl border border-border overflow-hidden"
                  style={{ opacity: 0, animation: `fade-in 0.4s ease-out ${i * 0.07}s forwards` }}
                >
                  <div className="h-40 bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
                    <span className="text-7xl">{item.emoji}</span>
                    {item.badge && (
                      <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-body font-bold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-body font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                        <span className="text-xs text-muted-foreground/60 mt-1 block">{item.weight}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="handwritten text-2xl text-primary font-bold">{item.price} ₽</span>
                      <div className="flex items-center gap-2">
                        {cart.find(c => c.item.id === item.id) && (
                          <>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                            >
                              <Icon name="Minus" size={14} />
                            </button>
                            <span className="font-body font-bold w-5 text-center">
                              {cart.find(c => c.item.id === item.id)?.qty}
                            </span>
                          </>
                        )}
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                          <Icon name="Plus" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === О НАС === */}
        {page === "about" && (
          <div className="animate-fade-in px-4 pt-5">
            <h1 className="handwritten text-3xl text-primary mb-2">О нас</h1>
            <div className="relative rounded-2xl overflow-hidden mb-5 h-48">
              <img src={HERO_IMAGE} alt="О нас" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-primary-foreground handwritten text-2xl">С 2015 года</div>
            </div>
            <div className="space-y-4 font-body text-sm leading-relaxed text-foreground/80">
              <p className="serif-display text-base italic text-foreground">
                Мы — небольшая семейная мастерская домашней кухни, где каждое блюдо готовится по старинным рецептам.
              </p>
              <p>
                Наши позы, вареники и пельмени лепятся вручную каждое утро. Мы не используем полуфабрикаты — только свежее мясо, домашнее тесто и проверенные рецепты.
              </p>
              <p>
                Основатель кухни — Надежда Петровна, которая передала свои рецепты трём поколениям семьи. Сегодня мы готовим так же, как готовили наши бабушки.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { num: "128+", label: "отзывов" },
                { num: "2015", label: "год основания" },
                { num: "30 мин", label: "доставка" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-2xl p-3 text-center">
                  <div className="handwritten text-2xl text-primary font-bold">{stat.num}</div>
                  <div className="font-body text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === КОРЗИНА === */}
        {page === "cart" && (
          <div className="animate-fade-in px-4 pt-5">
            <h1 className="handwritten text-3xl text-primary mb-4">Корзина</h1>
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛒</div>
                <div className="handwritten text-2xl text-muted-foreground">Корзина пустая</div>
                <p className="font-body text-sm text-muted-foreground mt-2">Добавьте что-нибудь из меню</p>
                <button onClick={() => setPage("menu")} className="mt-6 bg-primary text-primary-foreground font-body font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
                  Перейти в меню
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-5">
                  {cart.map(({ item, qty }) => (
                    <div key={item.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
                      <span className="text-3xl">{item.emoji}</span>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-sm">{item.name}</div>
                        <div className="handwritten text-primary">{item.price * qty} ₽</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="font-bold font-body w-5 text-center">{qty}</span>
                        <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-card border border-border rounded-2xl p-4 mb-4">
                  <div className="flex justify-between font-body text-sm mb-2">
                    <span className="text-muted-foreground">Сумма заказа</span>
                    <span>{cartTotal} ₽</span>
                  </div>
                  <div className="flex justify-between font-body text-sm mb-3">
                    <span className="text-muted-foreground">Доставка</span>
                    <span className={cartTotal >= 800 ? "text-green-600 font-semibold" : ""}>{cartTotal >= 800 ? "Бесплатно" : "150 ₽"}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-body font-bold">Итого</span>
                    <span className="handwritten text-xl text-primary font-bold">{cartTotal >= 800 ? cartTotal : cartTotal + 150} ₽</span>
                  </div>
                </div>
                <button onClick={placeOrder} className="w-full bg-primary text-primary-foreground font-body font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity text-base">
                  Оформить заказ
                </button>
              </>
            )}
          </div>
        )}

        {/* === ОТЗЫВЫ === */}
        {page === "reviews" && (
          <div className="animate-fade-in px-4 pt-5">
            <h1 className="handwritten text-3xl text-primary mb-2">Отзывы</h1>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">{[...Array(5)].map((_, i) => <span key={i} className="text-accent">★</span>)}</div>
              <span className="handwritten text-xl text-primary">5.0</span>
              <span className="font-body text-sm text-muted-foreground">· 128 отзывов</span>
            </div>
            <div className="space-y-4">
              {REVIEWS.map((review, i) => (
                <div
                  key={review.id}
                  className="bg-card border border-border rounded-2xl p-4"
                  style={{ opacity: 0, animation: `fade-in 0.4s ease-out ${i * 0.1}s forwards` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <span className="font-body font-bold text-sm text-primary">{review.name[0]}</span>
                      </div>
                      <span className="font-body font-semibold text-sm">{review.name}</span>
                    </div>
                    <span className="font-body text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex mb-2">{[...Array(review.rating)].map((_, j) => <span key={j} className="text-accent text-sm">★</span>)}</div>
                  <p className="font-body text-sm text-foreground/80 serif-display italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === КОНТАКТЫ === */}
        {page === "contacts" && (
          <div className="animate-fade-in px-4 pt-5">
            <h1 className="handwritten text-3xl text-primary mb-5">Контакты</h1>
            <div className="space-y-3">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                { icon: "MapPin", label: "Адрес", value: "ул. Народная, 12, центр" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Вс с 10:00 до 22:00" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "@babushkina_kuhnya" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={icon as "Phone"} size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-muted-foreground">{label}</div>
                    <div className="font-body font-semibold text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl overflow-hidden bg-secondary h-40 flex items-center justify-center border border-border">
              <div className="text-center">
                <Icon name="MapPin" size={32} className="text-primary mx-auto" />
                <div className="handwritten text-lg text-primary mt-2">Мы на карте</div>
                <p className="font-body text-xs text-muted-foreground">ул. Народная, 12</p>
              </div>
            </div>
          </div>
        )}

        {/* === ПРОФИЛЬ === */}
        {page === "profile" && (
          <div className="animate-fade-in px-4 pt-5">
            <h1 className="handwritten text-3xl text-primary mb-5">Профиль</h1>
            <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={32} className="text-primary" />
              </div>
              <div>
                <div className="font-body font-bold text-lg">Гость</div>
                <p className="font-body text-sm text-muted-foreground">Войдите чтобы сохранять заказы</p>
              </div>
            </div>
            <button className="w-full bg-primary text-primary-foreground font-body font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity mb-3">
              Войти / Зарегистрироваться
            </button>
            <div className="space-y-2">
              {[
                { icon: "Package", label: "История заказов" },
                { icon: "Heart", label: "Избранное" },
                { icon: "MapPin", label: "Мои адреса" },
                { icon: "Bell", label: "Уведомления" },
                { icon: "HelpCircle", label: "Помощь" },
              ].map(({ icon, label }) => (
                <button key={label} className="w-full bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name={icon as "Package"} size={18} className="text-primary" />
                    <span className="font-body text-sm">{label}</span>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* === ИСТОРИЯ ЗАКАЗОВ === */}
        {page === "history" && (
          <div className="animate-fade-in px-4 pt-5">
            <h1 className="handwritten text-3xl text-primary mb-4">История заказов</h1>

            {orderPlaced && (
              <div className="bg-card border-2 border-primary rounded-2xl p-4 mb-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-body font-bold text-sm">Заказ #1247</div>
                    <div className="font-body text-xs text-muted-foreground">Сегодня, 14:32</div>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs font-body font-semibold px-3 py-1 rounded-full">В пути</span>
                </div>

                {/* Трекинг доставки */}
                <div className="relative pt-1">
                  <div className="absolute top-6 left-5 right-5 h-0.5 bg-border" />
                  <div className="absolute top-6 left-5 h-0.5 bg-primary" style={{ width: "55%" }} />
                  <div className="flex justify-between relative z-10">
                    {TRACKING_STEPS.map((step) => (
                      <div key={step.id} className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center relative transition-all ${
                          step.done || step.active ? "bg-primary text-primary-foreground" : "bg-background border-2 border-border text-muted-foreground"
                        }`}>
                          {step.active && (
                            <div className="absolute inset-0 rounded-full bg-primary ping opacity-40" />
                          )}
                          <Icon name={step.icon as "Home"} size={16} />
                        </div>
                        <span className={`font-body text-[10px] text-center leading-tight max-w-[52px] ${
                          step.active ? "text-primary font-semibold" : "text-muted-foreground"
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                    <Icon name="Clock" size={12} />
                    <span>Примерно 15 минут</span>
                  </div>
                  <button className="text-xs text-primary underline font-body">Позвонить курьеру</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {[
                { id: "#1246", date: "27 марта", items: "Позы классические × 2", total: "840 ₽", status: "Доставлен" },
                { id: "#1245", date: "22 марта", items: "Пельмени домашние, Вареники с вишней", total: "660 ₽", status: "Доставлен" },
              ].map((order) => (
                <div key={order.id} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body font-bold text-sm">{order.id}</span>
                    <span className="text-xs font-body text-muted-foreground">{order.date}</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mb-2">{order.items}</p>
                  <div className="flex items-center justify-between">
                    <span className="handwritten text-lg text-primary font-bold">{order.total}</span>
                    <span className="bg-green-100 text-green-700 text-xs font-body font-semibold px-2 py-1 rounded-full">{order.status}</span>
                  </div>
                  <button className="mt-3 w-full border border-primary text-primary font-body text-sm py-2 rounded-xl hover:bg-primary/5 transition-colors">
                    Повторить заказ
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background/95 backdrop-blur-md border-t border-border px-2 py-2 z-50">
        <div className="flex justify-around">
          {([
            { id: "home", icon: "Home", label: "Главная" },
            { id: "menu", icon: "UtensilsCrossed", label: "Меню" },
            { id: "cart", icon: "ShoppingBag", label: "Корзина" },
            { id: "reviews", icon: "Star", label: "Отзывы" },
            { id: "about", icon: "Heart", label: "О нас" },
          ] as { id: Page; icon: string; label: string }[]).map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`bottom-nav-item flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors relative ${
                page === id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {id === "cart" && cartCount > 0 && (
                <span className="absolute -top-1 right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
              <Icon name={icon as "Home"} size={22} />
              <span className="font-body text-[10px] leading-none">{label}</span>
              {page === id && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
