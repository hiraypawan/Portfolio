"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Wrap one page's content with this.
 * It scales children to fit the available page area (width & height).
 */
export default function FitToPage({
  children,
  designWidth = 1280,
  designHeight = 800,
  padding = 24,
  className = ""
}: {
  children: React.ReactNode;
  designWidth?: number;
  designHeight?: number;
  padding?: number;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = () => {
      const w = Math.max(outer.clientWidth - padding * 2, 1);
      const h = Math.max(outer.clientHeight - padding * 2, 1);
      const s = Math.min(w / designWidth, h / designHeight);
      setScale(s);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    window.addEventListener("orientationchange", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", update);
    };
  }, [designWidth, designHeight, padding]);

  return (
    <div ref={outerRef} className={`book-page ${className}`} style={{ padding }}>
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          willChange: "transform"
        }}
      >
        {children}
      </div>
    </div>
  );
}
