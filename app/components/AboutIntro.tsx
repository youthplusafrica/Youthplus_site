"use client";

type Highlight = { title?: string; text: string };

type AboutIntroProps = {
  id?: string;
  title?: string;
  lead: string | React.ReactNode;
  mission?: string;
  vision?: string;
  highlights?: Highlight[];
  imageSrc?: string;
  imageAlt?: string;
  imageLeft?: boolean;
  /** control height: defaults to ~65vh desktop */
  minHeightClass?: string; // e.g. "md:min-h-[70vh]"
  className?: string;
};

export default function AboutIntro({
  id,
  title = "About Youth+ Africa",
  lead,
  mission,
  vision,
  highlights = [],
  imageSrc,
  imageAlt = "",
  imageLeft = false,
  minHeightClass = "md:min-h-[65vh]",
  className
}: AboutIntroProps) {
  const hasImage = Boolean(imageSrc);

  // diagonal clip for the image edge
  const clipRight = "polygon(0 0, 100% 0, calc(100% - 2.5rem) 100%, 0 100%)";
  const clipLeft  = "polygon(2.5rem 0, 100% 0, 100% 100%, 0 100%)";

  return (
    <section
      id={id}
      className={`relative w-full bg-white text-black overflow-hidden ${className ?? ""}`}
    >
      {/* Brand diagonal that crosses both halves (desktop only) */}
      <div
        className={`pointer-events-none hidden md:block absolute inset-y-6 ${
          imageLeft ? "left-1/2 -translate-x-[55%]" : "left-1/2 -translate-x-[45%]"
        } w-24 rotate-6 rounded-2xl opacity-90`}
        style={{ background: "var(--yplus-primary, #ead61f)" }}
        aria-hidden="true"
      />

      <div className={`mx-auto max-w-6xl px-6 py-12 md:py-16 grid ${hasImage ? "md:grid-cols-12" : ""} gap-8 md:gap-12 items-stretch ${minHeightClass}`}>
        {/* IMAGE COLUMN */}
        {hasImage && (
          <div
            className={`relative overflow-hidden rounded-2xl border border-black/10 ${
              imageLeft ? "md:order-1 md:col-span-6" : "md:order-2 md:col-span-6"
            } h-[320px] md:h-auto`}
            style={{
              // give the image a diagonal edge on the inner side
              clipPath: imageLeft ? clipLeft : clipRight
            }}
          >
            {/* If you prefer next/image, swap <img> for <Image fill /> */}
            <img
              src={imageSrc!}
              alt={imageAlt}
              className="block w-full h-full object-cover object-center"
            />

            {/* subtle dark gradient at bottom for depth */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 to-transparent" />
          </div>
        )}

        {/* TEXT COLUMN */}
        <div
          className={`relative flex flex-col justify-center ${
            hasImage
              ? imageLeft
                ? "md:order-2 md:col-span-6"
                : "md:order-1 md:col-span-6"
              : ""
          }`}
        >
          {/* angled accent under the heading */}
          <div className="relative inline-block">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {title}
            </h2>
            <span
              className="absolute left-0 -bottom-1 h-2 w-24"
              style={{ background: "var(--yplus-primary, #ead61f)" }}
              aria-hidden="true"
            />
          </div>

          <div className="mt-5 max-w-3xl text-black/80 text-lg">
            {typeof lead === "string" ? <p>{lead}</p> : lead}
          </div>

          {(mission || vision) && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {mission && (
                <div className="rounded-2xl border border-black/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <div className="text-xs font-semibold uppercase tracking-wide text-black/60">
                    Mission
                  </div>
                  <p className="mt-2">{mission}</p>
                </div>
              )}
              {vision && (
                <div className="rounded-2xl border border-black/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <div className="text-xs font-semibold uppercase tracking-wide text-black/60">
                    Vision
                  </div>
                  <p className="mt-2">{vision}</p>
                </div>
              )}
            </div>
          )}

          {highlights.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <li key={i} className="rounded-xl border border-black/10 p-4">
                  {h.title && (
                    <div className="text-sm font-semibold text-black/70">
                      {h.title}
                    </div>
                  )}
                  <p className="mt-1">{h.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* subtle brand bar at the very bottom */}
      <div className="h-1 w-full bg-[var(--yplus-primary,#ead61f)]" aria-hidden="true" />
    </section>
  );
}
