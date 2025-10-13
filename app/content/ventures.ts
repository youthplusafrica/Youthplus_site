import { EventItem } from "../components/EventCard";

export type Venture = {
  id: string; // slug, used for #anchors and links
  name: string; // display name
  blurb?: string; // short description
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
        title: "Connect: Dear Money",
        date: "2025-07-15",
        location: "ALX the Piano, Brookside Dr.",
        imageSrc: "/images/connect-dear-money.jpeg",
        description:
          "A journaling journey through your money past, present and potential.",
        details:
          "Participants walked away with complete clarity on your money blocks and limiting beliefs, practical tools to rewrite your financial story, a supportive community of like minded individuals, actionable strategies you can implement immediately and the confidence to make better money decisions.",
        galleryUrl: "https://youthplusafrica.pixieset.com/connect-dear-money/",
        hasFutureEvents: false,
        link: "https://forms.gle/An82V5NKZqu76Dwz6",
      },
      {
        title: "Connect: Digital Presence",
        date: "2025-08-16",
        location: "Online",
        imageSrc: "/images/connect-dpresence.jpeg",
        description: "How your online image shapes your opportunities",
        details:
          "Your digital presence is your new business card! In today's world, opportunities find you online befor they find you offline. Your digital presence isn't just nice to have - it's essential for career growth, business success and personal branding.",
        hasFutureEvents: true,
        link: "https://forms.gle/An82V5NKZqu76Dwz6",
      },
      {
        title: "Connect: Charting the Capital of You.",
        date: "2025-09-26",
        location: "LaunchPad Coworking, Westlands Avenue",
        imageSrc: "/images/connect-fxpesa.jpeg",
        description:
          "Flagship youth culture & policy forum bringing creators, leaders, and partners together.",
        link: "https://forms.gle/An82V5NKZqu76Dwz6",
        details:
          "Do you know how investing, trading and forex actually work? Or how financial markets move money? This month we've got you covered! Connect by Youth+ Africa in Partnership with FXPesa will break it down for you. What's in it for you? You get to learn financial markets in a simple and practical way, place your first ever demo trade live and also stand a chance to win a $200 live trading account.",
        hasFutureEvents: false,
        galleryUrl:
          "https://youthplusafrica.pixieset.com/chartingthecapitalofyou/",
      },
      {
        title: "Connect: IP Rights and Legal",
        date: "2025-10-31",
        location: "TBD",
        imageSrc: "/images/coming-soon.png",
        description: "",
        details:
          "A practical session for creators, founders, and innovators to demystify intellectual property. Learn how to protect your work, navigate contracts, avoid common pitfalls, and position your brand for partnerships and growth—guided by legal experts and real case studies.",
        hasFutureEvents: false,
      },
      {
        title: "The Currency of Exchange",
        date: "2025-08-30",
        location: "Strathmore Business School",
        imageSrc: "/images/currency-exchange.jpeg",
        description: "Driving business evolution",
        details:
          "A powerful day with speakers, entrepreneurs and thought leaders navigating the future of business growth, innovation and sustainable success.",
        hasFutureEvents: false,
      },
      {
        title: "Connect: Customer Service",
        date: "2025-11-28",
        location: "TBD",
        imageSrc: "/images/coming-soon.png",
        details: "A fast-paced, hands-on session on building trust at every touchpoint. Learn the systems, habits, and scripts that turn complaints into loyalty, measure satisfaction, and scale a service culture across teams—so customers feel seen, heard, and eager to return.",
        hasFutureEvents: false,
      },
      {
        title: "Connect: Community and Members Networking",
        date: "2025-12-05",
        location: "TBD",
        imageSrc: "/images/coming-soon.png",
        details: "a high-energy meetup to spark real connections. Swap ideas, find collaborators, and discover opportunities across the Youth+ ecosystem—guided icebreakers, rapid intros, and open networking that turn “nice to meet you” into “let’s build this.”",
        hasFutureEvents: false,
      },
      {
        title: "Connect: Accelerating Careers in E-mobility",
        date: "2025-03-21",
        location: "N/A",
        imageSrc: "/images/coming-soon.png",
        description: "Driving business evolution",
        details:
          "E-mobility is accelerating across Africa, with Kenya leading the charge. At our “Careers in E-mobility” session, a leader from Basi Go shared how locally designed and assembled electric buses are reshaping urban transport—and where young people fit in. From engineering and battery tech to fleet management, software, and policy, the opportunities are growing fast. The future is green—are you ready to help build it?",
        hasFutureEvents: false,
      },
      {
        title: "Connect: Meet Your Taxes Workshop",
        date: "2025-06-20",
        location: "Startup Garage",
        imageSrc: "/images/coming-soon.png",
        details: "We hosted the KRA Tax Masterclass and filing session in collaboration with Startinev and KRA - a much needed space where entrepreneurs could ask real questions, get clarity and finally breathe when it comes to taxes.",
        hasFutureEvents: false
      },
      {
        title: "Build your brand bootcamp",
        date: "2025-09-05",
        location: "Swiss Lenana Mount Hotel",
        imageSrc: "/images/coming-soon.png",
        details: "Build a personal brand that opens doors. Join the Build Your Brand Bootcamp—a 2-day, hands-on experience led by globally recognized experts in branding, public speaking, digital marketing, and leadership.",
        hasFutureEvents: false
      }
    ],
  },

  // --- WE CREATE ---
  // {
  //   id: "youthplus-radio",
  //   name: "Youth+ Radio",
  //   blurb:
  //     "Evergreen youth-led content highlighting impact stories and entrepreneurs across Africa (shows include SaniiSanaa, H.E.R., and INC/Biashara 101).",
  //   events: [
  //     {
  //       title: "Youth+ Radio Live: Founders Night",
  //       date: "2025-05-23",
  //       location: "Nairobi",
  //       imageSrc: "/images/events/radio-live-2025-05.jpg",
  //       description: "Live taping with founders on building in Africa.",
  //       youtubeUrl: "https://www.youtube.com/watch?v=yourvideo3",
  //       hasFutureEvents: false,
  //     },
  //     {
  //       title: "H.E.R. Special – Women in Leadership",
  //       date: "2024-12-08",
  //       location: "Nairobi",
  //       imageSrc: "/images/events/radio-her-2024-12.jpg",
  //       description: "A live H.E.R. session with women champions in business and society.",
  //       youtubeUrl: "https://www.youtube.com/watch?v=yourvideo4",
  //       hasFutureEvents: false,
  //     },
  //   ],
  // },

  // --- WE LEAD ---
  // {
  //   id: "podquest",
  //   name: "PodQuest",
  //   blurb:
  //     "A Youth+ Radio competition (launched 2024) to discover novel, creative podcasts—culminating in a finals Demo Day.",
  //   events: [
  //     {
  //       title: "PodQuest 2025 – Demo Day",
  //       date: "2025-08-10",
  //       location: "Nairobi",
  //       imageSrc: "/images/events/podquest-2025-08.jpg",
  //       description: "Finalists present pilot episodes to a live audience and judges.",
  //       youtubeUrl: "https://www.youtube.com/watch?v=yourvideo5",
  //       galleryUrl: "https://photos.app.goo.gl/your-album-3",
  //       hasFutureEvents: false,
  //     },
  //   ],
  // },
  // {
  //   id: "youthplus-festival",
  //   name: "Youth+ Festival",
  //   blurb:
  //     "East Africa’s fast-growing youth entrepreneurship festival—keynotes, masterclasses, skills villages, and policy dialogue with regional leaders.",
  //   events: [
  //     {
  //       title: "Youth+ Festival 2025",
  //       date: "2025-11-12",
  //       location: "Nairobi",
  //       imageSrc: "/images/events/festival-2025-11.jpg",
  //       description: "Flagship youth culture & entrepreneurship forum.",
  //       details:
  //         "A culmination of the year’s activities—training, creation, growth, and leadership—featuring leaders and partners across Africa.",
  //       youtubeUrl: "https://www.youtube.com/watch?v=yourfestivalvideo",
  //       galleryUrl: "https://photos.app.goo.gl/your-festival-album",
  //       hasFutureEvents: false,
  //     },
  //   ],
  // },
];
