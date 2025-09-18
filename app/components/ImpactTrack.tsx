"use client";

import {
  ExperimentOutlined,
  FileSearchOutlined,
  GlobalOutlined,
  CloudOutlined,
  ReadOutlined,
  TeamOutlined,
} from "@ant-design/icons";

type Method = { title: string; description: string; icon: React.ReactNode };

const METHODS: Method[] = [
  {
    title: "Action research",
    description:
      "Allow youth+ and its partners to adapt and optimize strategies in real time.",
    icon: <ExperimentOutlined />,
  },
  {
    title: "Baseline formative surveys",
    description:
      "Questionnaires and discussions with ongoing and previous participants",
    icon: <FileSearchOutlined />,
  },
  {
    title: "Inter-country partnerships",
    description:
      "Kick off localized programming across multiple African markets.",
    icon: <GlobalOutlined />,
  },
  {
    title: "Leveraging technology",
    description:
      "Grow our digital footprint as a precursor to on-ground execution across the continent.",
    icon: <CloudOutlined />,
  },
  {
    title: "Dissemination & publication",
    description:
      "Dissemination and publication of lessons learnt and best practices.",
    icon: <ReadOutlined />,
  },
  {
    title: "Reach youth at scale",
    description:
      "Increase our positioning as a leading youth institution driving impact across Africa.",
    icon: <TeamOutlined />,
  },
];

export default function ImpactTrack() {
  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          How we track our impact
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {METHODS.map((m, i) => (
            <article
              key={i}
              className="rounded-2xl p-5 border border-black/10 relative overflow-hidden"
            >
              {/* corner accent */}
              <span
                className="absolute -right-6 -top-6 h-16 w-16 rotate-12"
                style={{ background: "var(--yplus-primary,#ead61f)", opacity: 0.18 }}
                aria-hidden="true"
              />
              <div className="flex items-start gap-3">
                <div className="shrink-0 grid place-items-center h-10 w-10 rounded-lg bg-black/5">
                  <span className="text-xl">{m.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="mt-1 text-black/80">{m.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* brand bar */}
      <div
        className="h-1 w-full bg-[var(--yplus-primary,#ead61f)]"
        aria-hidden="true"
      />
    </section>
  );
}
