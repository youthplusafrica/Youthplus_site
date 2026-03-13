"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  LinkedinFilled,
  TwitterOutlined,
  MailOutlined,
} from "@ant-design/icons";

export type TeamMember = {
  name: string;
  role: string;
  headshot?: string; // /images/team/...
  bio?: string;
  email?: string;
  linkedin?: string;
  x?: string; // twitter/x
};

const DEFAULT_PANEL_TINT = "rgba(0, 0, 0, 0.03)";

export default function TeamMemberCard({ m }: { m: TeamMember }) {
  const [panelTint, setPanelTint] = useState(DEFAULT_PANEL_TINT);

  useEffect(() => {
    if (!m.headshot) {
      setPanelTint(DEFAULT_PANEL_TINT);
      return;
    }

    let isCancelled = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (isCancelled) return;

      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return;

        const sampleSize = 36;
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        context.drawImage(img, 0, 0, sampleSize, sampleSize);

        const { data } = context.getImageData(0, 0, sampleSize, sampleSize);

        // Prefer a vibrant representative color over a flat average.
        const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha < 10) continue;

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;
          const brightness = max / 255;

          // Skip near-grayscale and very dark pixels to avoid muddy tints.
          if (saturation < 0.12 || brightness < 0.18) continue;

          const key = `${Math.round(r / 24)}-${Math.round(g / 24)}-${Math.round(b / 24)}`;
          const bucket = buckets.get(key);

          if (bucket) {
            bucket.count += 1;
            bucket.r += r;
            bucket.g += g;
            bucket.b += b;
          } else {
            buckets.set(key, { count: 1, r, g, b });
          }
        }

        if (buckets.size === 0) {
          setPanelTint(DEFAULT_PANEL_TINT);
          return;
        }

        let dominant = { count: 0, r: 0, g: 0, b: 0 };
        for (const bucket of buckets.values()) {
          if (bucket.count > dominant.count) dominant = bucket;
        }

        const avgRed = Math.round(dominant.r / dominant.count);
        const avgGreen = Math.round(dominant.g / dominant.count);
        const avgBlue = Math.round(dominant.b / dominant.count);

        setPanelTint(`rgba(${avgRed}, ${avgGreen}, ${avgBlue}, 0.5)`);
      } catch {
        setPanelTint(DEFAULT_PANEL_TINT);
      }
    };

    img.onerror = () => {
      if (!isCancelled) setPanelTint(DEFAULT_PANEL_TINT);
    };

    img.src = m.headshot;

    return () => {
      isCancelled = true;
    };
  }, [m.headshot]);

  return (
    <article className="group rounded-2xl border border-black/10 bg-white overflow-hidden hover:shadow-lg transition">
      <div className="relative h-64 md:h-80 w-full bg-black/5">
        {m.headshot && (
          <Image
            src={m.headshot}
            alt={m.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover object-top"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--yplus-primary,#d0a328)]" />
      </div>

      <div className="p-4" style={{ backgroundColor: panelTint }}>
        <h3 className="text-lg font-semibold">{m.name}</h3>
        <p className="text-black/70">{m.role}</p>
        {m.bio && <p className="mt-2 text-black/80">{m.bio}</p>}

        <div className="mt-3 flex items-center gap-2">
          {m.linkedin && (
            <a
              href={m.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${m.name} on LinkedIn`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-black/10 bg-black/[0.03] text-black/70 hover:text-black"
            >
              <LinkedinFilled />
            </a>
          )}
          {m.x && (
            <a
              href={m.x}
              target="_blank"
              rel="noreferrer"
              aria-label={`${m.name} on X`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-black/10 bg-black/[0.03] text-black/70 hover:text-black"
            >
              <TwitterOutlined />
            </a>
          )}
          {m.email && (
            <a
              href={`mailto:${m.email}`}
              aria-label={`Email ${m.name}`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-black/10 bg-black/[0.03] text-black/70 hover:text-black"
            >
              <MailOutlined />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
