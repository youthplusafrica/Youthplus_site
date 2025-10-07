"use client";

import Image from "next/image";

type Partner = {
  name: string;
  src: string;
  href?: string;
  alt?: string;
  width?: number;
  height?: number;
};

type Props = {
  title?: string;
  subtitle?: string;
  partners: Partner[];
  className?: string;
  tone?: "light" | "dark";
  /** seconds for a full loop */
  durationSec?: number;
};

export default function PartnersStrip({
  title = "Partners & collaborators",
  subtitle,
  partners,
  className,
  tone = "light",
  durationSec = 28, // speed of the loop
}: Props) {
  const isDark = tone === "dark";

  // Duplicate the list once so the track can scroll seamlessly
  const loop = [...partners, ...partners];

  return (
    <section
      className={`mb-8 ${isDark ? "bg-black text-white" : "bg-white text-black"} ${
        className ?? ""
      }`}
      style={
        { ["--marquee-duration"]: `${durationSec}s` } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className={`mt-2 ${isDark ? "text-white/80" : "text-black/70"}`}>
                {subtitle}
              </p>
            )}
          </div>
          <div
            className="hidden md:block h-1 w-36 bg-[var(--yplus-primary,#ead61f)] rounded-full"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Full-width marquee rail */}
      <div className="logo-marquee">
        <ul className="logo-track items-center gap-10 md:gap-14 px-6 md:px-8">
          {loop.map((p, i) => {
            const img = (
              <Image
                src={p.src}
                alt={p.alt || `${p.name} logo`}
                width={p.width ?? 180}
                height={p.height ?? 90}
                className="h-12 w-auto object-contain"
                priority={i < 6} // small LCP boost for first few
              />
            );
            return (
              <li key={`${p.name}-${i}`} className="flex items-center justify-center">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={p.name}
                    className="inline-flex items-center"
                  >
                    {img}
                  </a>
                ) : (
                  img
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
