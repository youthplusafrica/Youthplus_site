"use client";

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

export default function TeamMemberCard({ m }: { m: TeamMember }) {
  return (
    <article className="group rounded-2xl border border-black/10 bg-white overflow-hidden hover:shadow-lg transition">
      <div className="relative h-64 md:h-96 w-full bg-black/5">
        {m.headshot && (
          <Image
            src={m.headshot}
            alt={m.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover object-top"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--yplus-primary,#ead61f)]" />
      </div>

      <div className="p-4">
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
