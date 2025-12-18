// Join Community popup and form content
// Content matches popup.docx exactly

export const JOIN_COMMUNITY_CONTENT = {
  headline: "Join the Youth Plus Africa Community",
  subheadline: "Get updates on Connect Series events, opportunities, and community initiatives.",
  benefits: [
    "Invitations to upcoming Connect Series events",
    "Career, finance, and personal growth opportunities",
    "Community updates and exclusive announcements",
  ],
  formFields: {
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
  },
  ctaButton: "👉 Join the Community",
  trustLine: "We respect your privacy. Your details will only be used for Youth Plus Africa updates.",
} as const;

// LocalStorage key for popup dismissal
export const POPUP_STORAGE_KEY = "ypa_join_popup_dismissed";
// Popup won't show again for 7 days after dismissal
export const POPUP_DISMISSAL_DURATION_DAYS = 7;

// LocalStorage key for community membership (permanent - once joined, never show popup again)
export const JOINED_COMMUNITY_STORAGE_KEY = "ypa_joined_community";

