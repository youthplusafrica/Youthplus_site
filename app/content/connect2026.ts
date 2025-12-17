import { EventItem } from "../components/EventCard";

export type ConnectMonth = {
  month: number; // 1-12
  monthName: string;
  theme: string;
  partners?: string;
  events: (EventItem & {
    type: "IG Live" | "Webinar" | "Physical";
  })[];
};

export const CONNECT_2026: ConnectMonth[] = [
  {
    month: 1,
    monthName: "January",
    theme: "Goal Setting & Vision 2026",
    partners: "Coach Wangui, Lorraine, Mumbi Kamau",
    events: [
      {
        title: "Reset & Realign",
        type: "IG Live",
        date: "2026-01-06",
        location: "Online",
      },
      {
        title: "2026 Blueprint",
        type: "Webinar",
        date: "2026-01-13",
        location: "Online",
      },
      {
        title: "Visioning Workshop",
        type: "Physical",
        date: "2026-01-16",
        location: "TBC",
      },
    ],
  },
  {
    month: 2,
    monthName: "February",
    theme: "AI x Creativity x Human Potential",
    partners: "Women in AI",
    events: [
      {
        title: "AI for Everyday Life",
        type: "IG Live",
        date: "2026-02-03",
        location: "Online",
      },
      {
        title: "Women in AI Session",
        type: "Webinar",
        date: "2026-02-10",
        location: "Online",
      },
      {
        title: "Future of Work Festival",
        type: "Physical",
        date: "2026-02-27",
        location: "TBC",
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
        type: "Physical",
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
        type: "Physical",
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
        type: "Physical",
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
        type: "Physical",
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
        type: "Physical",
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
        type: "Physical",
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
        type: "Physical",
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
        type: "Physical",
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
        type: "Physical",
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
        type: "Physical",
        date: "2026-12-25",
        location: "TBC",
      },
    ],
  },
];


