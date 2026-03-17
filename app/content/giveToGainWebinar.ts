export type GiveToGainSpeaker = {
  name: string;
  role: string;
  bioExcerpt: string;
  imagePath: string;
  spotlight: string;
};

const webinarLink = process.env.NEXT_PUBLIC_GIVE_TO_GAIN_WEBINAR_LINK?.trim() || "";

export const GIVE_TO_GAIN_WEBINAR = {
  title: "Give to Gain Webinar Series",
  theme: "Leadership & Economic Empowerment",
  questionLine: "Can Women Have It All?",
  supportingCopy:
    "A conversation on leadership, purpose, and building economic power without losing yourself.",
  date: "March 24, 2026",
  time: "7:00 PM - 8:30 PM EAT",
  format: "Virtual",
  webinarLink,
  notificationEmail: "sam@youthplusafrica.com",
  speakers: [
    {
      name: "Stephanie Mambo",
      role: "Strategy and Risk Advisor, Sofala Partners",
      bioExcerpt:
        "Leads on strategic clarity, governance, and practical leadership decisions for sustained growth.",
      imagePath: "/images/steph_mambo.png",
      spotlight: "Reframing leadership with intention and measurable impact.",
    },
    {
      name: "Quinta Onditi",
      role: "Strategic Programs & Inclusive Finance Leader",
      bioExcerpt:
        "Designs inclusive programs that connect women to financing pathways, systems, and economic agency.",
      imagePath: "/images/quinta_onditi.png",
      spotlight: "Building income power through inclusive and intentional systems.",
    },
    {
      name: "Mumbua Muithya",
      role: "Digital Media Strategist, Moderator",
      bioExcerpt:
        "Guides high-impact conversations that keep complex leadership and career themes grounded and practical.",
      imagePath: "/images/mumbua_muithya.png",
      spotlight: "Moderating the conversation around ambition, identity, and balance.",
    },
    {
      name: "Josephine Mbeo",
      role: "Strategic Communications Leader & Corporate Affairs Expert",
      bioExcerpt:
        "Works at the intersection of communication, influence, and institutional leadership for long-term growth.",
      imagePath: "/images/josephine_mbeo.png",
      spotlight: "Leading with influence while protecting long-term well-being.",
    },
    {
      name: "Gloria Kisilu",
      role: "Founder & CEO, The Shaba",
      bioExcerpt:
        "Entrepreneur and builder focused on translating vision into revenue, resilience, and business scale.",
      imagePath: "/images/gloria_kisilu.png",
      spotlight: "Turning purpose into practical, sustainable economic outcomes.",
    },
  ] satisfies GiveToGainSpeaker[],
} as const;

export const GIVE_TO_GAIN_WEBINAR_STORAGE_KEY = "youthplus_give_to_gain_webinar_submitted";
