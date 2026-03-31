import Icon from "@/components/ui/icon";
import { Page } from "@/data/constants";

interface BottomNavProps {
  page: Page;
  setPage: (page: Page) => void;
  isLight: boolean;
}

const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
  { id: "feed", icon: "Home", label: "Главная" },
  { id: "discover", icon: "Compass", label: "Поиск" },
  { id: "create", icon: "PlusSquare", label: "" },
  { id: "inbox", icon: "MessageCircle", label: "Входящие" },
  { id: "profile", icon: "User", label: "Профиль" },
];

export default function BottomNav({ page, setPage, isLight }: BottomNavProps) {
  const textColor = isLight ? "text-white" : "text-foreground";
  const mutedColor = isLight ? "text-white/50" : "text-muted-foreground";
  const bgColor = isLight ? "bg-black/70" : "bg-card/95";

  return (
    <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md ${bgColor} backdrop-blur-xl px-2 py-1.5 z-50 border-t border-white/5`}>
      <div className="flex justify-around items-center">
        {NAV_ITEMS.map(({ id, icon, label }) => {
          if (id === "create") {
            return (
              <button
                key={id}
                onClick={() => setPage(id)}
                className="flex flex-col items-center"
              >
                <div className="relative w-12 h-8 flex items-center justify-center">
                  <div className="absolute left-0 w-8 h-7 bg-cyan-400 rounded-lg" />
                  <div className="absolute right-0 w-8 h-7 bg-primary rounded-lg" />
                  <div className="relative w-9 h-7 bg-white rounded-lg flex items-center justify-center z-10">
                    <Icon name="Plus" size={20} className="text-black" />
                  </div>
                </div>
              </button>
            );
          }

          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                page === id ? textColor : mutedColor
              }`}
            >
              <Icon name={icon as "Home"} size={22} />
              <span className="text-[10px] leading-none font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
