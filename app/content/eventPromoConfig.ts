/**
 * Shared event promo configuration
 * 
 * This file is NOT marked "use client" so it can be imported
 * from both server and client components.
 */

export const FUTURE_OF_WORK_EVENT_ID = "future-of-work-2026-02-27";

export const FUTURE_OF_WORK_PROMO = {
  eventId: FUTURE_OF_WORK_EVENT_ID,
  posterImage: "/images/future_of_work.jpg",
  title: "The Future of Work",
  description: "AI. Skills. Careers. Power. 27th Feb, 2-7 PM at Sarit Expo Centre.",
  bookingUrl: "https://youthplus.hustlesasa.shop/products/698aebe011d0fa359931b36a",
} as const;
