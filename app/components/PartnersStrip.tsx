"use client";

import Image from "next/image";

type Partner = {
  name: string;
  src: string; // /images/partners/... (in /public)
  href?: string; // optional link
  alt?: string;
  width?: number; // fallback sizing
  height?: number;
};

type Props = {
  title?: string;
  subtitle?: string;
  partners: Partner[];
  className?: string;
  tone?: "light" | "dark"; // default light bg
};

export default function PartnersStrip({
  title = "Partners & collaborators",
  subtitle,
  partners,
  className,
  tone = "light",
}: Props) {
  const isDark = tone === "dark";

  return (
    <section
      className={`${isDark ? "bg-black text-white" : "bg-white text-black"} ${
        className ?? ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p
                className={`mt-2 ${isDark ? "text-white/80" : "text-black/70"}`}
              >
                {subtitle}
              </p>
            )}
          </div>
          {/* thin brand underline on desktop */}
          <div
            className="hidden md:block h-1 w-36 bg-[var(--yplus-primary,#ead61f)] rounded-full"
            aria-hidden="true"
          />
        </div>

        {/* Logos grid */}
        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((p) => {
            const img = (
              <Image
                src={p.src}
                alt={p.alt || `${p.name} logo`}
                width={p.width ?? 180}
                height={p.height ?? 90}
                className="mx-auto h-12 w-auto object-contain opacity-80 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
              />
            );
            return (
              <li key={p.name} className="flex items-center justify-center">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={p.name}
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

      <div
        className="h-1 w-full bg-[var(--yplus-primary,#ead61f)]"
        aria-hidden="true"
      />
    </section>
  );
}
