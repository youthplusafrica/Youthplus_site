
export type Tier = {
  key: string;
  name: string;
  price: string;
  perks: string[];
  featured?: boolean;
};

export const FESTIVAL_TIERS: Tier[] = [
  {
    key: "platinum",
    name: "Platinum (Title Sponsor)",
    price: "$50,000",
    featured: true,
    perks: [
      "Exclusive branding as the Platinum (Title) Sponsor of Youth+ Festival",
      "Prime logo placement across all festival marketing (banners, brochures, website, social)",
      "Keynote speaking slot during the Opening Ceremony (senior executive/CEO)",
      "Private networking session with top entrepreneurs, investors, and influencers",
      "Featured mention in all press releases and media coverage",
      "Premium exhibition space",
      "15 VIP passes",
      "Special recognition award on stage",
    ],
  },
  {
    key: "gold",
    name: "Gold",
    price: "$35,000",
    perks: [
      "Prominent branding on festival marketing, website, and social",
      "Panel participation for a senior executive",
      "Access to networking sessions",
      "Mention in press releases and media coverage",
      "Standard exhibition space",
      "10 VIP passes",
      "Recognition during the event",
    ],
  },
  {
    key: "silver",
    name: "Silver",
    price: "$25,000",
    perks: [
      "Branding on selected festival marketing and website",
      "Panel participation opportunity",
      "Access to networking sessions",
      "Mention in selected press releases",
      "Exhibition space",
      "3 VIP passes",
    ],
  },
  {
    key: "bronze",
    name: "Bronze",
    price: "$10,000",
    perks: [
      "Logo on festival website and selected materials",
      "Participation in event activities",
      "Access to networking sessions",
      "Mention in event communications",
      "Exhibition space",
      "5 VIP passes",
    ],
  },
  {
    key: "panel",
    name: "Panel Partner",
    price: "$5,000",
    perks: [
      "Logo on website and selected materials",
      "Panel participation for a senior executive",
      "Access to networking sessions",
      "Mention in event communications",
      "Exhibition space",
      "2 VIP passes",
    ],
  },
  {
    key: "village",
    name: "Village Partner",
    price: "$1,500",
    perks: [
      "Logo on website and selected materials",
      "Branding of selected villages (up to 3) at entrances and inside",
      "Access to networking sessions",
      "Mention in event communications",
      "Exhibition space",
      "2 VIP passes",
    ],
  },
  {
    key: "community",
    name: "Community Partner",
    price: "$1,500",
    perks: [
      "50 tickets for your community",
      "Exhibition space",
      "Logo on promotional materials as Community Partner",
    ],
  },
];