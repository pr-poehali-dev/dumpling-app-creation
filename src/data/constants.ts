export const HERO_IMAGE = "https://cdn.poehali.dev/projects/e71a65ff-0d66-4b51-aef0-ef1c1d52adc9/files/15ac7936-4a62-4159-8ad0-c98d8cac3bda.jpg";

export const MENU_ITEMS = [
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

export const REVIEWS = [
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

export const TRACKING_STEPS = [
  { id: 1, label: "Принят", icon: "ClipboardCheck", done: true, active: false },
  { id: 2, label: "Готовим", icon: "ChefHat", done: true, active: false },
  { id: 3, label: "В пути", icon: "Bike", done: false, active: true },
  { id: 4, label: "Доставлен", icon: "Home", done: false, active: false },
];

export type MenuItem = typeof MENU_ITEMS[0];
export type CartEntry = { item: MenuItem; qty: number };
export type Page = "home" | "menu" | "about" | "cart" | "reviews" | "contacts" | "profile" | "history";
