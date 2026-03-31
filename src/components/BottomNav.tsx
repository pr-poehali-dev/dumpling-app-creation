import Icon from "@/components/ui/icon";
import { Page } from "@/data/constants";

interface BottomNavProps {
  page: Page;
  cartCount: number;
  setPage: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "menu", icon: "UtensilsCrossed", label: "Меню" },
  { id: "cart", icon: "ShoppingBag", label: "Корзина" },
  { id: "reviews", icon: "Star", label: "Отзывы" },
  { id: "about", icon: "Heart", label: "О нас" },
];

export default function BottomNav({ page, cartCount, setPage }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background/95 backdrop-blur-md border-t border-border px-2 py-2 z-50">
      <div className="flex justify-around">
        {NAV_ITEMS.map(({ id, icon, label }) => (
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
  );
}
