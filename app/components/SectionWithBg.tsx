"use client";

import Image from "next/image";
import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = {
  /** Public path, e.g. /images/bg-events.jpg */
  src: string;
  /** Optional alt for decorative images */
  alt?: string;
  /** Darkness of overlay (0–100). Default 35 */
  overlay?: number;
  /** Extra classes (padding, margin, etc.) */
  className?: string;
  /** Constrain inner width (default max-w-6xl) */
  containerClassName?: string;
  /** Use a tinted overlay instead of black */
  tint?: "black" | "brand";
};

export default function SectionWithBg({
  src,
  alt = "",
  overlay = 35,
  tint = "black",
  className,
  containerClassName,
  children,
}: PropsWithChildren<Props>) {
  const overlayColor =
    tint === "brand"
      ? "rgba(234, 214, 31, 0.55)" // brand tint
      : `rgba(0,0,0,${overlay / 100})`;

  return (
    <section className={clsx("relative isolate", className)}>
      {/* Background image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={false}
        sizes="100vw, 100vh"
        className="object-cover object-center pointer-events-none select-none"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: overlayColor, backdropFilter: "saturate(100%)" }}
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative">
        <div className={clsx("mx-auto max-w-6xl px-6", containerClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
}
