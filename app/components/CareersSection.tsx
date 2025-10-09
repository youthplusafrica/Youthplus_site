"use client";

import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";

export type Job = {
  title: string;
  location: string; // "Nairobi (Hybrid)" etc.
  type: string; // "Full-time", "Contract", "Internship"
  blurb?: string;
	description?: string;       // 1–2 paras
  responsibilities?: string[]; // bullets
  requirements?: string[];     // bullets
  benefits?: string[];
  applyLink?: string; // external form
  applyEmail?: string; // fallback mailto
};

export default function CareersSection({ jobs }: { jobs: Job[] }) {
	const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Job | null>(null);

  const openModal = (job: Job) => {
    setSelected(job);
    setOpen(true);
  };

  return (
    <section id="careers" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Careers</h2>
            <p className="text-black/70 mt-1">
              Join us in empowering Africa’s youth to build, create, and lead.
            </p>
          </div>
          <div className="hidden md:block h-1 w-36 bg-[var(--yplus-primary,#d0a328)] rounded-full" />
        </div>

        {jobs.length === 0 ? (
          <p className="mt-8 text-black/60">
            No open roles right now. You can still{" "}
            <a href="mailto:freddy@youthplusafrica.com" className="underline decoration-[var(--yplus-primary,#d0a328)] underline-offset-2">
              send us your CV
            </a>
            .
          </p>
        ) : (
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((j, idx) => {
              const href =
                j.applyLink ||
                (j.applyEmail ? `mailto:${j.applyEmail}?subject=${encodeURIComponent("Application: " + j.title)}` : "");

              return (
                <li key={`${j.title}-${idx}`}>
                  <button
                    type="button"
                    onClick={() => openModal(j)}
                    className="w-full text-left rounded-2xl border border-black/10 bg-white p-5 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-[var(--yplus-primary,#d0a328)]"
                  >
                    <h3 className="text-lg font-semibold">{j.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-4 text-sm text-black/70">
                      <span className="flex items-center gap-1"><EnvironmentOutlined /> {j.location}</span>
                      <span className="flex items-center gap-1"><CalendarOutlined /> {j.type}</span>
                      <span className="flex items-center gap-1"><TeamOutlined /> Youth+ Africa</span>
                    </div>
                    {j.blurb && <p className="mt-2 text-black/80 line-clamp-3">{j.blurb}</p>}
                    {href && (
                      <span className="mt-3 inline-block text-[var(--yplus-primary,#d0a328)] underline-offset-2">
                        View details →
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="h-1 w-full bg-[var(--yplus-primary,#d0a328)]" aria-hidden="true" />

      {/* Modal */}
      <JobDetailsModal open={open} onClose={() => setOpen(false)} job={selected} />
    </section>
  );
}
