import { useState } from "react";
import { Page } from "@/data/constants";
import BottomNav from "@/components/BottomNav";
import PageRenderer from "@/components/PageRenderer";

export default function App() {
  const [page, setPage] = useState<Page>("feed");

  const isLightNav = page === "feed";

  return (
    <div className="h-screen bg-background max-w-md mx-auto relative overflow-hidden">
      <PageRenderer page={page} setPage={setPage} />
      <BottomNav page={page} setPage={setPage} isLight={isLightNav} />
    </div>
  );
}
