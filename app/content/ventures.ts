import { EventItem } from "../components/EventCard";

export type Venture = {
  id: string;          // slug, used for #anchors and links
  name: string;        // display name
  blurb?: string;      // short description
  events: EventItem[]; // add all events; the page filters to last 12 months
};

export const VENTURES: Venture[] = [
  // --- WE TRAIN ---
  {
    id: "connect",
    name: "Connect",
    blurb:
      "Curated high-impact training workshops that bring together young changemakers for real conversations, skill-building, and networking.",
    events: [
      // EXAMPLES — replace with your real sessions (keep YYYY-MM-DD for filtering)
      {
        title: "Connect: Creative Careers – Nairobi",
        date: "2025-06-15",
        location: "Nairobi",
        imageSrc: "/images/events/connect-nairobi-2025-06.jpg",
        description: "Portfolio, pitching, and pathways with industry mentors.",
        details:
          "Hands-on sessions across design, media, and entrepreneurship. Cohort showcases plus partner networking.",
        galleryUrl: "https://photos.app.goo.gl/your-album",
        youtubeUrl: "https://www.youtube.com/watch?v=yourvideo",
        hasFutureEvents: false,
      },
      {
        title: "Connect: Business Basics – Kigali",
        date: "2025-02-10",
        location: "Kigali",
        imageSrc: "/images/events/connect-kigali-2025-02.jpg",
        description: "Registration, compliance, cashflow, and pitching for early founders.",
        hasFutureEvents: false,
      },
    ],
  },

  // --- WE CREATE ---
  {
    id: "youthplus-radio",
    name: "Youth+ Radio",
    blurb:
      "Evergreen youth-led content highlighting impact stories and entrepreneurs across Africa (shows include SaniiSanaa, H.E.R., and INC/Biashara 101).",
    events: [
      {
        title: "Youth+ Radio Live: Founders Night",
        date: "2025-05-23",
        location: "Nairobi",
        imageSrc: "/images/events/radio-live-2025-05.jpg",
        description: "Live taping with founders on building in Africa.",
        youtubeUrl: "https://www.youtube.com/watch?v=yourvideo3",
        hasFutureEvents: false,
      },
      {
        title: "H.E.R. Special – Women in Leadership",
        date: "2024-12-08",
        location: "Nairobi",
        imageSrc: "/images/events/radio-her-2024-12.jpg",
        description: "A live H.E.R. session with women champions in business and society.",
        youtubeUrl: "https://www.youtube.com/watch?v=yourvideo4",
        hasFutureEvents: false,
      },
    ],
  },

  // --- WE LEAD ---
  {
    id: "podquest",
    name: "PodQuest",
    blurb:
      "A Youth+ Radio competition (launched 2024) to discover novel, creative podcasts—culminating in a finals Demo Day.",
    events: [
      {
        title: "PodQuest 2025 – Demo Day",
        date: "2025-08-10",
        location: "Nairobi",
        imageSrc: "/images/events/podquest-2025-08.jpg",
        description: "Finalists present pilot episodes to a live audience and judges.",
        youtubeUrl: "https://www.youtube.com/watch?v=yourvideo5",
        galleryUrl: "https://photos.app.goo.gl/your-album-3",
        hasFutureEvents: false,
      },
    ],
  },
  {
    id: "youthplus-festival",
    name: "Youth+ Festival",
    blurb:
      "East Africa’s fast-growing youth entrepreneurship festival—keynotes, masterclasses, skills villages, and policy dialogue with regional leaders.",
    events: [
      {
        title: "Youth+ Festival 2025",
        date: "2025-11-12",
        location: "Nairobi",
        imageSrc: "/images/events/festival-2025-11.jpg",
        description: "Flagship youth culture & entrepreneurship forum.",
        details:
          "A culmination of the year’s activities—training, creation, growth, and leadership—featuring leaders and partners across Africa.",
        youtubeUrl: "https://www.youtube.com/watch?v=yourfestivalvideo",
        galleryUrl: "https://photos.app.goo.gl/your-festival-album",
        hasFutureEvents: false,
      },
    ],
  },
];
