"use client";

import { useEffect, useMemo, useState } from "react";
import TeamMemberCard, { type TeamMember } from "./TeamMemberCard";

export default function TeamGrid({ team }: { team: TeamMember[] }) {
  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerSlide(3);
        return;
      }

      if (window.innerWidth >= 640) {
        setCardsPerSlide(2);
        return;
      }

      setCardsPerSlide(1);
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const slides = useMemo(() => {
    const chunks: TeamMember[][] = [];

    for (let i = 0; i < team.length; i += cardsPerSlide) {
      chunks.push(team.slice(i, i + cardsPerSlide));
    }

    return chunks;
  }, [team, cardsPerSlide]);

  useEffect(() => {
    setActiveSlide((current) => Math.min(current, Math.max(slides.length - 1, 0)));
  }, [slides.length]);

  const canSlide = slides.length > 1;

  const nextSlide = () => {
    if (!canSlide) return;
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    if (!canSlide) return;
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  return (
    <section id="team" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Our team
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous team members"
              onClick={previousSlide}
              disabled={!canSlide}
              className="grid h-10 w-10 place-items-center rounded-full border border-black/15 text-lg text-black/70 transition hover:bg-black/5 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next team members"
              onClick={nextSlide}
              disabled={!canSlide}
              className="grid h-10 w-10 place-items-center rounded-full border border-black/15 text-lg text-black/70 transition hover:bg-black/5 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={`slide-${index}`} className="w-full shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {slide.map((m) => (
                    <TeamMemberCard key={m.name} m={m} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={`indicator-${index}`}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to team slide ${index + 1}`}
              className={`h-2.5 rounded-full transition ${
                index === activeSlide
                  ? "w-7 bg-[var(--yplus-primary,#d0a328)]"
                  : "w-2.5 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>
      </div>
      <div
        className="h-1 w-full bg-[var(--yplus-primary,#d0a328)]"
        aria-hidden="true"
      />
    </section>
  );
}
