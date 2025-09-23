"use client";

export default function MapEmbed() {
  // Replace with your exact coords if you have them
  const lat = -1.26884;
  const lng = 36.78931;

  const src = `https://www.google.com/maps?q=loc:${lat},${lng}&z=16&output=embed`;

  return (
    <div className="rounded-2xl border border-black/10 overflow-hidden bg-black/5">
      <div className="aspect-[16/11] w-full">
        <iframe
          title="Youth+ Africa location"
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[50dvh] w-full"
        />
      </div>
      <div className="px-4 py-3 text-sm text-black/70">
        10th Floor, Riverside Square, Riverside Drive, Nairobi
      </div>
    </div>
  );
}
