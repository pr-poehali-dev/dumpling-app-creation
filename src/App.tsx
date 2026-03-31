import { useState } from "react";
import { MENU_ITEMS, MenuItem, CartEntry, Page } from "@/data/constants";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageRenderer from "@/components/PageRenderer";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const addToCart = (item: MenuItem) => {
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
      <Header cartCount={cartCount} setPage={setPage} />
      <PageRenderer
        page={page}
        cart={cart}
        activeCategory={activeCategory}
        orderPlaced={orderPlaced}
        setPage={setPage}
        setActiveCategory={setActiveCategory}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        placeOrder={placeOrder}
      />
      <BottomNav page={page} cartCount={cartCount} setPage={setPage} />
    </div>
  );
}
