"use client";

import { useState } from "react";
import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import SectionWithBg from "../components/SectionWithBg";
import { VENTURES } from "../content/ventures";
import EventDetailsModal from "../components/EventDetailsModal";
import type { EventItem } from "../components/EventCard";
import VentureDetailsModal from "../components/VentureDetailsModal";

function parseDate(dateStr?: string) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y || 0, (m || 1) - 1, d || 1);
  return isNaN(dt.getTime()) ? null : dt;
}
function fmtDate(dateStr: string) {
  const d = parseDate(dateStr);
  if (!d) return dateStr;
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  } catch {
    return dateStr;
  }
}

export default function VenturesPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({}); // per-venture show more/less

  const openModal = (e: EventItem) => {
    setSelected({ ...e, hasFutureEvents: e.hasFutureEvents ?? true });
    setOpen(true);
  };

  // today (midnight) for clean date-only comparisons
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      <HeaderNav />

      <SectionWithBg
        src="/images/ventures-bg-2.jpeg"
        alt="Youth+ events background"
        overlay={60}
        className="py-12 md:py-16"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Ventures</h1>
          <p className="text-white/80 mt-1">
            Explore our ventures and see event highlights.
          </p>
        </header>

        {VENTURES.map((v) => {
          const sorted = (v.events || []).slice().sort((a, b) => {
            const da = parseDate(a.date)?.getTime() ?? 0;
            const db = parseDate(b.date)?.getTime() ?? 0;
            return db - da; // DESC
          });

          const showAll = !!expanded[v.id];
          const visible = showAll ? sorted : sorted.slice(0, 5);

          return (
            <section key={v.id} id={v.id} className="scroll-mt-24">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {v.name}
                  </h2>
                  {v.blurb && <p className="text-white/80 mt-1">{v.blurb}</p>}
                </div>
                <div className="hidden md:block h-1 w-36 bg-[var(--yplus-primary,#d0a328)] rounded-full" />
              </div>

              {sorted.length === 0 ? (
                <p className="mt-5 text-white/80">
                  No events to show right now.
                </p>
              ) : (
                <>
                  <ul className="mt-6 space-y-3">
                    {visible.map((e, i) => {
                      const dt = parseDate(e.date);
                      const isUpcoming = !!dt && dt >= today;
                      const titleCls = isUpcoming
                        ? "text-[#29ab87]"
                        : "text-white/90";
                      const dateCls = isUpcoming
                        ? "text-[#29ab87]"
                        : "text-white/70";

                      return (
                        <li key={`${v.id}-${i}-${e.title}`}>
                          <button
                            onClick={() => openModal(e as EventItem)}
                            className="
                              w-full text-left
                              rounded-2xl border border-white/20 bg-white/10 backdrop-blur
                              hover:bg-white/15 hover:border-white/30 transition
                              px-4 py-3
                              flex items-center justify-between gap-3 cursor-pointer
                            "
                          >
                            <span className={`font-medium ${titleCls}`}>
                              {e.title}
                            </span>
                            <span className={`text-sm ${dateCls}`}>
                              {fmtDate(e.date)}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {sorted.length > 5 && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() =>
                          setExpanded((prev) => ({ ...prev, [v.id]: !showAll }))
                        }
                        className="text-[var(--yplus-primary,#d0a328)] underline underline-offset-2 hover:opacity-90"
                      >
                        {showAll ? "Show less" : "Show more"}
                      </button>
                    </div>
                  )}
                </>
              )}

              <div className="mt-8 h-px bg-black/10" />
            </section>
          );
        })}
      </SectionWithBg>

      <EventDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        event={selected}
      />

      <FooterMain />
    </>
  );
}
