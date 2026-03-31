import Icon from "@/components/ui/icon";
import { Page } from "@/data/constants";

interface HeaderProps {
  cartCount: number;
  setPage: (page: Page) => void;
}

export default function Header({ cartCount, setPage }: HeaderProps) {
  return (
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
  );
}
