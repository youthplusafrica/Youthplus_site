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
  {
    id: "youthplus-radio",
    name: "Youth+ Radio",
    blurb:
      "Evergreen youth-led content highlighting impact stories and entrepreneurs across Africa (shows include SaniiSanaa, H.E.R., and INC/Biashara 101).",
    events: [
      {
        title: "One on one with Quinta Onditi",
        date: "2025-07-04",
        location: "Youtube",
        imageSrc: "/images/events/radio-live-2025-05.jpg",
        description: "Live taping with founders on building in Africa.",
        details: "From data labs to tractors on African farms, our guest has seen it all. In this episode she unpacks the bold career moves that took her from research to venture capital and now, leading partnerships at Hello Tractor.",
        youtubeUrl: "https://youtu.be/F7mF5AswP5c?si=lyy5wOgyHMnggWAD",
        hasFutureEvents: false,
      },
      {
        title: "One on one with Grace Gikonyo",
        date: "2025-06-20",
        location: "Youtube",
        imageSrc: "/images/events/radio-her-2024-12.jpg",
        description: "A live H.E.R. session with women champions in business and society.",
        details: "In this episode of Connect One On One, we sit down with Grace Gikonyo, the brilliant mind behind Maynet PR & Marketing Agency for an honest and insightful conversation on all things PR, marketing, and personal branding. Whether you're an entrepreneur, creative, or young professional navigating today’s competitive space, Grace gives insights on how to position yourself, tell your story, and build influence authentically.",
        youtubeUrl: "https://youtu.be/ZjoxzreEy7c?si=f6QeYFZ8_H1Lo04p",
        hasFutureEvents: false,
      },
      {
        title: "One on one with Andrew Muriuki",
        date: "2025-06-30",
        location: "Youtube",
        imageSrc: "/images/events/radio-biashara-2024-12.jpg",
        details: "In this episode of Connect One On One, we sit down with Andrew Muriuki, the visionary CEO of BARBAH Games, to explore the future of E-Sports in Africa and how gaming can be a powerful tool for youth empowerment, education, and achieving the Sustainable Development Goals (SDGs). Whether you're a gamer, educator, policymaker, or entrepreneur, this conversation will open your eyes to the potential of gaming in Africa.",
        youtubeUrl: "https://youtu.be/lUSC5ZEK_KA?si=2qEeSGXw7AjafQQq",
        hasFutureEvents: false
      },
      {
        title: "One on one with Stephanie Ng'ang'a",
        date: "2025-07-11",
        location: "Youtube",
        imageSrc: "/images/events/radio-2025-04.jpg",
        details: "In this episode, we sit down with the vibrant and insightful Stephanie Ng’ang’a, a rising voice in Kenya’s digital content scene and the powerhouse behind the SNS Podcast. From building a personal brand in today’s content-saturated world to navigating the highs and lows of podcasting, Stephanie shares her journey, creative process, and the lessons she’s learned along the way. Whether you’re a budding content creator or a podcast enthusiast, this conversation is packed with inspiration, real talk, and plenty of gems.",
        youtubeUrl: "https://youtu.be/AbsBpnmnVp0?si=ifml4Lzzhygril-H",
        hasFutureEvents: false
      },
      {
        title: "One on one with Victor Karanja",
        date: "2025-07-18",
        location: "Youtube",
        imageSrc: "/images/events/radio-2025-05.jpg",
        details: "In this episode of Connect One on One, we sit down with Victor Peace, a storyteller, creative force, and digital content creator who's made a name by turning passion into purpose. Victor opens up about how he got started in the world of content creation, the turning point that helped him realise this could be more than just a hobby, and what it really takes to scale your craft into a full-time career. From early challenges to personal breakthroughs, this conversation dives deep into the mindset, work ethic, and vision behind doing what you love and making a living from it.",
        youtubeUrl: "https://youtu.be/xZdGqWc0F-w?si=J3d6k56DiXbXN9qo",
        hasFutureEvents: false
      },
      {
        title: "One on one with Mariah Mariah",
        date: "2025-07-25",
        location: "Youtube",
        details: "In this episode, we sit down with Mariah, best known from the Mic Cheque Podcast, for an open and insightful conversation about her journey into the media industry. Mariah shares how she got her start, the obstacles she’s faced along the way, and what it truly takes to thrive in the fast-paced world of media. From navigating challenges as a Black woman in a competitive space to finding her voice and building a platform that resonates, Mariah offers a raw and honest look at both the hustle and the heart behind her success. Whether you're an aspiring creative, a fellow podcaster, or simply someone curious about what it takes to make it in media today, this interview is packed with valuable insights and inspiration. Don’t forget to like, comment, and subscribe for more powerful conversations like this.",
        youtubeUrl: "https://youtu.be/0b2EI5t2r2k?si=-E-GRDN5CBZhh4Ac",
        hasFutureEvents: false
      },
      {
        title: "One on one with Grace Akoth",
        date: "2025-08-01",
        location: "Youtube",
        details: "In this episode of Connect One-on-One, we sit down with career coach Grace Akoth for an honest and insightful conversation about balancing passion with the need to make a living. Grace shares practical advice on how to build a meaningful career without sacrificing financial stability, and breaks down some of the most common myths surrounding job hunting. Whether you're starting out, changing careers, or simply looking for direction, this episode offers valuable guidance on navigating the modern job market and finding fulfillment in your work.",
        youtubeUrl: "https://youtu.be/HkyrxxlPpgE?si=fIyhYhmGatsiU2VD",
        hasFutureEvents: false
      },
      {
        title: "One on one with Amos Ngahu",
        date: "2025-08-08",
        location: "Youtube",
        details: "Finance coach Amos Ngahu joins Ngina Mwaluko on Connect One On One to share his personal journey with money from struggles to smart financial habits. This episode is packed with real-life lessons on discipline, mindset, and building wealth.",
        youtubeUrl: "https://youtu.be/P5pPQEkrEbo?si=FOwhvX07hJb8hlLA",
        hasFutureEvents: false
      },
      {
        title: "One on one with Immanuel Momanyi",
        date: "2025-08-22",
        location: "Youtube",
        details: "In this episode of Connect One On One, we sit down with the Head of Accelleration at Villgro Africa, Immanuel Momanyi for a raw and honest conversation about what it really takes to build a startup from the ground up. Forget the glossy headlines, Immanuel shares the unfiltered truths behind scaling challenges, team dynamics, and the emotional highs and why entrepreneurs should aim at solving real problems. Whether you're an aspiring founder, investor, or simply curious about the startup world, this episode delivers practical insights and inspiration you won’t want to miss.",
        youtubeUrl: "https://youtu.be/NeVpVokppOo?si=f_HE5Fy4WxvBPmHu",
        hasFutureEvents: false
      },
      {
        title: "One on one with Michael Omuga",
        date: "2025-08-29",
        location: "Youtube",
        details: "Connect 1 On 1 presents an insightful conversation with Michael Omuga, a leading financial expert, where we dive deep into the crucial financial foundations every startup founder needs to understand. In this episode, Michael shares practical advice on how entrepreneurs can accurately value their companies, manage their finances effectively, and position themselves to attract investors. If you're building a startup or planning to raise capital, this episode offers actionable strategies on understanding startup valuation, avoiding common financial mistakes, and what truly matters to investors when deciding where to put their money. Michael breaks down complex financial concepts into simple, relatable terms, making it easier for founders at any stage to grasp and implement. Whether you're just starting out or looking to scale, this episode is packed with insights that will help you make smarter financial decisions and improve your chances of securing investment. It's a must-watch for startup founders, entrepreneurs, and anyone interested in startup funding, business valuation, or financial literacy in the business world.",
        youtubeUrl: "https://youtu.be/j1RAhaOQ0TQ?si=AD6jGguETxhJ2ben",
        hasFutureEvents: false
      },
      {
        title: "One on one with Waithaka Gatumia",
        date: "2025-09-12",
        location: "Youtube",
        details: "In this episode of Connect One on One, we host Waithaka Gatumia, a renowned investment expert, entrepreneur, and thought leader, for an inspiring conversation on money, value, and growth. Waithaka shares powerful insights on why chasing value rather than money is the key to long-term success, sustainable wealth, and true fulfillment. He breaks down how the right investment mindset can transform not only your finances but also your personal and professional journey. Whether you are looking for practical investment strategies, tips on building lasting value, or lessons on unlocking your potential, this episode offers timeless wisdom that applies to both beginners and seasoned investors. Waithaka Gatumia’s perspective on growth, wealth creation, and personal development will challenge the way you think about success and inspire you to focus on what truly matters. Tune in to discover how to invest wisely, grow steadily, and chase opportunities that build lasting value. If you’re passionate about financial literacy, entrepreneurship, personal growth, and becoming the best version of yourself, this conversation is for you. Don’t forget to like, share, and subscribe to Connect One on One for more insightful interviews with thought leaders and change-makers.",
        youtubeUrl: "https://youtu.be/0_ck7EQB5so?si=kRoxJHkhI6SMLr3S",
        hasFutureEvents: false
      }
    ],
  },

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
