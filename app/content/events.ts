import { EventItem } from "../components/EventCard";

export const UPCOMING_EVENTS: EventItem[] = [
  {
    title: "BLUEPRINT: Turning Vision into an Action Plan",
    date: "13th January 2026, 7PM - 8PM",
    location: "Online",
    imageSrc: "/images/blueprint.png",
    description: "Clarify your goals, align your priorities, and build a practical roadmap for 2026.",
    details: "Join us for a live webinar focused on goal setting and action planning for the year 2026. Learn how to turn your vision into actionable steps and set yourself up for success.\n\nKey Takeaways:\n• How to set clear, achievable goals for 2026\n• Turning big ideas into practical monthly action plans\n• Avoiding common goal-setting mistakes\n• Staying focused and accountable throughout the year\n\nSpeakers:\n• Lorraine Otieno - Career Coach, Founder of Beyond the Savannah\n• Wangui Mungai - Self-Sabotage, Procrastination and Mindset Coach\n• John Wafula - Moderator, Communication Coach, Corporate MC",
    hasFutureEvents: true,
    link: "", // TODO: Add registration link
  },
  {
    title: "Connect: Own the Stage",
    date: "Tuesday 04, Nov 2025 and Tuesday 11, Nov 2025, 7PM - 8.30PM",
    location: "Online",
    imageSrc: "/images/own_the_stage.png",
    details: "Build a confident, authentic and expressive voice of the digital age.",
    hasFutureEvents: true,
    link: "https://forms.gle/yxSmPmrffUbXc8av5", 
  }
];

export const PAST_EVENTS: EventItem[] = [
  {
    title: "Connect: Charting the Capital of You.",
    date: "Friday 26, Sep 2025, 2PM - 6PM",
    location: "LaunchPad Coworking, Westlands Avenue",
    imageSrc: "/images/connect-fxpesa.jpeg",
    description:
      "Flagship youth culture & policy forum bringing creators, leaders, and partners together.",
    link: "https://forms.gle/An82V5NKZqu76Dwz6",
    details:
      "Do you know how investing, trading and forex actually work? Or how financial markets move money? This month we've got you covered! Connect by Youth+ Africa in Partnership with FXPesa will break it down for you. What's in it for you? You get to learn financial markets in a simple and practical way, place your first ever demo trade live and also stand a chance to win a $200 live trading account.",
    hasFutureEvents: false,
    galleryUrl: "https://youthplusafrica.pixieset.com/chartingthecapitalofyou/"
  },
  {
    title: "The Currency of Exchange",
    date: "30th August 2025, 9AM - 3PM",
    location: "Strathmore Business School",
    imageSrc: "/images/currency-exchange.jpeg",
    description: "Driving business evolution",
    details: "A powerful day with speakers, entrepreneurs and thought leaders navigating the future of business growth, innovation and sustainable success.",
    hasFutureEvents: false,
  },
  {
    title: "The Wealth BluePrint",
    date: "16th and 23rd September 2025, 7-8PM",
    location: "Online",
    imageSrc: "/images/wealth-bp.jpeg",
    description: "Behaviors, Planning and Investment Insights",
    details: "Why do some people thrive financially while others struggle, even with the same income? The difference isn't luck, it's understanding your money behavior, having a clear financial plan and recognizing genuine investment opportunities. The wealth blueprint brings you exactly that. We partnered with ArvoCap Asset Managers to deliver institutional-grade financial wisdom in a language that actually makes sense.",
    hasFutureEvents: false,
  }
];