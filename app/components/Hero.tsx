"use client";

import Image from "next/image";
import clsx from "clsx";

type Props = {
  /** Main heading */
  title: string;
  /** One-line subheading */
  subtitle?: string;
  /** Optional background image (enables image variant) */
  bgSrc?: string;
  /** Left or center alignment */
  align?: "left" | "center";
  /** Extra classes (spacing overrides, etc.) */
  className?: string;
};

export default function Hero({
  title,
  subtitle,
  bgSrc,
  align = "left",
  className
}: Props) {
  const isImage = Boolean(bgSrc);

  return (
    <section className={clsx("relative", className)}>
      {isImage && (
        <>
          <Image
            src={bgSrc!}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
        </>
      )}

      <div
        className={clsx(
          "relative mx-auto max-w-6xl px-6",
          "pt-12 md:pt-24 pb-16 md:pb-32"
        )}
      >
        <div
          className={clsx(
            "max-w-3xl",
            align === "center" && "mx-auto text-center"
          )}
        >
          {/* Eyebrow (brand accent) — optional, remove if not needed */}
          {/* <span className={clsx(isImage ? "text-white/80" : "text-black/60")}>
            Youth+ Africa
          </span> */}

          <h1
            className={clsx(
              "font-extrabold tracking-tight",
              "text-4xl leading-tight md:text-6xl",
              isImage ? "text-white" : "text-black"
            )}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={clsx(
                "mt-4 md:mt-5 text-lg md:text-xl",
                isImage ? "text-white/90" : "text-black/80"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--yplus-primary,#ead61f)]"
        aria-hidden="true"
      />
    </section>
  );
}
