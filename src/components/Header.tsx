import Icon from "@/components/ui/icon";

interface HeaderProps {
  activeTab: "foryou" | "following";
  setActiveTab: (tab: "foryou" | "following") => void;
  transparent?: boolean;
}

export default function Header({ activeTab, setActiveTab, transparent }: HeaderProps) {
  return (
    <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-4 pt-3 pb-2 flex items-center justify-between ${
      transparent ? "" : "bg-gradient-to-b from-black/60 to-transparent"
    }`}>
      <button className="p-1">
        <Icon name="Tv" size={22} className="text-white/70" />
      </button>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setActiveTab("following")}
          className={`text-base font-heading font-semibold transition-all ${
            activeTab === "following" ? "text-white" : "text-white/50"
          }`}
        >
          Подписки
          {activeTab === "following" && <div className="w-8 h-0.5 bg-white rounded-full mx-auto mt-0.5" />}
        </button>
        <button
          onClick={() => setActiveTab("foryou")}
          className={`text-base font-heading font-semibold transition-all ${
            activeTab === "foryou" ? "text-white" : "text-white/50"
          }`}
        >
          Для вас
          {activeTab === "foryou" && <div className="w-8 h-0.5 bg-white rounded-full mx-auto mt-0.5" />}
        </button>
      </div>

      <button className="p-1">
        <Icon name="Search" size={22} className="text-white/70" />
      </button>
    </header>
  );
}
