import { EventItem } from "../components/EventCard";

export type ConnectMonth = {
  month: number; // 1-12
  monthName: string;
  theme: string;
  partners?: string;
  events: (EventItem & {
    type: "IG Live" | "Webinar" | "On-site";
  })[];
};

export const CONNECT_2026: ConnectMonth[] = [
  {
    month: 1,
    monthName: "January",
    theme: "Goal Setting & Vision 2026",
    partners: "Coach Wangui, Coach Lorraine (Beyond the Savannah), Coach Mumbi Kamau",
    events: [
      {
        title: "Reset & Realign",
        type: "IG Live",
        date: "2026-01-06",
        location: "Online",
      },
      {
        title: "BLUEPRINT: Turning Vision into an Action Plan",
        type: "Webinar",
        date: "2026-01-13",
        location: "Online",
        imageSrc: "/images/blueprint.png",
        description: "Clarify your goals, align your priorities, and build a practical roadmap for 2026.",
        details: "Join us for a live webinar focused on goal setting and action planning for the year 2026. Learn how to turn your vision into actionable steps and set yourself up for success.\n\nKey Takeaways:\n• How to set clear, achievable goals for 2026\n• Turning big ideas into practical monthly action plans\n• Avoiding common goal-setting mistakes\n• Staying focused and accountable throughout the year\n\nSpeakers:\n• Lorraine Otieno - Career Coach, Founder of Beyond the Savannah\n• Wangui Mungai - Self-Sabotage, Procrastination and Mindset Coach\n• John Wafula - Moderator, Communication Coach, Corporate MC\n\nDate: 13th January 2026\nTime: 7:00 PM - 8:00 PM EAT",
        link: "https://forms.gle/Yg5k5QjJtX1VFwvp8",
        hasFutureEvents: true,
      },
      {
        title: "Visioning Workshop",
        type: "On-site",
        date: "2026-01-23",
        location: "Sarit Expo Centre, Westlands",
        imageSrc: "/images/visioning_poster.png",
        description: "Join us for an immersive in-person workshop to set your vision for 2026.",
        details: "Transform your aspirations into a clear, actionable vision. This physical event brings together goal-setters, visionaries, and changemakers for a hands-on workshop experience.",
        link: "https://youthplusafrica.hustlesasa.shop/?product=72677",
        hasFutureEvents: true,
      },
    ],
  },
  {
    month: 2,
    monthName: "February",
    theme: "AI x Creativity x Human Potential",
    events: [
      {
        title: "AI for Everyday Life",
        type: "IG Live",
        date: "2026-02-03",
        location: "Online",
        imageSrc: "/images/ai_for_everyday_life.jpg",
        description: "What if the difference between burnout and balance—or slow growth and smart growth—was how well you use AI in your daily work and business decisions? Tune in to our Instagram Live with Moses Were as we break down simple, practical ways to integrate AI into your workflow for better productivity and growth.",
        details: "Join us for an Instagram Live session with Moses Were, Digital Marketing Strategist & Trainer and Founder of Strive Creatives, as we explore practical ways to integrate AI into your daily work and business decisions.\n\nDate: February 3, 2026, Tuesday\nTime: 7:00 PM - 8:00 PM EAT\nPlatform: Instagram Live\nSpeaker: Moses Were (@moseswere_digital)\n\nLearn how to use AI tools effectively to improve productivity, make smarter business decisions, and achieve better work-life balance.",
        hasFutureEvents: true,
      },
      {
        title: "State of Women in AI",
        type: "Webinar",
        date: "2026-02-10 & 2026-02-17", // Primary date for sorting/filtering
        dates: ["2026-02-10", "2026-02-17"], // Both dates for display
        location: "Online",
        imageSrc: "/images/state_of_women_ai_1.jpg", // Primary image for card display
        imageSrcs: [
          "/images/state_of_women_ai_1.jpg",
          "/images/state_of_women_ai_2.jpg",
        ],
        description: "A 2-Part Webinar Series exploring the state of women in AI, from participation and power to pathways for influence and leadership.",
        details: "Join us for a comprehensive 2-part webinar series examining the current state of women in AI.\n\nPart I | Feb 10, 7:00 PM (EAT) - Where do women stand in the AI ecosystem today? From participation and power, to visibility, access, and decision-making — this session takes an honest look at the current state of women in AI.\n\nPart 2 | Feb 17, 7:00 PM (EAT) - How women can move from awareness to influence. Pathways to agency, governance, and leadership in AI. Creating real, tangible value in the AI ecosystem.\n\nSpeaker: Shi Kang'ethe, Head of AI | www.esotericstrats.com",
        hasFutureEvents: true,
        link: "https://forms.gle/XPs1Dcas1W4d5GWk7"
      },
      {
        title: "The Future of Work",
        type: "On-site",
        date: "2026-02-27",
        location: "Sarit Expo Centre, Westlands",
        imageSrc: "/images/future_of_work.jpg",
        description: "AI. Skills. Careers. Power. A high-impact, in-person experience for professionals navigating what's next.",
        details: "The Future of Work Is Here — Are You Ready For It?\n\nA high-impact, in-person experience for professionals navigating what's next. Join industry leaders and innovators as we explore the intersection of AI, creativity, and human potential.\n\nSpeakers:\n• Shi Kang'ethe — Founder, Toxic Work Spaces\n• Mosses Were — Founder, Strive Creatives\n• Mitchelle Jangara — AI-Powered Content Strategist\n• Miringa — Agentic AI Expert & Educator\n• Imelda Mugambi — Moderator\n\nDate: 27th February 2026\nTime: 2:00 PM - 7:00 PM\nVenue: Sarit Expo Centre, Westlands, Nairobi\n\nTicket Pricing:\n• Early Bird: KES 800\n• Advance: KES 1,000\n• Gate: KES 1,300\n• Exhibitors: KES 1,500\n\nTickets available on HustleSasa.",
        link: "https://youthplus.hustlesasa.shop/products/698aebe011d0fa359931b36a",
        hasFutureEvents: true,
      },
    ],
  },
  {
    month: 3,
    monthName: "March",
    theme: "Women’s Month",
    events: [
      {
        title: "Women Shaping Their Stories",
        type: "IG Live",
        date: "2026-03-03",
        location: "Online",
      },
      {
        title: "Leadership & Economic Empowerment",
        type: "Webinar",
        date: "2026-03-10",
        location: "Online",
      },
      {
        title: "HER Connect 2026 Summit",
        type: "On-site",
        date: "2026-03-27",
        location: "TBC",
      },
    ],
  },
  {
    month: 4,
    monthName: "April",
    theme: "Wellness & Self-Leadership",
    events: [
      {
        title: "Navigating Pressure as Gen Z",
        type: "IG Live",
        date: "2026-04-07",
        location: "Online",
      },
      {
        title: "Nervous System 101",
        type: "Webinar",
        date: "2026-04-14",
        location: "Online",
      },
      {
        title: "Mindset & Balance Retreat",
        type: "On-site",
        date: "2026-04-24",
        location: "TBC",
      },
    ],
  },
  {
    month: 5,
    monthName: "May",
    theme: "Climate & Sustainability",
    events: [
      {
        title: "Climate Reality",
        type: "IG Live",
        date: "2026-05-05",
        location: "Online",
      },
      {
        title: "Green Skills & Jobs",
        type: "Webinar",
        date: "2026-05-12",
        location: "Online",
      },
      {
        title: "Eco Futures Expo",
        type: "On-site",
        date: "2026-05-29",
        location: "TBC",
      },
    ],
  },
  {
    month: 6,
    monthName: "June",
    theme: "Taxation & Money",
    events: [
      {
        title: "Taxation 101",
        type: "IG Live",
        date: "2026-06-02",
        location: "Online",
      },
      {
        title: "Side-Hustle Economy",
        type: "Webinar",
        date: "2026-06-09",
        location: "Online",
      },
      {
        title: "Money Map Summit",
        type: "On-site",
        date: "2026-06-26",
        location: "TBC",
      },
    ],
  },
  {
    month: 7,
    monthName: "July",
    theme: "Dear Money Month",
    events: [
      {
        title: "Your Money Story",
        type: "IG Live",
        date: "2026-07-07",
        location: "Online",
      },
      {
        title: "Money Psychology",
        type: "Webinar",
        date: "2026-07-14",
        location: "Online",
      },
      {
        title: "Dear Money Experience",
        type: "On-site",
        date: "2026-07-31",
        location: "TBC",
      },
    ],
  },
  {
    month: 8,
    monthName: "August",
    theme: "Tech, Innovation & Digital Skills",
    events: [
      {
        title: "Digital Skills That Pay",
        type: "IG Live",
        date: "2026-08-04",
        location: "Online",
      },
      {
        title: "Innovation for Beginners",
        type: "Webinar",
        date: "2026-08-11",
        location: "Online",
      },
      {
        title: "Tech Future Fair",
        type: "On-site",
        date: "2026-08-28",
        location: "TBC",
      },
    ],
  },
  {
    month: 9,
    monthName: "September",
    theme: "Career & Workplace Readiness",
    events: [
      {
        title: "Career Pivoting",
        type: "IG Live",
        date: "2026-09-01",
        location: "Online",
      },
      {
        title: "Gen Z Workplace Culture",
        type: "Webinar",
        date: "2026-09-08",
        location: "Online",
      },
      {
        title: "CareerConnect Expo",
        type: "On-site",
        date: "2026-09-25",
        location: "TBC",
      },
    ],
  },
  {
    month: 10,
    monthName: "October",
    theme: "Entrepreneurship Month",
    events: [
      {
        title: "Idea to Income",
        type: "IG Live",
        date: "2026-10-06",
        location: "Online",
      },
      {
        title: "Funding 101",
        type: "Webinar",
        date: "2026-10-13",
        location: "Online",
      },
      {
        title: "StartUp Connect",
        type: "On-site",
        date: "2026-10-30",
        location: "TBC",
      },
    ],
  },
  {
    month: 11,
    monthName: "November",
    theme: "Lifestyle & Wellness",
    events: [
      {
        title: "Lifestyle Design",
        type: "IG Live",
        date: "2026-11-03",
        location: "Online",
      },
      {
        title: "Burnout & Boundaries",
        type: "Webinar",
        date: "2026-11-10",
        location: "Online",
      },
      {
        title: "Wellness Day Experience",
        type: "On-site",
        date: "2026-11-27",
        location: "TBC",
      },
    ],
  },
  {
    month: 12,
    monthName: "December",
    theme: "Reflection & Celebration",
    events: [
      {
        title: "2026 Wrapped",
        type: "IG Live",
        date: "2026-12-01",
        location: "Online",
      },
      {
        title: "Planning for 2027",
        type: "Webinar",
        date: "2026-12-08",
        location: "Online",
      },
      {
        title: "Community Party",
        type: "On-site",
        date: "2026-12-25",
        location: "TBC",
      },
    ],
  },
];


