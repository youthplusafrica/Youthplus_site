"use client";

type Pillar = {
  key: "WE TRAIN" | "WE CREATE" | "WE GROW" | "WE LEAD";
  title: string;
  blurb: string;
};

const PILLARS: Pillar[] = [
  {
    key: "WE TRAIN",
    title: "We Train",
    blurb: "Knowledge & Skills Development. Mentorship & Apprenticeship.",
  },
  {
    key: "WE CREATE",
    title: "We Create",
    blurb: "Data Driven Innovation. Incubation & Acceleration.",
  },
  {
    key: "WE GROW",
    title: "We Grow",
    blurb: "Market Linkages & Networking. Access to Financial Services.",
  },
  {
    key: "WE LEAD",
    title: "We Lead",
    blurb: "Advocacy and Policy Engagement",
  },
];

export default function PillarsGrid() {
  return (
    <section id="pillars" className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          HOW{" "}
          <span className="text-[var(--yplus-primary,#d0a328)]">
            WE BRIDGE THE GAP
          </span>
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => (
            <article
              key={p.key}
              className="group rounded-2xl border border-white/15 p-5 relative overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="absolute -left-8 -top-8 h-20 w-20 rotate-12 bg-[var(--yplus-primary,#d0a328)] opacity-20 transition-opacity group-hover:opacity-30"
              />
              <h3 className="text-xl font-semibold text-[var(--yplus-primary,#d0a328)]">
                {p.title}
              </h3>
              <p className="mt-2 text-white/85">{p.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
