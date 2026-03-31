export type Page = "feed" | "discover" | "create" | "inbox" | "profile";

export interface VideoItem {
  id: number;
  author: string;
  username: string;
  avatar: string;
  description: string;
  music: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  image: string;
  tags: string[];
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
}

export const VIDEOS: VideoItem[] = [
  {
    id: 1,
    author: "Алина Танцует",
    username: "@alina_dance",
    avatar: "А",
    description: "Новый тренд 🔥 Кто повторит? #танцы #тренд #viral",
    music: "Баста — Выпускной",
    likes: 14200,
    comments: 342,
    shares: 891,
    saves: 2100,
    image: "https://cdn.poehali.dev/projects/e71a65ff-0d66-4b51-aef0-ef1c1d52adc9/files/12d7a174-60ce-4156-a5da-0c609f88ab2c.jpg",
    tags: ["танцы", "тренд"],
  },
  {
    id: 2,
    author: "Кот Барсик",
    username: "@barsik_cat",
    avatar: "🐱",
    description: "Барсик опять выступает 😂 Ставь ❤️ если у тебя тоже такой кот #кот #смешно #домашниеживотные",
    music: "оригинальный звук — Кот Барсик",
    likes: 89400,
    comments: 1203,
    shares: 4521,
    saves: 12300,
    image: "https://cdn.poehali.dev/projects/e71a65ff-0d66-4b51-aef0-ef1c1d52adc9/files/35f595a9-b7cc-487e-be50-ccbbff94766c.jpg",
    tags: ["кот", "смешно"],
  },
  {
    id: 3,
    author: "Шеф Повар",
    username: "@chef_master",
    avatar: "👨‍🍳",
    description: "Суши за 5 минут 🍣 Сохраняй рецепт! #еда #рецепт #суши #готовимдома",
    music: "Lofi Chill — Cooking Vibes",
    likes: 45600,
    comments: 892,
    shares: 3210,
    saves: 28900,
    image: "https://cdn.poehali.dev/projects/e71a65ff-0d66-4b51-aef0-ef1c1d52adc9/files/62ad2784-7883-4780-b9d7-aec648343c46.jpg",
    tags: ["еда", "рецепт"],
  },
];

export const SAMPLE_COMMENTS: Comment[] = [
  { id: 1, author: "Мария", avatar: "М", text: "Огонь! 🔥🔥🔥", likes: 234, time: "2ч" },
  { id: 2, author: "Дима", avatar: "Д", text: "Как это вообще возможно?? 😱", likes: 89, time: "3ч" },
  { id: 3, author: "Катя", avatar: "К", text: "Сохранила, буду повторять!", likes: 156, time: "4ч" },
  { id: 4, author: "Артём", avatar: "А", text: "Лучший контент в моей ленте", likes: 67, time: "5ч" },
  { id: 5, author: "Настя", avatar: "Н", text: "Подписалась! Жду ещё 🙏", likes: 45, time: "6ч" },
];

export const DISCOVER_TAGS = [
  "В тренде", "Танцы", "Еда", "Животные", "Юмор", "Спорт", "Музыка", "Красота", "Путешествия", "Лайфхаки"
];

export const NOTIFICATIONS = [
  { id: 1, type: "like", user: "Мария", text: "понравилось ваше видео", time: "2 мин", avatar: "М" },
  { id: 2, type: "follow", user: "Дмитрий", text: "подписался на вас", time: "15 мин", avatar: "Д" },
  { id: 3, type: "comment", user: "Катя", text: "прокомментировала: Круто! 🔥", time: "1 ч", avatar: "К" },
  { id: 4, type: "like", user: "Артём", text: "понравилось ваше видео", time: "2 ч", avatar: "А" },
  { id: 5, type: "follow", user: "Настя", text: "подписалась на вас", time: "3 ч", avatar: "Н" },
];

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "М";
  if (n >= 1000) return (n / 1000).toFixed(1) + "К";
  return n.toString();
}
