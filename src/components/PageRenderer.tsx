import { useState, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";
import {
  VIDEOS,
  SAMPLE_COMMENTS,
  DISCOVER_TAGS,
  NOTIFICATIONS,
  Page,
  VideoItem,
  formatNumber,
} from "@/data/constants";
import Header from "@/components/Header";

interface PageRendererProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function PageRenderer({ page, setPage }: PageRendererProps) {
  return (
    <>
      {page === "feed" && <FeedPage />}
      {page === "discover" && <DiscoverPage />}
      {page === "create" && <CreatePage />}
      {page === "inbox" && <InboxPage />}
      {page === "profile" && <ProfilePage setPage={setPage} />}
    </>
  );
}

function FeedPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [followed, setFollowed] = useState<Record<string, boolean>>({});
  const [showComments, setShowComments] = useState(false);
  const [doubleTapHeart, setDoubleTapHeart] = useState<{ x: number; y: number } | null>(null);
  const [activeTab, setActiveTab] = useState<"foryou" | "following">("foryou");
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef(0);

  const video = VIDEOS[currentIndex];

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const height = containerRef.current.clientHeight;
    const newIndex = Math.round(scrollTop / height);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < VIDEOS.length) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex]);

  const handleDoubleTap = (e: React.MouseEvent, videoId: number) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      setLiked((prev) => ({ ...prev, [videoId]: true }));
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setDoubleTapHeart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setTimeout(() => setDoubleTapHeart(null), 800);
    }
    lastTapRef.current = now;
  };

  const toggleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFollow = (username: string) => {
    setFollowed((prev) => ({ ...prev, [username]: !prev[username] }));
  };

  return (
    <div className="h-screen w-full relative">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="snap-container h-full w-full"
      >
        {VIDEOS.map((v, idx) => (
          <div
            key={v.id}
            className="snap-item h-screen w-full relative overflow-hidden"
            onClick={(e) => handleDoubleTap(e, v.id)}
          >
            <img
              src={v.image}
              alt={v.author}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

            {doubleTapHeart && idx === currentIndex && (
              <div
                className="absolute z-30 pointer-events-none animate-float-heart"
                style={{ left: doubleTapHeart.x - 30, top: doubleTapHeart.y - 30 }}
              >
                <span className="text-6xl drop-shadow-lg">❤️</span>
              </div>
            )}

            <div className="absolute bottom-20 left-4 right-16 z-20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg font-bold border-2 border-white/40">
                  {v.avatar}
                </div>
                <span className="font-heading font-bold text-white text-sm drop-shadow">{v.username}</span>
                {!followed[v.username] && (
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFollow(v.username); }}
                    className="ml-1 bg-primary text-white text-xs font-bold px-3 py-1 rounded-md"
                  >
                    +
                  </button>
                )}
              </div>

              <p className="text-white text-sm leading-relaxed drop-shadow mb-3 line-clamp-3">
                {v.description}
              </p>

              <div className="flex items-center gap-2 overflow-hidden">
                <Icon name="Music" size={12} className="text-white flex-shrink-0" />
                <div className="overflow-hidden flex-1">
                  <div className="animate-marquee whitespace-nowrap">
                    <span className="text-white/80 text-xs">{v.music}  •  {v.music}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white/30 overflow-hidden flex-shrink-0 animate-spin-disc">
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white/40" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 z-20">
              <SideButton
                icon={liked[v.id] ? "Heart" : "Heart"}
                label={formatNumber(v.likes + (liked[v.id] ? 1 : 0))}
                active={liked[v.id]}
                onClick={() => toggleLike(v.id)}
              />
              <SideButton
                icon="MessageCircle"
                label={formatNumber(v.comments)}
                onClick={() => setShowComments(true)}
              />
              <SideButton icon="Bookmark" label={formatNumber(v.saves)} />
              <SideButton icon="Share2" label={formatNumber(v.shares)} />
            </div>
          </div>
        ))}
      </div>

      {showComments && (
        <CommentsSheet video={video} onClose={() => setShowComments(false)} />
      )}
    </div>
  );
}

function SideButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onClick?.(); }} className="flex flex-col items-center gap-1">
      <div className={`transition-transform ${active ? "animate-heart-pop" : ""}`}>
        <Icon name={icon as "Heart"} size={28} className={active ? "text-primary fill-primary" : "text-white drop-shadow-lg"} />
      </div>
      <span className="text-white text-[11px] font-medium drop-shadow">{label}</span>
    </button>
  );
}

function CommentsSheet({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  const [commentText, setCommentText] = useState("");

  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card rounded-t-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "65vh" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="font-heading font-bold text-sm">{formatNumber(video.comments)} комментариев</span>
          <button onClick={onClose} className="p-1">
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="overflow-y-auto px-4 py-3 space-y-4" style={{ maxHeight: "calc(65vh - 110px)" }}>
          {SAMPLE_COMMENTS.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold flex-shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-muted-foreground font-medium">{c.author} · {c.time}</span>
                <p className="text-sm mt-0.5">{c.text}</p>
                <div className="flex items-center gap-4 mt-1">
                  <button className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Heart" size={12} />
                    <span className="text-[11px]">{c.likes}</span>
                  </button>
                  <button className="text-[11px] text-muted-foreground">Ответить</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
            Я
          </div>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Добавьте комментарий..."
            className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          {commentText && (
            <button className="text-primary font-bold text-sm">
              <Icon name="Send" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function DiscoverPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen overflow-y-auto pb-20 pt-2">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-2.5">
          <Icon name="Search" size={18} className="text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
        {DISCOVER_TAGS.map((tag) => (
          <button key={tag} className="flex-shrink-0 bg-secondary px-4 py-2 rounded-full text-xs font-medium hover:bg-primary hover:text-white transition-colors">
            {tag}
          </button>
        ))}
      </div>

      <div className="px-2">
        <div className="grid grid-cols-2 gap-1">
          {[...VIDEOS, ...VIDEOS].map((v, i) => (
            <div
              key={`${v.id}-${i}`}
              className="relative aspect-[3/4] rounded-lg overflow-hidden"
              style={{ opacity: 0, animation: `fade-in 0.3s ease-out ${i * 0.05}s forwards` }}
            >
              <img src={v.image} alt={v.author} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium line-clamp-2 drop-shadow">{v.description}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="Play" size={10} className="text-white/70 fill-white/70" />
                  <span className="text-white/70 text-[10px]">{formatNumber(v.likes * 3)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CreatePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-8">
      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-5">
        <Icon name="Video" size={36} className="text-primary" />
      </div>
      <h2 className="font-heading font-bold text-xl mb-2 text-center">Создать клип</h2>
      <p className="text-muted-foreground text-sm text-center mb-8">Снимайте, редактируйте и делитесь короткими видео</p>

      <div className="w-full space-y-3">
        <button className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-opacity">
          <Icon name="Camera" size={20} />
          Снять видео
        </button>
        <button className="w-full bg-secondary text-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-secondary/70 transition-colors">
          <Icon name="Upload" size={20} />
          Загрузить из галереи
        </button>
        <button className="w-full bg-secondary text-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-secondary/70 transition-colors">
          <Icon name="Wand2" size={20} />
          Шаблоны
        </button>
      </div>
    </div>
  );
}

function InboxPage() {
  return (
    <div className="h-screen overflow-y-auto pb-20">
      <div className="px-4 py-4 border-b border-border">
        <h1 className="font-heading font-bold text-xl">Входящие</h1>
      </div>

      <div className="flex gap-2 px-4 py-3 border-b border-border overflow-x-auto">
        {["Все", "Ответы", "Упоминания", "Лайки"].map((tab, i) => (
          <button
            key={tab}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              i === 0 ? "bg-white text-black" : "bg-secondary text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="divide-y divide-border">
        {NOTIFICATIONS.map((n, i) => (
          <div
            key={n.id}
            className="px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors"
            style={{ opacity: 0, animation: `fade-in 0.3s ease-out ${i * 0.05}s forwards` }}
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold flex-shrink-0">
              {n.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-bold">{n.user}</span>{" "}
                <span className="text-muted-foreground">{n.text}</span>
              </p>
              <span className="text-xs text-muted-foreground">{n.time}</span>
            </div>
            {n.type === "follow" && (
              <button className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-lg flex-shrink-0">
                В ответ
              </button>
            )}
            {n.type === "like" && (
              <div className="w-10 h-10 rounded-md bg-secondary flex-shrink-0 overflow-hidden">
                <img src={VIDEOS[0].image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfilePage({ setPage }: { setPage: (page: Page) => void }) {
  const [activeProfileTab, setActiveProfileTab] = useState<"videos" | "liked">("videos");

  return (
    <div className="h-screen overflow-y-auto pb-20">
      <div className="px-4 py-3 flex items-center justify-between border-b border-border">
        <Icon name="Lock" size={16} className="text-muted-foreground" />
        <div className="flex items-center gap-1">
          <span className="font-heading font-bold text-base">@my_profile</span>
          <Icon name="ChevronDown" size={14} />
        </div>
        <div className="flex items-center gap-3">
          <Icon name="Bell" size={20} />
          <Icon name="Menu" size={20} />
        </div>
      </div>

      <div className="flex flex-col items-center pt-5 pb-4">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl mb-3 border-2 border-primary/30">
          👤
        </div>
        <h2 className="font-heading font-bold text-base">@my_profile</h2>
      </div>

      <div className="flex justify-center gap-8 pb-4">
        {[
          { num: "12", label: "Подписки" },
          { num: "1.2К", label: "Подписчики" },
          { num: "45.6К", label: "Лайки" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-heading font-bold text-lg">{s.num}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <button className="flex-1 bg-secondary font-bold text-sm py-2.5 rounded-lg">
          Изменить профиль
        </button>
        <button className="flex-1 bg-secondary font-bold text-sm py-2.5 rounded-lg">
          Поделиться
        </button>
        <button className="bg-secondary p-2.5 rounded-lg">
          <Icon name="UserPlus" size={16} />
        </button>
      </div>

      <div className="px-4 pb-4">
        <p className="text-sm text-center text-muted-foreground">Пока нет описания профиля</p>
      </div>

      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveProfileTab("videos")}
          className={`flex-1 py-3 flex justify-center border-b-2 transition-colors ${
            activeProfileTab === "videos" ? "border-white" : "border-transparent text-muted-foreground"
          }`}
        >
          <Icon name="Grid3x3" size={20} />
        </button>
        <button
          onClick={() => setActiveProfileTab("liked")}
          className={`flex-1 py-3 flex justify-center border-b-2 transition-colors ${
            activeProfileTab === "liked" ? "border-white" : "border-transparent text-muted-foreground"
          }`}
        >
          <Icon name="Heart" size={20} />
        </button>
      </div>

      {activeProfileTab === "videos" ? (
        <div className="flex flex-col items-center justify-center py-16 px-8">
          <Icon name="Video" size={48} className="text-muted-foreground mb-4" />
          <p className="font-heading font-bold text-base mb-1">Загрузи первый клип</p>
          <p className="text-muted-foreground text-sm text-center mb-5">Твои видео будут отображаться здесь</p>
          <button
            onClick={() => setPage("create")}
            className="bg-primary text-white font-bold text-sm px-8 py-3 rounded-lg"
          >
            Создать
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0.5 px-0.5 pt-0.5">
          {VIDEOS.map((v) => (
            <div key={v.id} className="aspect-[3/4] relative overflow-hidden">
              <img src={v.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute bottom-1 left-1 flex items-center gap-0.5">
                <Icon name="Play" size={10} className="text-white fill-white" />
                <span className="text-white text-[10px] font-medium drop-shadow">{formatNumber(v.likes)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
