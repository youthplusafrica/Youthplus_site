"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  ariaLabel: string;
  children: ReactNode[];             // individual cards
  initial?: "start" | "end";         // default start
  className?: string;                // extra class on outer wrapper
  slideGapClassName?: string;        // gap between slides
  contentPaddingClassName?: string;  // horizontal padding of the full-bleed rail
};

/**
 * Full-bleed horizontal carousel that spans the whole viewport width.
 * Shows 3–4 items responsively using flex-basis breakpoints.
 */
export default function FullWidthCarousel({
  ariaLabel,
  children,
  initial = "start",
  className,
  slideGapClassName = "gap-4 md:gap-6",
  contentPaddingClassName = "px-6 md:px-8",
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => children.filter(Boolean), [children]);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const recalc = () => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 2);
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onScroll = () => recalc();
    const onResize = () => recalc();

    requestAnimationFrame(() => {
      if (initial === "end") {
        // Scroll to the rightmost
        el.scrollLeft = el.scrollWidth;
      } else {
        el.scrollLeft = 0;
      }
      recalc();
    });

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [initial]);

  const pageScroll = (dir: 1 | -1) => {
    const el = viewportRef.current;
    if (!el) return;
    // Scroll roughly one viewport minus a gutter
    const delta = dir * (el.clientWidth - 96);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className={clsx("relative full-bleed", className)}>
      {/* Hit zones (big invisible click areas) */}
      <button
        type="button"
        aria-label="Previous"
        disabled={!canPrev}
        onClick={() => pageScroll(-1)}
        className={clsx(
          "absolute left-0 top-0 h-full w-12 z-10",
          "flex items-center justify-start",
          "disabled:pointer-events-none"
        )}
      >
        <span className={clsx(
          "ml-2 rounded-full border border-white/30 bg-white/25 backdrop-blur",
          "p-2 text-white hover:bg-white/40 transition",
          !canPrev && "opacity-40"
        )}>
          <LeftOutlined />
        </span>
      </button>

      <button
        type="button"
        aria-label="Next"
        disabled={!canNext}
        onClick={() => pageScroll(1)}
        className={clsx(
          "absolute right-0 top-0 h-full w-12 z-10",
          "flex items-center justify-end",
          "disabled:pointer-events-none"
        )}
      >
        <span className={clsx(
          "mr-2 rounded-full border border-white/30 bg-white/25 backdrop-blur",
          "p-2 text-white hover:bg-white/40 transition",
          !canNext && "opacity-40"
        )}>
          <RightOutlined />
        </span>
      </button>

      {/* Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/30 to-transparent" />

      {/* Track */}
      <div
        ref={viewportRef}
        aria-label={ariaLabel}
        className={clsx(
          "no-scrollbar overflow-x-auto scroll-smooth",
          "snap-x snap-mandatory",
          contentPaddingClassName // horizontal breathing room at edges
        )}
      >
        <div className={clsx("flex items-stretch", slideGapClassName)}>
          {items.map((child, i) => (
            <div
              key={i}
              className={clsx(
                // show 1 on very small, ~2 on small, 3 on md, 4 on lg+
                "snap-start shrink-0",
                "basis-[85%] sm:basis-[55%] md:basis-1/3 lg:basis-1/4"
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
