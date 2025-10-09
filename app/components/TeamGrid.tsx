"use client";

import TeamMemberCard, { type TeamMember } from "./TeamMemberCard";

export default function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <section id="team" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Our team
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m) => (
            <TeamMemberCard key={m.name} m={m} />
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
