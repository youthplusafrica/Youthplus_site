"use client";

import { Carousel } from "antd";
import Link from "next/link";
import Image from "next/image";

type PillarKey = "WE TRAIN" | "WE CREATE" | "WE GROW" | "WE LEAD";

export type Venture = {
  name: string;
  pillar: PillarKey;

  // Media
  coverImage?: string; // background image (card cover)
  logo?: string; // top-left badge
  logoAlt?: string;

  // Simple overlay (legacy)
  overlayDescription?: string;

  // Structured overlay (new)
  overlayBullets?: Array<string | React.ReactNode>; // bullet points
  impacts?: { value: string; label: string }[]; // impact stats
  overlayMedia?: string; // small photo inside overlay (right/top)
  overlayMediaAlt?: string;

  // Full control (overrides the above if provided)
  overlayContent?: React.ReactNode;

  // CTA
  externalLink?: string;
  ctaLabel?: string; // default: "Explore the app →"
};

/** Demo data — replace with your real ventures */
const VENTURES: Venture[] = [
  {
    name: "Connect",
    pillar: "WE TRAIN",
    coverImage: "/images/connect-1.jpeg",
    logo: "/images/connect-logo.png",
    logoAlt: "Connect logo",
    overlayDescription:
      "Connect is a curated series of high-impact training workshops bringing together Africa’s young changemakers, innovators, and creators. These sessions spotlight real conversations, skill-building, and networking that empower young people to lead innovation and social transformation. Your support can directly contribute to:",
    overlayBullets: [
      "Building entrepreneurial mindsets",
      "Promoting thought leadership",
      "Connecting brands to influential youth audiences",
    ],
    impacts: [
      {
        value: "3,200+",
        label:
          "Total in-person & virtual attendees across 8 sessions (2024–2025)",
      },
      {
        value: "30+",
        label: "Trainers, industry experts and mentors/thought leaders engaged",
      },
      { value: "15+", label: "New businesses started by participants" },
    ],
    overlayMediaAlt: "Connect workshop",
    externalLink: "#",
  },
  {
    name: "AppSkill",
    pillar: "WE TRAIN",
    coverImage: "/images/appskill.jpg",
    // logo: "/images/connect-logo.png",
    // logoAlt: "Connect logo",
    overlayContent: (
      <div>
        <p>
          AppSkill is a mobile app-based, on-demand learning platform that
          provides young professionals and aspiring/existing entrepreneurs the
          opportunity to sharpen their business acumen through effective
          training, practice & mentorship. AppSkill offers tailored vocational
          and training programmes to cater for differences in educational and
          vocational backgrounds, designed for professionals founders, startup
          teams and aspiring entrepreneurs, covering soft skills such as Public
          Speaking, The Art Of Negotiation, Building Teams, Leading Others,
          etc., and more professional skills such as Raising Capital, Crafting
          Resilient Strategies, Building Sustainable Business Models, etc.
        </p>
        <p className="mt-3 text-sm text-[var(--yplus-primary,#ead61f)] font-semibold">
          Development Phase
        </p>
        <h3 className="mt-3 text-2xl font-semibold">Beta Development</h3>
        <p>
          After piloting the MVP version of the application, and gathering
          feedback on the user interface, user experience and content on the
          platform, we have moved into the development of the Beta version of
          the application, to be completed in September 2025.
        </p>
      </div>
    ),
  },
  {
    name: "Youth+ Radio",
    pillar: "WE CREATE",
    coverImage: "/images/radio.jpg",
    overlayDescription:
      "We deliver on the promise of Youth+ Africa through creating evergreen content, highlighting stories of impact and bringing to the forefront, inspiring entrepreneurs creating change across the continent. The programming of Youth+ Radio is broken down into 3 segments:",
    impacts: [
      {
        value: "73.7K",
        label: "Total Views and Streams across YouTube and Spotify",
      },
      {
        value: "55+",
        label:
          "Business leaders, thought leaders, founders and entrepreneurs interviewed",
      },
      { value: "1.1K+", label: "Subscribers across YouTube and Spotify" },
    ],
    overlayBullets: [
      <>
        <span className="font-bold">SaniiSanaa</span>: a show dedicated to
        highlighting the ins and outs, ups and downs & intricacies among
        creatives, and bringing opportunities for
        youth to succeed.
      </>,
      <>
        <span className="font-bold">Meet HER</span>: with a focus on stories of
        women champions in business, leadership and society at large, H.E.R.
        speaks to stories of courage, influence and breathtaking innovations
        from young women across the continent.
      </>,
      <>
        <span className="font-bold">INC</span>: whether discussing the basics of
        registering a business, highlighting successful, self-made
        entrepreneurs, Biashara 101 is your go-to show for everything business.
      </>,
    ],
    externalLink: "#",
  },
  {
    name: "Stream",
    pillar: "WE CREATE",
    coverImage: "/images/stream.jpg",
    logo: "/images/streamplus.png",
    overlayContent: (
      <div>
        <p>
          Stream+ (Stream Ampersand Network), is an on-demand content platform
          developed to provide creators and media practitioners a centralized,
          revenue- generating platform from which they can recoup their
          investment through a more efficient pathway to profitability.
        </p>
        <p className="mt-3">
          The platform integrates a hybrid of subscription-based and
          pay-per-view business models for creators, allowing them to achieve
          revenue milestones faster than existing platforms, validating the
          business case for their content and bridging the gap between ideation
          and distribution for young creators.
        </p>
        <p className="mt-3 text-sm text-[var(--yplus-primary,#ead61f)] font-semibold">
          Development Phase
        </p>
        <h3 className="mt-3 text-2xl font-semibold">In Development</h3>
        <p>
          The streaming platform is currently in development, with key
          functionalities such as Pay-Per-View, direct payment integration for
          creators, account security and content anti-piracy measures being the
          focus on ongoing product development.
        </p>
      </div>
    ),
    impacts: [{ value: "Pilot", label: "Underway" }],
    externalLink: "#",
  },
  {
    name: "All AXS",
    pillar: "WE GROW",
    coverImage: "/images/Allaxs.png",
    logo: "/images/AllAxsLogo.png",
    overlayDescription:
      "All Aggregated Xperiential Stores (All AXS) was envisioned as a gateway to open the doors of opportunity to Young Creators and Curators, Community Event Organizers and Digital/Virtual Event Planners, putting the control of the sale of tickets, merchandise and services into the hands of young creators. Our goals is to collaborate with communities, creatives and curators of immersive and inclusive events across live and virtual experiences, offering a uniquely accessible, user-friendly and enterprise first platform for our stakeholders to popularize and commercialize their event experiences.",
    impacts: [
      { value: "10+", label: "Creators and Small Business Partnered With" },
      { value: "3M+", label: "In ticket sales from creators using the platform for live and virtual events." },
			{ value: "1.1K+", label: "Subscribers across YouTube and Spotify"}
    ],
    externalLink: "#",
  },
  {
    name: "PodQuest",
    pillar: "WE GROW",
    coverImage: "/images/podquest.jpg",
    logo: "/images/PodQuest.png",
    overlayDescription:
      "'PodQuest' is an exciting competition by Youth+ Radio aimed at discovering the freshest, most novel and creative podcast out there, kickstarted in 2024! Kicking off during International Youth Month, the competition will span 8 weeks, culminating in a grand finale dubbed Demo Day, where finalists present their pilot episodes in front of our panel of judges and a live audience.",
    impacts: [
      { value: "50+", label: "Total Podcast Idea submissions in the inaugural competition" },
      { value: "10", label: "Mentors and Judges that mentored the Finalists over a 4-week program and Demo Day finals." },
			{ value: "4", label: "Overall Winners and Podcasts birthed from the Inaugural #PodQuest2024"}
    ],
    externalLink: "#",
  },
  {
    name: "Youth+ Festival",
    pillar: "WE LEAD",
    coverImage: "/images/festival-1.jpg",
    logo: "/images/youthplus_festival.png",
    overlayDescription:
      "All Aggregated Xperiential Stores (All AXS) was envisioned as a gateway to open the doors of opportunity to Young Creators and Curators, Community Event Organizers and Digital/Virtual Event Planners, putting the control of the sale of tickets, merchandise and services into the hands of young creators. Our goals is to collaborate with communities, creatives and curators of immersive and inclusive events across live and virtual experiences, offering a uniquely accessible, user-friendly and enterprise first platform for our stakeholders to popularize and commercialize their event experiences.",
    impacts: [
      { value: "4800+", label: "Youth in attendance over the first 2 editions of the Youth+ Festival." },
      { value: "65+", label: "Business Leaders, Captains of Industry and Partners collaborated with as Speakers, Panelists and Trainers" },
			{ value: "3.5M+", label: "Aggregated reach across social media, reaching over 8 countries in East, West and Southern Africa"}
    ],
    externalLink: "#",
  },
];

const ORDER: PillarKey[] = ["WE TRAIN", "WE CREATE", "WE GROW", "WE LEAD"];

export default function VenturesByPillar({
  data = VENTURES,
}: {
  data?: Venture[];
}) {
  return (
    <section id="ventures" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Ventures under each pillar
        </h2> */}

        {ORDER.map((pillar) => {
          const items = data.filter((v) => v.pillar === pillar);
          if (!items.length) return null;

          return (
            <div key={pillar} className="mt-8">
              <h3 className="text-lg font-semibold mb-3 bg-[var(--yplus-primary,#ead61f)] px-3 py-1 rounded-full">{pillar}</h3>

              <Carousel dots className="yplus-carousel" draggable>
                {items.map((v) => (
                  <div key={v.name}>
                    <article className="group relative h-[75vh] md:h-128 rounded-2xl overflow-hidden border border-black/10">
                      {/* Cover */}
                      <div
                        className="absolute inset-0 bg-center bg-cover"
                        style={{
                          backgroundImage: v.coverImage
                            ? `url(${v.coverImage})`
                            : "linear-gradient(135deg,#ead61f,#000)",
                        }}
                        aria-hidden="true"
                      />

                      {/* dimmer (visible on hover desktop; visible by default on mobile for readability) */}
                      <div className="absolute inset-0 bg-black/45 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />

                      {/* Logo badge */}
                      {(v.logo || v.name) && (
                        <div className="absolute top-3 left-3 z-10">
                          {v.logo ? (
                            <div className="rounded-xl backdrop-blur px-2 py-2 border border-black/10 shadow-sm">
                              <Image
                                src={v.logo}
                                alt={v.logoAlt || `${v.name} logo`}
                                width={110}
                                height={36}
                                className="h-9 w-auto object-contain"
                              />
                            </div>
                          ) : (
                            // <div className="h-9 w-9 rounded-md bg-white/90 text-black grid place-items-center text-sm font-bold border border-black/10">
                            //   {v.name.charAt(0)}
                            // </div>
                            <div></div>
                          )}
                        </div>
                      )}

                      {/* OVERLAY CONTENT */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-end">
                        <h4 className="text-xl font-bold text-white">
                          {v.name}
                        </h4>

                        {/* If you pass custom overlayContent, render that */}
                        {v.overlayContent ? (
                          <div className="mt-2 text-white/90">
                            {v.overlayContent}
                          </div>
                        ) : (
                          // Otherwise, render a rich default from fields
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                            {/* Text column */}
                            <div className="md:col-span-8">
                              {v.overlayDescription && (
                                <p className="text-white/90 text-xs md:text-base">
                                  {v.overlayDescription}
                                </p>
                              )}

                              {v.overlayBullets &&
                                v.overlayBullets.length > 0 && (
                                  <ul className="mt-2 list-disc pl-5 space-y-1 text-white/90">
                                    {v.overlayBullets.map((b, i) => (
                                      <li key={i} className="text-xs md:text-base">{b}</li>
                                    ))}
                                  </ul>
                                )}

                              {v.impacts && v.impacts.length > 0 && (
                                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {v.impacts.map((imp, i) => (
                                    <div
                                      key={i}
                                      className="rounded-lg bg-white/10 p-3"
                                    >
                                      <div className="text-base md:text-lg font-extrabold text-[var(--yplus-primary,#ead61f)]">
                                        {imp.value}
                                      </div>
                                      <div className="text-white/85 text-[10px] md:text-sm">
                                        {imp.label}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Media thumb (optional) */}
                            {v.overlayMedia && (
                              <div className="md:col-span-4">
                                <div className="overflow-hidden rounded-lg border border-white/15 bg-white/5">
                                  <Image
                                    src={v.overlayMedia}
                                    alt={v.overlayMediaAlt || `${v.name} photo`}
                                    width={400}
                                    height={240}
                                    className="w-full h-24 md:h-32 object-cover object-center"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* CTA */}
                        {v.externalLink && (
                          <Link
                            href={v.externalLink}
                            target="_blank"
                            className="mt-3 inline-block text-[var(--yplus-primary,#ead61f)] underline-offset-2"
                          >
                            {v.ctaLabel ?? "Explore the app →"}
                          </Link>
                        )}
                      </div>
                    </article>
                  </div>
                ))}
              </Carousel>
            </div>
          );
        })}
      </div>
    </section>
  );
}
